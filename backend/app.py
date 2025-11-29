from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import datetime
import os
from flask import send_from_directory

app = Flask(__name__)
CORS(app)

# Archivo de base de datos SQLite
DB_FILE = "notes_db-sqlite"

# ------------------- FUNCIONES AUXILIARES -------------------

def get_db():
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    cursor = conn.cursor()

    # Tabla usuarios
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        alias TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT DEFAULT 'user'
                   
    )
    """)

    # Tabla notas
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT,
        file_path TEXT,
        date TEXT,
        author TEXT
    )
    """)

    conn.commit()
    conn.close()

init_db()

# ------------------- RUTAS -------------------

@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json() or {}
    alias = data.get("alias", "").strip()
    password = data.get("password", "").strip()

    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT alias, role FROM users WHERE alias=? AND password=?", (alias, password))  # 👈 traemos role
    user = cursor.fetchone()
    conn.close()

    if user:
        return jsonify({
            "ok": True,
            "alias": user["alias"],
            "role": user["role"] or "user"   # 👈 devolvemos role
        })
    return jsonify({"ok": False, "error": "Credenciales inválidas"}), 401

@app.route("/api/register", methods=["POST"])
def register():
    data = request.get_json() or {}
    alias = data.get("alias", "").strip()
    password = data.get("password", "").strip()

    if not alias or not password:
        return jsonify({"ok": False, "error": "Alias y contraseña requeridos"}), 400

    try:
        conn = get_db()
        cursor = conn.cursor()
        cursor.execute("INSERT INTO users (alias, password, role) VALUES (?, ?, ?)", (alias, password, "user"))  # 👈 añadimos role
        conn.commit()
        conn.close()
        return jsonify({"ok": True, "alias": alias})
    except sqlite3.IntegrityError:
        return jsonify({"ok": False, "error": "Alias ya registrado"}), 409


@app.route("/api/notes", methods=["GET"])
def get_notes():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM notes")
    rows = cursor.fetchall()
    conn.close()

    notes = []
    for row in rows:
        notes.append({
            "id": row["id"],
            "title": row["title"],
            "content": row["content"],
            "imageUrl": row["file_path"],
            "date": row["date"],
            "author": row["author"]
        })
    return jsonify({"ok": True, "notes": notes})


@app.route("/api/notes", methods=["POST"])
def add_note():
    data = request.get_json() or {}
    title = data.get("title", "").strip()
    content = data.get("content", "").strip()
    author = data.get("author", "").strip()
    image_url = data.get("imageUrl")

    if not title or not content or not author:
        return jsonify({"ok": False, "error": "Título, contenido y autor requeridos"}), 400

    conn = get_db()
    cursor = conn.cursor()
    date_str = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    cursor.execute("""
        INSERT INTO notes (title, content, file_path, date, author)
        VALUES (?, ?, ?, ?, ?)
    """, (title, content, image_url, date_str, author))
    conn.commit()
    note_id = cursor.lastrowid
    conn.close()

    return jsonify({"ok": True, "note": {
        "id": note_id,
        "title": title,
        "content": content,
        "imageUrl": image_url,
        "date": date_str,
        "author": author
    }})


@app.route("/api/notes/<int:note_id>", methods=["DELETE"])
def delete_note(note_id):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM notes WHERE id=?", (note_id,))
    conn.commit()
    conn.close()
    return jsonify({"ok": True, "deleted_id": note_id})


@app.route("/api/notes/<int:note_id>", methods=["PUT"])
def update_note(note_id):
    data = request.get_json() or {}
    title = data.get("title", "").strip()
    content = data.get("content", "").strip()
    author = data.get("author", "").strip()
    image_url = data.get("imageUrl")

    if not title or not content or not author:
        return jsonify({"ok": False, "error": "Título, contenido y autor requeridos"}), 400

    conn = get_db()
    cursor = conn.cursor()
    date_str = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    cursor.execute("""
        UPDATE notes
        SET title=?, content=?, file_path=?, date=?, author=?
        WHERE id=?
    """, (title, content, image_url, date_str, author, note_id))
    conn.commit()
    conn.close()

    return jsonify({"ok": True, "note": {
        "id": note_id,
        "title": title,
        "content": content,
        "imageUrl": image_url,
        "date": date_str,
        "author": author
    }})



@app.route("/api/upload", methods=["POST"])
def upload_file():
    file = request.files.get("file")
    if not file:
        return jsonify({"ok": False, "error": "No se envió archivo"}), 400

    uploads_dir = os.path.join(os.getcwd(), "uploads")
    os.makedirs(uploads_dir, exist_ok=True)
    file_path = os.path.join(uploads_dir, file.filename)
    file.save(file_path)

    fake_url = f"http://localhost:5000/uploads/{file.filename}"
    return jsonify({"ok": True, "url": fake_url})

# 👉 NUEVA RUTA PARA SERVIR ARCHIVOS SUBIDOS
@app.route("/uploads/<filename>")
def serve_uploaded_file(filename):
    uploads_dir = os.path.join(os.getcwd(), "uploads")
    return send_from_directory(uploads_dir, filename)

# ------------------- MAIN -------------------
if __name__ == "__main__":
    app.run(debug=True, port=5000)
