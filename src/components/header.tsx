import React from "react";

export default function Header() {
  return (
    <div
      className="w-100 br3 ma2 h3 tc flex flex-column justify-center items-center"
      style={{ background: "#4831D4" }}
    >
      <div className="f5 white">
        {" "}
        <span className="fw7 f2 bold" style={{ color: "#CCF381" }}>
          Solana{" "}
        </span>
        JDK Demo
      </div>
    </div>
  );
}
