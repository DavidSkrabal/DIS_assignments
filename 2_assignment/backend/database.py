import sqlite3

def db_init():
    # creating first database
    # connecting to local file
    conn = sqlite3.connect('employees.db')
    cursor = conn.cursor()

    # creating first table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS employees (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        telephone TEXT NOT NULL,
        email TEXT NOT NULL,
        role TEXT NOT NULL
    )
    ''')

    dummy_employees = [
        ('John Doe', '000000000', 'john.doe@example.com', 'Admin'),
        ('ELisabeth Smith', '111111111', 'elisabeth.smith@example.com', 'Steward'),
        ('Peter Simpson', '222222222', 'peter.simpson@example.com', 'Pilot')
    ]

    #fill table by dummy data
    if cursor.execute('SELECT COUNT(*) FROM employees').fetchone()[0] == 0:
        cursor.executemany("INSERT INTO employees (name, telephone, email, role) VALUES (?, ?, ?, ?)", dummy_employees)

    conn.commit()
    conn.close()

    # creating second database (planes)
    # connecting to local file
    conn = sqlite3.connect('planes.db')
    cursor = conn.cursor()

    # creating second table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS planes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        registration TEXT NOT NULL,
        type TEXT NOT NULL,
        capacity INTEGER NOT NULL,
        cargoSpaceCapacity INTEGER NOT NULL
    )
    ''')

    dummy_planes = [
        ('OK-YBA', 'A380', 400, 1000),
        ('FI-ABK', 'B737', 150, 500),
        ('YE-DHG Simpson', 'A320', 180, 800)
    ]

    #fill table by dummy data
    if cursor.execute('SELECT COUNT(*) FROM planes').fetchone()[0] == 0:
        cursor.executemany("INSERT INTO planes (registration, type, capacity, cargoSpaceCapacity) VALUES (?, ?, ?, ?)", dummy_planes)

    conn.commit()
    conn.close()

    # creating third database
    # connecting to local file
    conn = sqlite3.connect('lines.db')
    cursor = conn.cursor()

    # creating first table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS lines (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        origin TEXT NOT NULL,
        destination TEXT NOT NULL,
        departureTime TEXT NOT NULL,
        arrivalTime TEXT NOT NULL,
        distance INTEGER NOT NULL
    )
    ''')

    dummy_lines = [
        ('New York', 'Los Angeles', '08:00', '11:00', 2451),
        ('Prague', 'Helsinki', '09:00', '10:30', 1200),
        ('London', 'Tampere', '10:00', '12:00', 1800)
    ]

    #fill table by dummy data
    if cursor.execute('SELECT COUNT(*) FROM lines').fetchone()[0] == 0:
        cursor.executemany("INSERT INTO lines (origin, destination, departureTime, arrivalTime, distance) VALUES (?, ?, ?, ?, ?)", dummy_lines)

    conn.commit()
    conn.close()

def get_all(table_name):
    conn = sqlite3.connect(table_name + '.db')
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM " + table_name)
    data = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return data

def insert_data(table_name, data_dict):
    conn = sqlite3.connect(table_name + '.db')
    cursor = conn.cursor()

    columns = ", ".join(data_dict.keys())
    placeholders = ", ".join(["?"] * len(data_dict))
    values = tuple(data_dict.values())
    query = f"INSERT INTO {table_name} ({columns}) VALUES ({placeholders})"
    
    cursor.execute(query, values)
    
    new_id = cursor.lastrowid
    
    data_dict['id'] = new_id
    conn.commit()
    conn.close()
    return data_dict

def update_data(table_name, emp_id, data_dict):
    conn = sqlite3.connect(table_name + '.db')
    cursor = conn.cursor()

    if 'id' in data_dict:
        del data_dict['id']

    set_clause = ", ".join([f"{key} = ?" for key in data_dict.keys()])
    values = list(data_dict.values())
    values.append(emp_id)
    query = f"UPDATE {table_name} SET {set_clause} WHERE id = ?"

    cursor.execute(query,tuple(values))
    conn.commit()
    conn.close()
    return True

def delete_data(table_name, emp_id):
    conn = sqlite3.connect(table_name + '.db')
    cursor = conn.cursor()
    cursor.execute("DELETE FROM " + table_name + " WHERE id = ?", (emp_id,))
    conn.commit()
    conn.close()
    return True