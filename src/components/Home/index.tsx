import React from "react";
import Card from "../Card";
import { menulist } from "../menudata";

function Home() {
  const displayMenuList = menulist.map((itr, i) => {
    return <Card item={itr} key={i} />;
  });
  return <div className="flex flex-wrap pa5">{displayMenuList}</div>;
}

export default Home;
