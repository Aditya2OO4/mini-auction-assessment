import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateAuction(){

  const navigate = useNavigate();

  const [item,setItem] = useState("");
  const [description,setDescription] = useState("");
  const [price,setPrice] = useState("");
  const [duration,setDuration] = useState("");
  const [currency,setCurrency] = useState("USD");
  const [loading,setLoading] = useState(false);

  const createAuction = async () => {

    if(loading) return;

    setLoading(true);

    const response = await fetch("https://mini-auction-assessment.onrender.com/auction/create",{

      method:"POST",

      headers:{
        "Content-Type":"application/json"
      },

      body:JSON.stringify({
        item_name:item,
        description:description,
        start_price:Number(price),
        currency:currency,
        duration:Number(duration)
      })

    });

    const data = await response.json();

    alert("Auction created successfully!");

    navigate("/");

    setLoading(false);
  };

  return(

    <div className="max-w-md">

      <h2 className="text-2xl mb-4">
        Create Auction
      </h2>

      <input
        className="border p-2 w-full mb-2"
        placeholder="Item Name"
        onChange={(e)=>setItem(e.target.value)}
      />

      <textarea
        className="border p-2 w-full mb-2"
        placeholder="Description"
        onChange={(e)=>setDescription(e.target.value)}
      />

      <input
        className="border p-2 w-full mb-2"
        placeholder="Starting Price"
        onChange={(e)=>setPrice(e.target.value)}
      />

      <input
        className="border p-2 w-full mb-2"
        placeholder="Duration (minutes)"
        onChange={(e)=>setDuration(e.target.value)}
      />

      <select
        className="border p-2 w-full mb-4"
        onChange={(e)=>setCurrency(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="INR">INR</option>
        <option value="EUR">EUR</option>
      </select>

      <button
        onClick={createAuction}
        className="bg-blue-500 text-white px-4 py-2 rounded w-full"
      >
        Create Auction
      </button>

    </div>

  );
}

export default CreateAuction;
