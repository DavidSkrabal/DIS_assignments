from fastapi import FastAPI
import databaseSQL
import databaseMongo
import replication
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

@app.post("/api/reset")
def reset_endpoint():
    dataSeed.seed_data()
    return {"message": "Database reset successfully.", "status": "ok"}

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


@app.post("/api/insert")
def insert_data(data: dict):
    result = replication.insert_data(data)
    return result

@app.post("/api/insert/sql")
def insert_data_sql(data: dict):
    result = databaseSQL.insert_data(data)
    return result

@app.post("/api/insert/nosql")
def insert_data_nosql(data: dict):
    data["id"] = databaseMongo.get_next_id()
    result = databaseMongo.insert_data(data)
    return result

@app.put("/api/update/{emp_id}")
def update_data(emp_id: int, data: dict):
    result = replication.update_data(emp_id, data)
    return result

@app.delete("/api/delete/{emp_id}")
def delete_data(emp_id: int):
    result = replication.delete_data(emp_id)
    return result