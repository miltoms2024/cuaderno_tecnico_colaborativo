import sqlite3

DB_FILE = "notes_db-sqlite"

def verificar_tablas():
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()

    # Listar todas las tablas
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table'")
    tablas = cursor.fetchall()

    print("Tablas encontradas en la base de datos:")
    for tabla in tablas:
        print(f"- {tabla[0]}")

    # Revisar columnas de la tabla users
    print("\nColumnas de la tabla 'users':")
    cursor.execute("PRAGMA table_info(users)")
    columnas = cursor.fetchall()
    for col in columnas:
        print(f"- {col[1]} ({col[2]})")

    conn.close()

if __name__ == "__main__":
    verificar_tablas()

        # Revisar columnas de la tabla users
    print("\nColumnas de la tabla 'users':")
    cursor.execute("PRAGMA table_info(users)")
    columnas = cursor.fetchall()
    for col in columnas:
        print(f"- {col[1]} ({col[2]})")

