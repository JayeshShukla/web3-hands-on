import React from "react";
import { useState } from "react";
import { Keypair } from "@solana/web3.js";

function NewWallet() {
  const [publickey, setPublicKey] = useState<string>();

  function saveSecret(secret: String) {
    const blob = new Blob([secret.toString()], { type: "application/json" });
    const anchor = document.createElement("a");
    anchor.href = URL.createObjectURL(blob);
    anchor.download = "guideSecret.json";
    document.body.appendChild(anchor);
    anchor.click();
    URL.revokeObjectURL(anchor.href);
    alert(
      "yout private key is downloaded in guideSecret.json, its the only way to recover or do anything with the wallet, please keep it safe."
    );
  }

  const handleWallet = () => {
    const keypair = Keypair.generate();
    setPublicKey(keypair.publicKey.toString());

    const secret_array = keypair.secretKey
      .toString()
      .split(",")
      .map((value) => Number(value));

    const secret = JSON.stringify(secret_array);
    saveSecret(secret);
  };

  return (
    <>
      <div className="justify-center flex">
        <div className="w-50 f5 fw5 mt5">
          If you new with solana and want to create a new public and private
          address/key, this page is usefull for you. Click on the below button
          to generate your new wallet key.
        </div>
      </div>
      <div className="justify-center flex">
        <button
          className="mt5 pointer mr3 bg-black white pa3 bn"
          onClick={() => handleWallet()}
        >
          Create New Wallet
        </button>
      </div>
      {publickey && (
        <div className="f4 fw6 mt5 flex justify-center">
          Your Wallet is now Created and its public address is :{" "}
          <span
            className="f4 fw8"
            style={{ color: "#4831D4" }}
          >{`${publickey}`}</span>
        </div>
      )}
      <div className="w-100 flex justify-center">
        <div className="f3 fw6 mt5 red w-70">
          Please Save Your Public Key and Private Key, if you forget your Pubic
          key it still can be generated via Private Key. So save Private Key at
          any cost, if lost your account is lost
        </div>
      </div>
    </>
  );
}

export default NewWallet;
