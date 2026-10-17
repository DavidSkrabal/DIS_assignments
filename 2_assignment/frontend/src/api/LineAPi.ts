import type { Line } from './structures';

/**
 * Gets a list of all lines from the backend API.
 * @returns List of lines
 */
export async function getAllLines(): Promise<Line[]> {
    const response = await fetch("http://127.0.0.1:8000/api/lines", {
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
 * Creates a new line with the provided details.
 * @param newLine 
 */
export async function createLine(newLine: Line): Promise<Line> {
    const response = await fetch("http://127.0.0.1:8000/api/lines/insert", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newLine)
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
}

/**
 * Updates an existing line with the provided details.
 * @param updatedLine 
 */
export async function updateLine(updatedLine: Line): Promise<void> {
    const response = await fetch(`http://127.0.0.1:8000/api/lines/update/${updatedLine.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedLine)
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
}

/**
 * Deletes a line with the specified ID.
 * @param lineId 
 */
export async function deleteLine(lineId: number): Promise<void> {
    const response = await fetch(`http://127.0.0.1:8000/api/lines/delete/${lineId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
}