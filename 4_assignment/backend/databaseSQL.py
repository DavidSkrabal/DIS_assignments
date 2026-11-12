import psycopg2
import os

def db_connect():
    """Connect to the PostgreSQL database."""
    
    db_url = os.getenv("DATABASE_URL", "postgresql://admin:secretpassword@localhost:5432/sales_db")
    conn = psycopg2.connect(db_url)
    
    return conn

def db_close(conn, cursor, message=""):
    """Close the PostgreSQL database connection."""
    
    conn.commit()
    cursor.close()
    conn.close()
    print(message)

def db_init():
    """Initialize the PostgreSQL database."""

    conn = db_connect()
    cursor = conn.cursor()

    # create table if it doesn't exist
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS sales_dictionary (
        id SERIAL PRIMARY KEY,
        Column_Name VARCHAR NOT NULL,
        Description TEXT,
        Data_Type VARCHAR,
        Example_Value TEXT,
        Business_Meaning TEXT
    )
    ''')

    db_close(conn, cursor, "PostgreSQL database initialized successfully!")

def db_clear():
    """Clear the PostgreSQL database."""
    
    conn = db_connect()
    cursor = conn.cursor()

    cursor.execute('DROP TABLE IF EXISTS sales_dictionary')
    db_close(conn, cursor, "PostgreSQL database cleared successfully!")

def get_all_data():
    conn = db_connect()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT 
            id AS "id",
            Column_Name AS "Column_Name",
            Description AS "Description",
            Data_Type AS "Data_Type",
            Example_Value AS "Example_Value",
            Business_Meaning AS "Business_Meaning"
        FROM sales_dictionary
    """)
    column_names = [desc[0] for desc in cursor.description]
    data = [dict(zip(column_names, row)) for row in cursor.fetchall()]
    
    db_close(conn, cursor, "Data retrieved successfully!")
    return data

def insert_data(data_dict):
    conn = db_connect()
    cursor = conn.cursor()

    columns = ", ".join(data_dict.keys())
    placeholders = ", ".join(["%s"] * len(data_dict))
    values = tuple(data_dict.values())
    query = f"INSERT INTO sales_dictionary ({columns}) VALUES ({placeholders}) RETURNING id"
    
    cursor.execute(query, values)
    
    new_id = cursor.fetchone()[0]
    
    data_dict['id'] = new_id
    db_close(conn, cursor, "Data inserted successfully!")
    return data_dict

def insert_many_data(data_list):
    conn = db_connect()
    cursor = conn.cursor()

    for data_dict in data_list:
        columns = ", ".join(data_dict.keys())
        placeholders = ", ".join(["%s"] * len(data_dict))
        values = tuple(data_dict.values())
        query = f"INSERT INTO sales_dictionary ({columns}) VALUES ({placeholders})"
        
        cursor.execute(query, values)
    
    db_close(conn, cursor, "Data inserted successfully!")

def update_data(emp_id, data_dict):
    conn = db_connect()
    cursor = conn.cursor()

    if 'id' in data_dict:
        del data_dict['id']

    set_clause = ", ".join([f"{key} = %s" for key in data_dict.keys()])
    values = list(data_dict.values())
    values.append(emp_id)
    query = f"UPDATE sales_dictionary SET {set_clause} WHERE id = %s"

    cursor.execute(query,tuple(values))
    db_close(conn, cursor, "Data updated successfully!")
    return True

def delete_data(emp_id):
    conn = db_connect()
    cursor = conn.cursor()

    cursor.execute("DELETE FROM sales_dictionary WHERE id = %s", (emp_id,))
    db_close(conn, cursor, "Data deleted successfully!")
    return True
