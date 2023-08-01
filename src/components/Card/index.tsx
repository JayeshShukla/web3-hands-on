import React from "react";
import { Link } from "react-router-dom";

interface menulistItem {
  title: string;
  description: string;
  to: string;
}

function Card({ item }: { item: menulistItem }) {
  return (
    <div className="w-20 h5 bg-black ma3 br4 pointer pa3">
      <Link to={item.to} className="no-underline white">
        <div className="w-100 fw6 f3 bold">{item.title}</div>
        <div
          className="w-100 mt5"
          dangerouslySetInnerHTML={{ __html: item.description }}
        />
      </Link>
    </div>
  );
}

export default Card;
