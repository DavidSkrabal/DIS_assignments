import sqlite3

# connecting to local file
conn = sqlite3.connect('users.db')
cursor = conn.cursor()

# creating new rtable
cursor.execute('''
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    role TEXT NOT NULL
)
''')

dummy_users = [
    ('Jan Novák', 'jan.novak@example.com', 'Admin'),
    ('Eva Malá', 'eva.mala@example.com', 'User'),
    ('Petr Dvořák', 'petr.dvorak@example.com', 'Moderator')
]

cursor.executemany("INSERT INTO users (name, email, role) VALUES (?, ?, ?)", dummy_users)

conn.commit()
conn.close()

print("DB was created and filled by data. ")