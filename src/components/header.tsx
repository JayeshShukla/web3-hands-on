import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div
      className="w-100 br3 ma2 h3 tc flex  justify-center items-center"
      style={{ background: "#4831D4" }}
    >
      <div className="w-auto pa3 f3 fw6 pointer">
        <Link to={`/`} className="black no-underline">
          BACK
        </Link>
      </div>

      <div className="w-100 f5 white">
        {" "}
        <span className="fw7 f2 bold" style={{ color: "#CCF381" }}>
          Solana{" "}
        </span>
        JDK Demo
      </div>
    </div>
  );
}
