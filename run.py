from app import create_app

app = create_app()
@app.route('/')
def index():
    return "It works!"

if __name__ == '__main__':
    app.run(debug=True, port=8000)
