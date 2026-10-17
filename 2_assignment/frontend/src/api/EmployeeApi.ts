import type { Employee } from './structures';

/**
 * Gets a list of all employees from the backend API.
 * @returns List of employees
 */
export async function getAllEmployees(): Promise<Employee[]> {
    const response = await fetch("http://127.0.0.1:8000/api/employees", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
}


/**
 * Creates a new employee with the provided details.
 * @param newEmployee 
 */
export async function createEmployee(newEmployee: Employee): Promise<Employee> {
    const response = await fetch("http://127.0.0.1:8000/api/employees/insert", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newEmployee)
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
}

/**
 * Updates an existing employee with the provided details.
 * @param updatedEmployee 
 */
export async function updateEmployee(updatedEmployee: Employee): Promise<void> {
    const response = await fetch(`http://127.0.0.1:8000/api/employees/update/${updatedEmployee.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedEmployee)
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
}

/**
 * Deletes a employee with the specified ID.
 * @param employeeId 
 */
export async function deleteEmployee(employeeId: number): Promise<void> {
    const response = await fetch(`http://127.0.0.1:8000/api/employees/delete/${employeeId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
}