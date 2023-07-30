import React, { useState } from "react";
import { useEffect } from "react";
import { Keypair, LAMPORTS_PER_SOL, Connection } from "@solana/web3.js";

const Wallet = () => {
  const dev_net_endpoint = "https://api.devnet.solana.com";
  //   const solanaConnection = new Connection(dev_net_endpoint);
  const [publicKey, setPublickey] = useState<string>();

  const handleWallet = () => {
    const keypair = Keypair.generate();
    setPublickey(keypair.publicKey.toString());

    const secret_array = keypair.secretKey
      .toString()
      .split(",")
      .map((value) => Number(value));

    const secret = JSON.stringify(secret_array);
  };

  return (
    <>
      <button onClick={() => handleWallet()}>Create a Wallet !</button>
      {publicKey && (
        <div>{`Your Public Key for of the wallet is : ${publicKey}`}</div>
      )}
    </>
  );
};

export default Wallet;
