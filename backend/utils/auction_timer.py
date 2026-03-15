import datetime

def check_auction_status(auction):

    if auction["end_time"] is None:
        return "active"

    now = datetime.datetime.now()

    if now > auction["end_time"]:
        return "closed"

    return "active"