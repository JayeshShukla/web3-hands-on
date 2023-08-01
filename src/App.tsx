import React from "react";
import Header from "./components/header";
import Body from "./components/body";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App relative">
        <Header />
        <Body />
      </div>
    </BrowserRouter>
  );
}

export default App;
