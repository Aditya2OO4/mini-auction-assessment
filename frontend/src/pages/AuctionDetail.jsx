import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function AuctionDetail({ user }) {

  const { id } = useParams();
  const [auction,setAuction] = useState({});
  const [bid,setBid] = useState("");

  const fetchAuction = () => {

    fetch(`http://mini-auction-assessment.onrender.com/auction/${id}`)
      .then(res => res.json())
      .then(data => setAuction(data));

  };

  useEffect(() => {

    fetchAuction();

    const interval = setInterval(fetchAuction,2000);

    return () => clearInterval(interval);

  }, []);

  const placeBid = async () => {

    const response = await fetch("http://mini-auction-assessment.onrender.com/bid/place",{

      method:"POST",

      headers:{
        "Content-Type":"application/json"
      },

      body:JSON.stringify({
        auction_id:id,
        user_id:user,
        bid_amount:Number(bid),
        currency: auction.base_currency
      })

    });

    const data = await response.json();

    if(data.error){
      alert(data.error);
    } else {
      alert("Bid placed successfully!");
      setBid("");
    }

  };

  return (

    <div>

      <h2>{auction.item_name}</h2>

      <p>Highest Bid: {auction.highest_bid}</p>

      <input
        type="number"
        placeholder="Your Bid"
        value={bid}
        onChange={(e)=>setBid(e.target.value)}
      />

      <button onClick={placeBid}>
        Place Bid
      </button>

    </div>

  );

}

export default AuctionDetail;
