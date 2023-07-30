import React from "react";
// import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import NewWallet from "./NewWallet";

const Body = () => {
  return (
    <div className="w-100 vh-100 br3 ma2" style={{ background: "#CCF381" }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/create-wallet" element={<NewWallet />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Body;
