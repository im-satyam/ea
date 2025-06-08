from flask import Blueprint, jsonify, request
from .models import get_products_by_query, get_product_by_id, get_all_product
from .chatbot import get_api_response
product_bp = Blueprint('products', __name__)
chat_bp = Blueprint('chat', __name__)
@product_bp.route('/search', methods=['GET'])
def search_products():
    query = request.args.get('query', '')
    products = get_products_by_query(query)
    return jsonify(products)

@product_bp.route('/product/<int:product_id>', methods=['GET'])
def get_single_product(product_id):  # ✅ renamed to avoid name conflict
    product = get_product_by_id(product_id)
    if product:
        return jsonify(product)
    return jsonify({"error": "Product not found"}), 404

@product_bp.route('/products/all', methods=['GET'])
def get_all_products():  # ✅ renamed to avoid name conflict
    products = get_all_product()
    if not products:
        return jsonify({"error": "No products found"}), 404
    return jsonify(products)
@product_bp.route('/ping', methods=['GET'])
def ping():
    return "pong"
@chat_bp.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_input = data.get("message", "").strip()

    if not user_input:
        return jsonify({"error": "Message is required"}), 400

    try:
        reply = get_api_response(user_input)
        return jsonify({"reply": reply})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
