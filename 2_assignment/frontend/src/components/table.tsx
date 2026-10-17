
interface TableProps<T> {
    headers: string[];
    dataKeys: (keyof T)[];
    data: T[];
    onDelete: (item: T) => void;
    onEdit?: (item: T) => void;
}

export default function DataTable<T extends Record<string, any>>({ headers, dataKeys, data, onDelete, onEdit }: TableProps<T>) {
    return (
        <div className="table-responsive">
            <table className="table table-bordered table-hover mb-0">
                <thead className="table-light">
                    <tr>
                        {headers.map((header, index) => (
                            <th 
                                key={index} 
                                className="text-start align-middle"
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex} className="hover:bg-gray-50">
                            {dataKeys.map((key, colIndex) => (
                                <td key={colIndex} className="align-middle">
                                    {row[key]}
                                </td>
                            ))}
                            <td className="align-middle text-center">
                                <button 
                                    className="btn btn-danger btn-sm"
                                    onClick={() => onDelete(row)}
                                >
                                    Delete
                                </button>
                            </td>
                            <td className="align-middle text-center">
                                <button 
                                    className="btn btn-primary btn-sm"
                                    onClick={() => onEdit && onEdit(row)}
                                >
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}