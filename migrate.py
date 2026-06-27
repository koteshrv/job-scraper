import sqlite3
conn = sqlite3.connect('jobs.db')
cursor = conn.cursor()
try:
    cursor.execute("ALTER TABLE settings ADD COLUMN api_key_tag VARCHAR")
    print("Added api_key_tag")
except Exception as e:
    print("Error:", e)
conn.commit()
conn.close()
