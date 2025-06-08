import MySQLdb
from faker import Faker
import random

conn = MySQLdb.connect(
    host="localhost",
    user="root",
    password="#Sxs109163",
    database="ecommerce"
)
cursor = conn.cursor()
fake = Faker()

cursor.execute("""
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    price DECIMAL(10,2),
    category VARCHAR(255),
    stock INT,
    image_url TEXT
)
""")

categories = ["Electronics", "Books", "Clothing", "Home", "Beauty"]

for _ in range(100):
    name = fake.word().title()
    description = fake.text()
    price = round(random.uniform(10.0, 1000.0), 2)
    category = random.choice(categories)
    stock = random.randint(1, 100)
    image_url = fake.image_url()
    cursor.execute("INSERT INTO products (name, description, price, category, stock, image_url) VALUES (%s, %s, %s, %s, %s, %s)",
                   (name, description, price, category, stock, image_url))

conn.commit()
cursor.close()
conn.close()
