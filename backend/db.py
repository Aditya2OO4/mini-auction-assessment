import mysql.connector
import os
from urllib.parse import urlparse

def get_connection():

    url = os.environ.get("MYSQL_PUBLIC_URL")

    parsed = urlparse(url)

    return mysql.connector.connect(
        host=parsed.hostname,
        user=parsed.username,
        password=parsed.password,
        database=parsed.path[1:],   # remove leading /
        port=parsed.port,
        ssl_disabled=False
    )
