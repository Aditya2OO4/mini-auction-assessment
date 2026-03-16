import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Dashboard(){

  const [auctions,setAuctions] = useState([]);
  const [,forceUpdate] = useState(0);

  const fetchAuctions = () => {

    fetch("https://mini-auction-assessment.onrender.com/auction/active")
      .then(res => res.json())
      .then(data => setAuctions(data.auctions));

  };

  useEffect(() => {

    fetchAuctions();

    const interval = setInterval(fetchAuctions,2000);

    return () => clearInterval(interval);

  }, []);

  useEffect(() => {

    const timer = setInterval(()=>{
      forceUpdate(n => n + 1);
    },1000);

    return ()=>clearInterval(timer);

  },[]);

  const getTimeLeft = (end_time) => {

    if(!end_time) return "Auction Ended";

    const end = new Date(end_time);
    const now = new Date();

    const diff = end - now;

    if(diff <= 0) return "Auction Ended";

    const minutes = Math.floor(diff/60000);
    const seconds = Math.floor((diff%60000)/1000);

    return `${minutes}m ${seconds}s`;

  };

  return(

    <div>

      <h2 className="text-3xl font-semibold mb-6">
        Active Auctions
      </h2>

      <div className="grid grid-cols-3 gap-6">

        {auctions.map(a=>(
          <div
            key={a.id}
            className="bg-white shadow-md rounded-xl p-5 hover:shadow-xl transition"
          >

            <h3 className="text-xl font-bold">
              {a.item_name}
            </h3>

            <p className="text-gray-600 mt-1">
              {a.description}
            </p>

            <p className="mt-3">
              Highest Bid:
              <span className="text-green-600 font-bold ml-1">
                {a.highest_bid} {a.base_currency}
              </span>
            </p>

            <p className="mt-2 text-red-600 font-medium">
              ⏱ {getTimeLeft(a.end_time)}
            </p>

            <Link
              to={`/auction/${a.id}`}
              className="inline-block mt-4 text-blue-600 hover:underline"
            >
              View Auction →
            </Link>

          </div>
        ))}

      </div>

    </div>

  );
}

export default Dashboard;
