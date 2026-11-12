import { useEffect, useState } from 'react'
import type { SaleData } from './api/structures'
import DataTable from './components/table'
import DataForm, { type FormField } from './components/form'
import { getAllSQL, getAllNoSQL, deleteSale, updateSale, createSale } from './api/SaleApi'

function App() {
  const [saleSQL, setSaleSQL] = useState<SaleData[]>([]);
  const [saleNoSQL, setSaleNoSQL] = useState<SaleData[]>([]);
  const [selectedSaleRow, setSelectedSaleRow] = useState<Partial<SaleData> | null>(null);

  const tableSaleHeaders = ["Column Name", "Description", "Data Type", "Example Value", "Business Meaning", "Delete", "Edit"];
  const tableSaleKeys: (keyof SaleData)[] = ["Column_Name", "Description", "Data_Type", "Example_Value", "Business_Meaning"];
  const saleFields: FormField<SaleData>[] = [
        { key: 'Column_Name', label: 'Column Name', type: 'text' },
        { key: 'Description', label: 'Description', type: 'text' },
        { key: 'Data_Type', label: 'Data Type', type: 'text' },
        { key: 'Example_Value', label: 'Example Value', type: 'text' },
        { key: 'Business_Meaning', label: 'Business Meaning', type: 'text' }
    ];
    

  useEffect(() => {
    Promise.all([
        getAllSQL(),
        getAllNoSQL()
    ])
    .then(([sqlData, noSqlData]) => {
        setSaleSQL(sqlData);
        setSaleNoSQL(noSqlData);
    })
    .catch(error => console.error("Error through data loading:", error));
}, []);

const handleDelete = async (rowToDelete: SaleData) => {
    try {
        await deleteSale(rowToDelete.id);
        setSaleSQL(prev => prev.filter(sale => sale.id !== rowToDelete.id));
        setSaleNoSQL(prev => prev.filter(sale => sale.id !== rowToDelete.id));
    } catch (error) {
        console.error("Delete sale error:", error);
    }
  };

  const handleSaleEdit = (rowToEdit: SaleData) => {
    setSelectedSaleRow(rowToEdit);
  };

  const handleFormSubmit = async (formData: any) => {
        try {
            if (formData.id) {
                await updateSale(formData as SaleData);
                setSaleSQL(prev => prev.map(sale => sale.id === formData.id ? { ...sale, ...formData } as SaleData : sale));
                setSaleNoSQL(prev => prev.map(sale => sale.id === formData.id ? { ...sale, ...formData } as SaleData : sale));
            } else {
                const response = await createSale(formData as SaleData);
                
                setSaleSQL(prev => [...prev, response as SaleData]);
                setSaleNoSQL(prev => [...prev, response as SaleData]);
            }
            setSelectedSaleRow(null);
        }
        catch (error) {
            console.error("Error create row:", error);
        }
  };


  return (
    <div>
        <div className="container p-4 p-md-5">
            <h1 className="fs-3 fw-bold mb-4">List of SQL data</h1>
            
            <DataTable 
                headers={tableSaleHeaders} 
                dataKeys={tableSaleKeys} 
                data={saleSQL} 
                onDelete={handleDelete}
                onEdit={handleSaleEdit}
            />
            <h1 className="fs-3 fw-bold mb-4">List of NoSQL data</h1>
            
            <DataTable 
                headers={tableSaleHeaders} 
                dataKeys={tableSaleKeys} 
                data={saleNoSQL} 
                onDelete={handleDelete}
                onEdit={handleSaleEdit}
            />
            <div className="row mt-5">
                <div className="col-md-6">
                    <DataForm 
                        fields={saleFields}
                        onSubmit={(data) => handleFormSubmit(data)}
                    />
                </div>
                <div className="col-md-6">
                {selectedSaleRow ? (
                        <DataForm 
                            fields={saleFields}
                            initialData={selectedSaleRow as SaleData} 
                            onSubmit={(data) => handleFormSubmit(data)}
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
