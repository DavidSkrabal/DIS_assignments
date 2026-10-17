import { useEffect, useState } from 'react'
import './App.css'
import type { Employee, Line, Plane } from './api/structures'
import { createEmployee, deleteEmployee, getAllEmployees, updateEmployee } from './api/EmployeeApi'
import DataTable from './components/table'
import DataForm, { type FormField } from './components/form'
import { createLine, deleteLine, getAllLines, updateLine } from './api/LineAPi'
import { createPlane, deletePlane, getAllPlanes, updatePlane } from './api/PlanesApi'

type EntityType = 'employee' | 'plane' | 'line';

function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployeeRow, setSelectedEmployeeRow] = useState<Partial<Employee> | null>(null);
  const [planes, setPlanes] = useState<Plane[]>([]);
  const [selectedPlaneRow, setSelectedPlaneRow] = useState<Partial<Plane> | null>(null);
  const [lines, setLines] = useState<Line[]>([]);
  const [selectedLineRow, setSelectedLineRow] = useState<Partial<Line> | null>(null);
  
  const tableEmployeesHeaders = ["ID", "Name", "Telephon", "E-mail", "Position", "Delete", "Edit"];
  const tableEmployeeKeys: (keyof Employee)[] = ["id", "name", "telephone", "email", "role"];
  const employeeFields: FormField<Employee>[] = [
        { key: 'name', label: 'Name', type: 'text' },
        { key: 'telephone', label: 'Telephone', type: 'text' },
        { key: 'email', label: 'E-mail', type: 'email' },
        { key: 'role', label: 'Position', type: 'text' }
    ];
  const tablePlanesHeaders = ["ID", "Registration", "Type", "Capacity", "Cargo Space", "Delete", "Edit"];
  const tablePlaneKeys: (keyof Plane)[] = ["id", "registration", "type", "capacity", "cargoSpaceCapacity"];
  const planeFields: FormField<Plane>[] = [
        { key: 'registration', label: 'Registration', type: 'text' },
        { key: 'type', label: 'Type', type: 'text' },
        { key: 'capacity', label: 'Capacity', type: 'number' },
        { key: 'cargoSpaceCapacity', label: 'Cargo Space', type: 'number' }
    ];
    const tableLinesHeaders = ["ID", "Origin", "Departure Time", "Arrival Time", "Distance", "Delete", "Edit"];
    const tableLineKeys: (keyof Line)[] = ["id", "origin", "departureTime", "arrivalTime", "distance"];
    const lineFields: FormField<Line>[] = [
        { key: 'origin', label: 'Origin', type: 'text' },
        { key: 'destination', label: 'Destination', type: 'text' },
        { key: 'departureTime', label: 'Departure Time', type: 'text' },
        { key: 'arrivalTime', label: 'Arrival Time', type: 'text' },
        { key: 'distance', label: 'Distance', type: 'number' }
    ];
    

  useEffect(() => {
    Promise.all([
        getAllEmployees(),
        getAllLines(),
        getAllPlanes()
    ])
    .then(([employeesData, linesData, planesData]) => {
        setEmployees(employeesData);
        setLines(linesData);
        setPlanes(planesData);
    })
    .catch(error => console.error("Error through data loading:", error));
}, []);

  const handleEmployeeDelete = async (rowToDelete: Employee) => {
    try {
        await deleteEmployee(rowToDelete.id);
        setEmployees(prev => prev.filter(emp => emp.id !== rowToDelete.id));
    } catch (error) {
        console.error("Delete employee error:", error);
    }
  };

  const handlePlaneDelete = async (rowToDelete: Plane) => {
    try {
        await deletePlane(rowToDelete.id);
        setPlanes(prev => prev.filter(plane => plane.id !== rowToDelete.id));
    } catch (error) {
        console.error("Delete plane error:", error);
    }
  };

  const handleLineDelete = async (rowToDelete: Line) => {
    try {
        await deleteLine(rowToDelete.id);
        setLines(prev => prev.filter(line => line.id !== rowToDelete.id));
    } catch (error) {
        console.error("Delete line error:", error);
    }
  };

  const handleEmployeeEdit = (rowToEdit: Employee) => {
    setSelectedEmployeeRow(rowToEdit);
  };

  const handlePlaneEdit = (rowToEdit: Plane) => {
    setSelectedPlaneRow(rowToEdit);
  };
  const handleLineEdit = (rowToEdit: Line) => {
    setSelectedLineRow(rowToEdit);
  };

  const handleFormSubmit = async (type: EntityType, formData: any) => {
        try {
            switch (type) {
                case 'employee':
                            if (formData.id) {
                                await updateEmployee(formData as Employee);
                                setEmployees(prev => prev.map(emp => emp.id === formData.id ? { ...emp, ...formData } as Employee : emp));
                            } else {
                                const response = await createEmployee(formData as Employee);
                                
                                setEmployees(prev => [...prev, response as Employee]);
                            }
                            setSelectedEmployeeRow(null);
                    break;
                case 'plane':
                            if (formData.id) {
                                await updatePlane(formData as Plane);
                                setPlanes(prev => prev.map(plane => plane.id === formData.id ? { ...plane, ...formData } as Plane : plane));
                            } else {
                                const response = await createPlane(formData as Plane);
                                
                                setPlanes(prev => [...prev, response as Plane]);
                            }
                            setSelectedPlaneRow(null);
                    break;
                case 'line':
                            if (formData.id) {
                                await updateLine(formData as Line);
                                setLines(prev => prev.map(line => line.id === formData.id ? { ...line, ...formData } as Line : line));
                            } else {
                                const response = await createLine(formData as Line);
                                
                                setLines(prev => [...prev, response as Line]);
                            }
                            setSelectedLineRow(null);
                    break;
            }
        } catch (error) {
            console.error("Error create row:", error);
        }
  };

  return (
<div>
        <div className="container p-4 p-md-5">
            <h1 className="fs-3 fw-bold mb-4">List of employees</h1>
            
            <DataTable 
                headers={tableEmployeesHeaders} 
                dataKeys={tableEmployeeKeys} 
                data={employees} 
                onDelete={handleEmployeeDelete}
                onEdit={handleEmployeeEdit}
            />
            <div className="row mt-5">
                <div className="col-md-6">
                    <DataForm 
                        fields={employeeFields}
                        onSubmit={(data) => handleFormSubmit('employee', data)}
                    />
                </div>
                <div className="col-md-6">
                {selectedEmployeeRow ? (
                        <DataForm 
                            fields={employeeFields}
                            initialData={selectedEmployeeRow as Employee} 
                            onSubmit={(data) => handleFormSubmit('employee', data)}
                        />
                    ) : (
                        <div className="alert alert-secondary mt-4 text-center">
                            Select a row in the table to edit it.
                        </div>
                    )}
                </div>
            </div>
            <h1 className="fs-3 fw-bold mb-4">List of planes</h1>
            
            <DataTable 
                headers={tablePlanesHeaders} 
                dataKeys={tablePlaneKeys} 
                data={planes} 
                onDelete={handlePlaneDelete}
                onEdit={handlePlaneEdit}
            />
            <div className="row mt-5">
                <div className="col-md-6">
                    <DataForm 
                        fields={planeFields}
                        onSubmit={(data) => handleFormSubmit('plane', data)}
                    />
                </div>
                <div className="col-md-6">
                {selectedPlaneRow ? (
                        <DataForm 
                            fields={planeFields}
                            initialData={selectedPlaneRow as Plane} 
                            onSubmit={(data) => handleFormSubmit('plane', data)}
                        />
                    ) : (
                        <div className="alert alert-secondary mt-4 text-center">
                            Select a row in the table to edit it.
                        </div>
                    )}
                </div>
            </div>

            <h1 className="fs-3 fw-bold mb-4">List of lines</h1>
            <DataTable 
                headers={tableLinesHeaders} 
                dataKeys={tableLineKeys} 
                data={lines} 
                onDelete={handleLineDelete}
                onEdit={handleLineEdit}
            />
            <div className="row mt-5">
                <div className="col-md-6">
                    <DataForm 
                        fields={lineFields}
                        onSubmit={(data) => handleFormSubmit('line', data)}
                    />
                </div>
                <div className="col-md-6">
                {selectedLineRow ? (
                        <DataForm 
                            fields={lineFields}
                            initialData={selectedLineRow as Line} 
                            onSubmit={(data) => handleFormSubmit('line', data)}
                        />
                    ) : (
                        <div className="alert alert-secondary mt-4 text-center">
                            Select a row in the table to edit it.
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
  )
}

export default App
