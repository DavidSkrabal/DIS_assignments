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
    
    data_dict["_id"] = str(data_dict["_id"])  # Convert ObjectId to string for JSON serialization
    print("Data inserted successfully!")
    return data_dict

def update_data(record_id, update_values):
    """Update a record in the MongoDB database."""
    
    query = {"_id": ObjectId(record_id)}
    if "_id" in update_values:
        del update_values["_id"]  # Remove _id from update values to avoid conflicts
    
    client, mongo_db = db_connect()
    collection = mongo_db["sales_dictionary"]
    result = collection.update_one(query, {"$set": update_values})
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

    query = {"_id": ObjectId(record_id)}
    result = collection.delete_one(query)
    client.close()

    if result.deleted_count > 0:
        print("Data deleted successfully!")
        return True
    else:
        print("No matching record found to delete.")
        return False