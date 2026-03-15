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
import os

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
