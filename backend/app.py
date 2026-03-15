from flask import Flask
from flask_cors import CORS
from routes.auction_routes import auction_bp
from routes.bid_routes import bid_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(auction_bp)
app.register_blueprint(bid_bp)

@app.route("/")
def home():
    return {"message":"Auction API Running"}

if __name__ == "__main__":
    app.run(debug=True)