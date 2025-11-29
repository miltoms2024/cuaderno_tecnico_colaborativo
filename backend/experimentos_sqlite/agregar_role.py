import sqlite3

DB_FILE = "notes_db-sqlite"

conn = sqlite3.connect(DB_FILE)
cursor = conn.cursor()

# Agregar la columna role si no existe
try:
    cursor.execute("ALTER TABLE users ADD COLUMN role TEXT DEFAULT 'user'")
    print("✅ Columna 'role' agregada correctamente.")
except sqlite3.OperationalError as e:
    print("⚠️ Error:", e)

conn.commit()
conn.close()
