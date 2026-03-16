from flask import Blueprint, request
from db import get_connection
import datetime

auction_bp = Blueprint("auction", __name__)

# -------------------------
# CREATE AUCTION
# -------------------------

@auction_bp.route("/auction/create", methods=["POST"])
def create_auction():

    data = request.json

    item_name = data["item_name"]
    description = data["description"]
    start_price = data["start_price"]
    currency = data["currency"]
    duration = data["duration"]

    start_time = datetime.datetime.utcnow()
    end_time = start_time + datetime.timedelta(minutes=duration)

    conn = get_connection()
    cursor = conn.cursor()

    query = """
    INSERT INTO auctions
    (item_name, description, start_price, highest_bid, base_currency, end_time, status)
    VALUES (%s,%s,%s,%s,%s,%s,'active')
    """

    cursor.execute(
        query,
        (item_name, description, start_price, start_price, currency, end_time)
    )

    conn.commit()

    return {"message": "Auction created successfully"}


# -------------------------
# AUTO CLOSE EXPIRED AUCTIONS
# -------------------------

def close_expired_auctions(cursor):

    current_time = datetime.datetime.utcnow()

    cursor.execute("""
        SELECT id
        FROM auctions
        WHERE status='active'
        AND end_time IS NOT NULL
        AND end_time < %s
    """, (current_time,))

    expired = cursor.fetchall()

    for auction in expired:

        auction_id = auction["id"]

        # find highest bidder
        cursor.execute("""
            SELECT user_id
            FROM bids
            WHERE auction_id=%s
            ORDER BY bid_amount DESC
            LIMIT 1
        """, (auction_id,))

        winner = cursor.fetchone()

        winner_id = None

        if winner:
            winner_id = winner["user_id"]

        cursor.execute("""
            UPDATE auctions
            SET status='closed', winner_user_id=%s
            WHERE id=%s
        """, (winner_id, auction_id))


# -------------------------
# GET ACTIVE AUCTIONS
# -------------------------

@auction_bp.route("/auction/active", methods=["GET"])
def get_active_auctions():

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    close_expired_auctions(cursor)

    conn.commit()

    cursor.execute("""
        SELECT *
        FROM auctions
        WHERE status='active'
        ORDER BY end_time ASC
    """)

    auctions = cursor.fetchall()
    for auction in auctions:
        if auction["end_time"]:
            auction["end_time"] = auction["end_time"].isoformat()
    return {"auctions": auctions}


# -------------------------
# GET SINGLE AUCTION
# -------------------------

@auction_bp.route("/auction/<int:auction_id>", methods=["GET"])
def get_auction(auction_id):

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute(
        "SELECT * FROM auctions WHERE id=%s",
        (auction_id,)
    )

    auction = cursor.fetchone()

    return auction


# -------------------------
# AUCTION HISTORY
# -------------------------

@auction_bp.route("/auction/history", methods=["GET"])
def auction_history():

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    close_expired_auctions(cursor)

    conn.commit()

    cursor.execute("""
        SELECT *
        FROM auctions
        WHERE status='closed'
        ORDER BY end_time DESC
    """)

    auctions = cursor.fetchall()

    return {"auctions": auctions}
