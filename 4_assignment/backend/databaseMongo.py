from pymongo import MongoClient
import os
from bson.objectid import ObjectId

def db_connect():
    """Connect to the MongoDB database."""
    
    mongo_url = os.getenv("MONGO_URL", "mongodb://localhost:27017/")
    client = MongoClient(mongo_url)
    mongo_db = client["sales_db"]

    return client, mongo_db

def db_clear(): 
    """Initialize the MongoDB database."""
    
    client, mongo_db = db_connect()
    mongo_db["sales_dictionary"].drop()
    
    client.close()
    print("MongoDB database initialized successfully!")

def get_all_data():
    """Retrieve all data from the MongoDB database."""
    
    client, mongo_db = db_connect()
    collection = mongo_db["sales_dictionary"]
    data = list(collection.find())
    client.close()

    for item in data:
        item["_id"] = str(item["_id"])  # Convert ObjectId to string for JSON serialization
    print("Data retrieved successfully!")
    return data

def get_data_by_id(record_id):
    """Retrieve a single record by ID from the MongoDB database."""
    
    client, mongo_db = db_connect()
    collection = mongo_db["sales_dictionary"]
    data = collection.find_one({"id": int(record_id)})
    client.close()

    if data:
        data.pop("_id", None)
        print("Data retrieved successfully!")
        return data
    else:
        print("No matching record found.")
        return None

def insert_many_data(data_list):
    """Insert multiple records into the MongoDB database."""
    
    client, mongo_db = db_connect()
    collection = mongo_db["sales_dictionary"]
    collection.insert_many(data_list)
    client.close()

    print("Data inserted successfully!")

def insert_data(data_dict):
    """Insert a single record into the MongoDB database."""
    
    client, mongo_db = db_connect()
    collection = mongo_db["sales_dictionary"]
    collection.insert_one(data_dict)
    client.close()
    
    data_dict.pop("_id", None)
    print("Data inserted successfully!")
    return data_dict

def update_data(record_id, update_values):
    """Update a record in the MongoDB database."""
    
    update_values.pop("_id", None)
    
    client, mongo_db = db_connect()
    collection = mongo_db["sales_dictionary"]
    result = collection.update_one(
        {"id": int(record_id)}, 
        {"$set": update_values}
    )
    client.close()

    if result.matched_count > 0:
        print("Data updated successfully!")
        return True
    else:
        print("No matching record found to update.")
        return False

def delete_data(record_id):
    """Delete a record from the MongoDB database."""
    
    client, mongo_db = db_connect()
    collection = mongo_db["sales_dictionary"]

    result = collection.delete_one({"id": int(record_id)})
    client.close()

    if result.deleted_count > 0:
        print("Data deleted successfully!")
        return True
    else:
        print("No matching record found to delete.")
        return False