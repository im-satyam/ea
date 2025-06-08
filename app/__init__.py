# app/__init__.py
from flask import Flask
from flask_mysqldb import MySQL
from .config import Config
from flask_cors import CORS
from dotenv import load_dotenv
mysql = MySQL()

def create_app():
    load_dotenv()  # Load environment variables from .env file
    app = Flask(__name__)
    CORS(app)
    app.config.from_object(Config)
    mysql.init_app(app)

    from .routes import product_bp , chat_bp
    app.register_blueprint(product_bp)
    app.register_blueprint(chat_bp)
    return app
