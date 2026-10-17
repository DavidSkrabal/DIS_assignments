from fastapi import FastAPI
import database
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException

# Create fastAPI application
app = FastAPI(title="Airlines API")

# Initialize the database when the application starts
@app.on_event("startup")
def startup_event():
    database.db_init()
    print("Database initialized successfully.")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/test")
def test_endpoint():
    return {"message": "Ahoj! FastAPI backend úspěšně běží.", "status": "ok"}

@app.get("/api/{db_name}")
def read_data(db_name: str):
    data = database.get_all(db_name)
    if data is None:
        raise HTTPException(status_code=404, detail="Data not found")
    return data


@app.post("/api/{db_name}/insert")
def insert_data(db_name: str, data: dict):
    result = database.insert_data(db_name, data)
    if not result:
        raise HTTPException(status_code=500, detail="Failed to insert data")
    return result
    
@app.put("/api/{db_name}/update/{emp_id}")
def update_data(db_name: str, emp_id: int, data: dict):
    result = database.update_data(db_name, emp_id, data)
    if not result:
        raise HTTPException(status_code=500, detail="Failed to update data")
    return {"message": "Data updated successfully", "status": "ok"}

@app.delete("/api/{db_name}/delete/{emp_id}")
def delete_data(db_name: str, emp_id: int):
    result = database.delete_data(db_name, emp_id)
    if not result:
        raise HTTPException(status_code=500, detail="Failed to delete data")
    return {"message": "Data deleted successfully", "status": "ok"}