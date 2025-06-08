from . import mysql

def get_products_by_query(query):
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM products WHERE name LIKE %s OR category LIKE %s", (f"%{query}%", f"%{query}%"))
    results = cur.fetchall()
    cur.close()
    return results

def get_product_by_id(product_id):
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM products WHERE id = %s", (product_id,))
    result = cur.fetchone()
    cur.close()
    return result
def get_all_product():
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM products")
    rows = cur.fetchall()
    col_names = [desc[0] for desc in cur.description]
    cur.close()

    products = [dict(zip(col_names, row)) for row in rows]
    return products
