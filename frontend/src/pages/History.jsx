import { useEffect,useState } from "react";

function History(){

  const [auctions,setAuctions] = useState([]);

  const userMap = {
    1:"Alice",
    2:"Bob",
    3:"Charlie"
  };

  useEffect(()=>{

    fetch("https://mini-auction-assessment.onrender.com/auction/history")
      .then(res=>res.json())
      .then(data=>setAuctions(data.auctions));

  },[]);

  return(

    <div>

      <h2 className="text-2xl font-semibold mb-4">
        Completed Auctions
      </h2>

      <table className="w-full border-collapse bg-white shadow">

        <thead className="bg-gray-200">

          <tr>

            <th className="p-3 text-left">Item</th>
            <th className="p-3 text-left">Winning Bid</th>
            <th className="p-3 text-left">Winner</th>
            <th className="p-3 text-left">End Time</th>

          </tr>

        </thead>

        <tbody>

          {auctions.map(a=>(
            <tr key={a.id} className="border-t">

              <td className="p-3">
                {a.item_name}
              </td>

              <td className="p-3">
                {a.highest_bid} {a.base_currency}
              </td>

              <td className="p-3">
                {userMap[a.winner_user_id] || "No bids"}
              </td>

              <td className="p-3">
                {a.end_time}
              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>

  );
}

export default History;
