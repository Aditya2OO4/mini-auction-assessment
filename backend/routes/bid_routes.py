from flask import Blueprint, request
from db import get_connection
import datetime
from utils.currency import convert_currency
from utils.auction_timer import check_auction_status

bid_bp = Blueprint("bid", __name__)

@bid_bp.route("/bid/place", methods=["POST"])
def place_bid():

    data = request.json

    auction_id = data["auction_id"]
    user_id = data["user_id"]
    bid_amount = float(data["bid_amount"])
    currency = data["currency"]

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    # Get auction
    cursor.execute(
        "SELECT * FROM auctions WHERE id=%s",
        (auction_id,)
    )

    auction = cursor.fetchone()

    if not auction:
        return {"error": "Auction not found"}

    # Check if auction expired
    status = check_auction_status(auction)

    if status == "closed":
        return {"error": "Auction expired"}

    base_currency = auction["base_currency"]

    # Convert currency only if different
    if currency != base_currency:

        bid_amount = convert_currency(
            bid_amount,
            currency,
            base_currency
        )

    # Validate bid
    if bid_amount <= auction["highest_bid"]:
        return {"error": "Bid must be higher than current bid"}

    # Insert bid
    cursor.execute(
        """
        INSERT INTO bids
        (auction_id, user_id, bid_amount, currency, created_at)
        VALUES (%s,%s,%s,%s,%s)
        """,
        (auction_id, user_id, bid_amount, base_currency, datetime.datetime.now())
    )

    # Update highest bid
    cursor.execute(
        """
        UPDATE auctions
        SET highest_bid=%s
        WHERE id=%s
        """,
        (bid_amount, auction_id)
    )

    conn.commit()

    return {"message": "Bid placed successfully"}