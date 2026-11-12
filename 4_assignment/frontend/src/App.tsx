import { useEffect, useState } from 'react'
import type { SaleData } from './api/structures'
import DataTable from './components/table'
import { type FormField } from './components/form'
import { getAllSQL } from './api/SaleSQLApi'
import { getAllNoSQL } from './api/SaleNoSQLApi '

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

  return (
<div>
        <div className="container p-4 p-md-5">
            <h1 className="fs-3 fw-bold mb-4">List of SQL data</h1>
            
            <DataTable 
                headers={tableSaleHeaders} 
                dataKeys={tableSaleKeys} 
                data={saleSQL} 
                onDelete={()=>{}}
                onEdit={()=>{}}
            />
            <h1 className="fs-3 fw-bold mb-4">List of NoSQL data</h1>
            
            <DataTable 
                headers={tableSaleHeaders} 
                dataKeys={tableSaleKeys} 
                data={saleNoSQL} 
                onDelete={()=>{}}
                onEdit={()=>{}}
            />
        </div>
    </div>
  )
}

export default App
