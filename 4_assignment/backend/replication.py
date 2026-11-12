import databaseSQL
import databaseMongo
from fastapi import HTTPException

def insert_data(data_dict):

    sql_backup = None
    nosql_backup = None
    try:# try todo action on both databases, if one fails, rollback the other
        sql_backup = databaseSQL.insert_data(data_dict)
        nosql_backup = databaseMongo.insert_data(sql_backup)
        return sql_backup
    except Exception as e:
        print(f"insert error: {e}")
        if sql_backup:
            try:
                databaseSQL.delete_data(sql_backup.get('id')) 
            except Exception as rollback_err:
                print(f"SQL Rollback failed: {rollback_err}")
                
        if nosql_backup:
            try:
                databaseMongo.delete_data(nosql_backup.get('id')) 
            except Exception as rollback_err:
                print(f"NoSQL Rollback failed: {rollback_err}")
        raise HTTPException(status_code=500, detail="Replication failed. Rollback attempted.")

def update_data(emp_id, data_dict):
# Get rollback data safety from both databases
    try:
        sql_backup = databaseSQL.get_data_by_id(emp_id)
        nosql_backup = databaseMongo.get_data_by_id(emp_id)
    except Exception as e:#check connection error in rollback data retrieval
        print(f"Connection error during backup: {e}")
        raise HTTPException(status_code=500, detail="Database connection failed. No action taken.")

    try:# try todo action on both databases, if one fails, rollback the other
        if sql_backup: 
            databaseSQL.update_data(emp_id, data_dict)
        if nosql_backup:
            databaseMongo.update_data(emp_id, data_dict)
        return {"message": "Data updated successfully", "status": "ok"}
    except Exception as e:
        print(f"update error: {e}")
        if sql_backup:
            try:
                databaseSQL.update_data(emp_id, sql_backup) 
            except Exception as rollback_err:
                print(f"SQL Rollback failed: {rollback_err}")
                
        if nosql_backup:
            try:
                databaseMongo.update_data(emp_id, nosql_backup) 
            except Exception as rollback_err:
                print(f"NoSQL Rollback failed: {rollback_err}")
        raise HTTPException(status_code=500, detail="Replication failed. Rollback attempted.")

def delete_data(emp_id):
# Get rollback data safety from both databases
    try:
        sql_backup = databaseSQL.get_data_by_id(emp_id)
        nosql_backup = databaseMongo.get_data_by_id(emp_id)
    except Exception as e:#check connection error in rollback data retrieval
        print(f"Connection error during backup: {e}")
        raise HTTPException(status_code=500, detail="Database connection failed. No action taken.")

    try:# try todo action on both databases, if one fails, rollback the other
        if sql_backup: 
            databaseSQL.delete_data(emp_id)
        if nosql_backup:
            databaseMongo.delete_data(emp_id)
        return {"message": "Data deleted successfully", "status": "ok"}
    except Exception as e:
        print(f"deletion error: {e}")
        if sql_backup:
            try:
                sql_exist = databaseSQL.get_data_by_id(emp_id)
                if sql_exist is None:# only insert if it doesn't exist and rollback is needed
                    databaseSQL.insert_data(sql_backup) 
            except Exception as rollback_err:
                print(f"SQL Rollback failed: {rollback_err}")
                
        if nosql_backup:
            try:
                nosql_exist = databaseMongo.get_data_by_id(emp_id)
                if nosql_exist is None: # only insert if it doesn't exist and rollback is needed
                    databaseMongo.insert_data(nosql_backup) 
            except Exception as rollback_err:
                print(f"NoSQL Rollback failed: {rollback_err}")
        raise HTTPException(status_code=500, detail="Replication failed. Rollback attempted.")