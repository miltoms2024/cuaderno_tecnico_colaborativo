import sqlite3

DB_FILE = "notes_db-sqlite"

conn = sqlite3.connect(DB_FILE)
cursor = conn.cursor()

# Insertar usuario de prueba
cursor.execute("INSERT INTO users (alias, password, role) VALUES (?, ?, ?)",
               ("milton", "1234", "technician"))

conn.commit()
conn.close()

print("✅ Usuario de prueba insertado en la tabla 'users'.")
