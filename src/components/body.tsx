import React from "react";
// import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import NewWallet from "./NewWallet";
import DropaSol from "./DropaSol";

const Body = () => {
  return (
    <div className="w-100 vh-100 br3 ma2" style={{ background: "#CCF381" }}>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/create-wallet" element={<NewWallet />}></Route>
        <Route path="/drop-a-sol" element={<DropaSol />}></Route>
      </Routes>
    </div>
  );
};

export default Body;
