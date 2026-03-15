import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CreateAuction from "./pages/CreateAuction";
import AuctionDetail from "./pages/AuctionDetail";
import History from "./pages/History";
import { useState } from "react";

function App(){

  const [user,setUser] = useState(1);

  return(

    <BrowserRouter>

      <div className="min-h-screen bg-gray-100">

        {/* HEADER */}
        <header className="bg-gray-900 text-white p-4 flex justify-between">

          <h1 className="text-xl font-bold">
            Mini Auction Platform
          </h1>

          <div>

            Current User:

            <select
              className="text-black ml-2"
              value={user}
              onChange={(e)=>setUser(e.target.value)}
            >
              <option value="1">Alice</option>
              <option value="2">Bob</option>
              <option value="3">Charlie</option>
            </select>

          </div>

        </header>

        {/* NAVIGATION */}
        <nav className="bg-white p-4 shadow flex gap-4">

          <Link to="/" className="text-blue-600">Dashboard</Link>
          <Link to="/create" className="text-blue-600">Create Auction</Link>
          <Link to="/history" className="text-blue-600">Auction History</Link>

        </nav>

        {/* ROUTES */}
        <main className="p-6">

          <Routes>

            <Route path="/" element={<Dashboard/>}/>
            <Route path="/create" element={<CreateAuction user={user}/>}/>
            <Route path="/auction/:id" element={<AuctionDetail user={user}/>}/>
            <Route path="/history" element={<History/>}/>

          </Routes>

        </main>

      </div>

    </BrowserRouter>

  );
}

export default App;