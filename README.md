# Mini Real-Time Auction Platform

A simplified **real-time auction marketplace** similar to eBay where users can create auctions and place bids.
The system automatically determines the highest bidder and closes auctions when the timer expires.

---

## Tech Stack

**Backend**

* Python (Flask)
* MySQL

**Frontend**

* React.js
* Tailwind CSS
* Vite

**Real-Time Updates**

* Smart polling (2-second interval)

---

## Features

* Create auctions with duration and base currency
* Place bids on active auctions
* Automatic highest bid tracking
* Countdown timer for auctions
* Automatic auction closing when time expires
* Winner detection
* Auction history page
* Simulated multi-user bidding (Alice, Bob, Charlie)

---

## Architecture Overview

```
React Frontend
      │
      ▼
Flask REST API
      │
      ▼
MySQL Database
```

The frontend communicates with the backend through REST APIs.
The backend manages auction logic, bid validation, and database operations.

---

## Database Tables

* **users** – user information
* **auctions** – auction details and status
* **bids** – all placed bids
* **auction_logs** – auction event tracking

---

## Setup Instructions

### 1. Clone the repository

```
git clone <repo-url>
cd mini-auction-platform
```

### 2. Start Backend

```
cd backend
pip install -r requirements.txt
python app.py
```

Backend runs at:

```
http://localhost:5000
```

### 3. Start Frontend

```
cd frontend
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## API Endpoints

```
POST /auction/create
GET  /auction/active
GET  /auction/{id}
POST /bid/place
GET  /auction/history
```

---

## Notes

This project focuses on **auction logic, real-time updates, and full-stack integration** rather than payment processing.
