import React from "react";

interface menulistItem {
  title: string;
  description: string;
}

function Card({ item }: { item: menulistItem }) {
  return (
    <div className="w-20 h5 bg-black white ma3 br4 pointer pa3">
      <div className="w-100 fw6 f3 bold">{item.title}</div>
      <div
        className="w-100 mt5"
        dangerouslySetInnerHTML={{ __html: item.description }}
      />
    </div>
  );
}

export default Card;
