import type { SaleData } from './structures';

/**
 * Gets a list of all sql sales from the backend API.
 * @returns List of lines
 */
export async function getAllSQL(): Promise<SaleData[]> {
    const response = await fetch("http://localhost:8000/api/sql", {
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
 * Gets a list of all no sql sales from the backend API.
 * @returns List of lines
 */
export async function getAllNoSQL(): Promise<SaleData[]> {
    const response = await fetch("http://localhost:8000/api/nosql", {
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
 * Creates a new sale for both databases with the provided details.
 * @param newSale
 */
export async function createSale(newSale: SaleData): Promise<SaleData> {
    const response = await fetch("http://127.0.0.1:8000/api/insert", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newSale)
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
}

/**
 * Updates an existing sale data with the provided details.
 * @param updatedSale 
 */
export async function updateSale(updatedSale: SaleData): Promise<void> {
    const response = await fetch(`http://127.0.0.1:8000/api/update/${updatedSale.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedSale)
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
}

/**
 * Deletes a sale data with the specified ID.
 * @param saleId
 */
export async function deleteSale(saleId: number): Promise<void> {
    const response = await fetch(`http://127.0.0.1:8000/api/delete/${saleId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
}