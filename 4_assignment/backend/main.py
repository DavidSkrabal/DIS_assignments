from fastapi import FastAPI
import databaseSQL
import databaseMongo
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException
import dataSeed
import os

# Create fastAPI application
app = FastAPI(title="Sales API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup_event():
    if os.getenv("INIT_DB_ON_STARTUP") == "True":
        dataSeed.seed_data()
        print("Database initialized with sample data.")
    else:
        databaseSQL.init_db()
        print("Database initialized without sample data.")



@app.get("/test")
def test_endpoint():
    return {"message": "Hi, FastAPI backend is running successfully.", "status": "ok"}

@app.get("/api/sql")
def read_data():
    data = databaseSQL.get_all_data()
    if data is None:
        raise HTTPException(status_code=404, detail="Data not found")
    return data

@app.get("/api/nosql")
def read_data():
    data = databaseMongo.get_all_data()
    if data is None:
        raise HTTPException(status_code=404, detail="Data not found")
    return data


# @app.post("/api/{db_name}/insert")
# def insert_data(db_name: str, data: dict):
#     result = database.insert_data(db_name, data)
#     if not result:
#         raise HTTPException(status_code=500, detail="Failed to insert data")
#     return result
    
# @app.put("/api/{db_name}/update/{emp_id}")
# def update_data(db_name: str, emp_id: int, data: dict):
#     result = database.update_data(db_name, emp_id, data)
#     if not result:
#         raise HTTPException(status_code=500, detail="Failed to update data")
#     return {"message": "Data updated successfully", "status": "ok"}

# @app.delete("/api/{db_name}/delete/{emp_id}")
# def delete_data(db_name: str, emp_id: int):
#     result = database.delete_data(db_name, emp_id)
#     if not result:
#         raise HTTPException(status_code=500, detail="Failed to delete data")
#     return {"message": "Data deleted successfully", "status": "ok"}