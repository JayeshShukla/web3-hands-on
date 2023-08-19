import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import NewWallet from "./NewWallet";
import DropaSol from "./DropaSol";
import MintAddress from "./MintAddress";
import TokenAccount from "./TokenAccount";
import MintToken from "./MintToken";
import SendToken from "./SendToken";

const Body = () => {
  return (
    <div className="w-100 vh-100 br3 ma2" style={{ background: "#CCF381" }}>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/create-wallet" element={<NewWallet />}></Route>
        <Route path="/drop-a-sol" element={<DropaSol />}></Route>
        <Route path="/mint-address" element={<MintAddress />}></Route>
        <Route path="/token-account" element={<TokenAccount />}></Route>
        <Route path="/mint-token" element={<MintToken />}></Route>
        <Route path="/send-token" element={<SendToken />}></Route>
      </Routes>
    </div>
  );
};

export default Body;
