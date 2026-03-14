from flask import Blueprint, request
from db import get_connection

auction_bp = Blueprint("auction", __name__)

@auction_bp.route("/auction/create", methods=["POST"])
def create_auction():

    data = request.json

    item_name = data["item_name"]
    description = data["description"]
    start_price = data["start_price"]
    currency = data["currency"]

    conn = get_connection()
    cursor = conn.cursor()

    query = """
    INSERT INTO auctions
    (item_name, description, start_price, highest_bid, base_currency, status)
    VALUES (%s,%s,%s,%s,%s,'active')
    """

    cursor.execute(query,(item_name,description,start_price,start_price,currency))

    conn.commit()

    return {"message":"Auction Created"}

@auction_bp.route("/auction/active", methods=["GET"])
def get_active_auctions():

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM auctions WHERE status='active'")

    auctions = cursor.fetchall()

    return {"auctions": auctions}