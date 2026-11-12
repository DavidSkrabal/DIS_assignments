import React, { useState, useEffect } from 'react';

export interface FormField<T> {
    key: keyof T;
    label: string;
    type?: 'text' | 'number' | 'email'; 
}

interface DataFormProps<T> {
    initialData?: T | null;
    fields: FormField<T>[];
    onSubmit: (data: Partial<T>) => void;
}

export default function DataForm<T extends Record<string, any>>({
    initialData,
    fields,
    onSubmit,
}: DataFormProps<T>) {
    const [formData, setFormData] = useState<Partial<T>>(initialData || {});

    useEffect(() => {
        setFormData(initialData || {});
    }, [initialData]);

    const isEdit = !!initialData;

    const handleChange = (key: keyof T, value: string) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({});
    };

    return (
        <form onSubmit={handleSubmit} className="card p-4 shadow-sm mt-4">
            <h2 className="h4 fw-bold mb-4">
                {isEdit ? 'Edit row' : 'Add new row'}
            </h2>

            <div className="space-y-4">
                {fields.map((field) => (
                    <div key={String(field.key)} className="mb-3">
                        <label className="font-semibold text-gray-700 mb-1">{field.label}</label>
                        <input
                            type={field.type || 'text'}
                            value={(formData[field.key] as string) || ''}
                            onChange={(e) => handleChange(field.key, e.target.value)}
                            className="form-control"
                            required
                        />
                    </div>
                ))}
            </div>

            <div className="mt-4 d-flex gap-2">
                <button 
                    type="submit" 
                    className="btn btn-success"
                    disabled={!formData || Object.keys(formData).length === 0}
                >
                    {isEdit ? 'Save changes' : 'Create'}
                </button>
                <button 
                    type="button" 
                    onClick={() => setFormData({})}
                    className="btn btn-secondary"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}