import type { Plane } from './structures';

/**
 * Gets a list of all planes from the backend API.
 * @returns List of planes
 */
export async function getAllPlanes(): Promise<Plane[]> {
    const response = await fetch("http://127.0.0.1:8000/api/planes", {
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
 * Creates a new plane with the provided details.
 * @param newPlane 
 */
export async function createPlane(newPlane: Plane): Promise<Plane> {
    const response = await fetch("http://127.0.0.1:8000/api/planes/insert", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newPlane)
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
}

/**
 * Updates an existing plane with the provided details.
 * @param updatedPlane 
 */
export async function updatePlane(updatedPlane: Plane): Promise<void> {
    const response = await fetch(`http://127.0.0.1:8000/api/planes/update/${updatedPlane.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedPlane)
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
}

/**
 * Deletes a plane with the specified ID.
 * @param planeId 
 */
export async function deletePlane(planeId: number): Promise<void> {
    const response = await fetch(`http://127.0.0.1:8000/api/planes/delete/${planeId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
}