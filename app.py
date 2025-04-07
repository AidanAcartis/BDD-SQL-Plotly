from flask import Flask, render_template, request, jsonify
import pandas as pd
import sqlite3
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Charger CSV → SQLite une fois
def init_db():
    conn = sqlite3.connect('database.db')
    df = pd.read_csv('student_depression_dataset.csv')
    df.to_sql('students', conn, if_exists='replace', index=False)
    conn.commit()
    conn.close()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/query', methods=['POST'])
def query():
    sql_query = request.json['query']
    conn = sqlite3.connect('database.db')
    try:
        df = pd.read_sql_query(sql_query, conn)
        data = df.to_dict(orient='list')
        return jsonify({'status': 'success', 'data': data})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)})
    finally:
        conn.close()

if __name__ == "__main__":
    init_db()
    app.run(debug=True)