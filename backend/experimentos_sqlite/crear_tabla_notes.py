import sqlite3

# Conexión al archivo de base de datos (se crea si no existe)
conn = sqlite3.connect("proyecto25.db")
cursor = conn.cursor()

# Eliminar la tabla si ya existe (por si está corrupta)
cursor.execute("DROP TABLE IF EXISTS notes")

# Crear la tabla con clave primaria
cursor.execute("""
CREATE TABLE notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT,
    file_path TEXT,
    date TEXT
)
""")

conn.commit()
conn.close()

print("✅ Tabla 'notes' creada correctamente.")
