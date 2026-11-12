import type { SaleData } from './structures';

/**
 * Gets a list of all lines from the backend API.
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
