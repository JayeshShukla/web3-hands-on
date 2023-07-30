import React, { useState } from "react";
import { useEffect } from "react";
import { Keypair, LAMPORTS_PER_SOL, Connection } from "@solana/web3.js";

const Wallet = () => {
  const dev_net_endpoint = "https://api.devnet.solana.com";
  const solanaConnection = new Connection(dev_net_endpoint);
  const [publicKey, setPublickey] = useState<string>();

  const handleWallet = () => {
    const keypair = Keypair.generate();
    setPublickey(keypair.publicKey.toString());

    const secret_array = keypair.secretKey
      .toString()
      .split(",")
      .map((value) => Number(value));

    const secret = JSON.stringify(secret_array);
    console.log(secret);
    saveSecret(secret);
  };

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

  const dropSol = async () => {
    // const airdropSignature = solanaConnection.requestAirdrop(
    //   keypair.publicKey,
    //   LAMPORTS_PER_SOL
    // );
    // try {
    //   const txId = await airdropSignature;
    //   console.log(`Airdrop Transaction Id: ${txId}`);
    //   console.log(`https://explorer.solana.com/tx/${txId}?cluster=devnet`);
    // } catch (err) {
    //   console.log(err);
    // }
  };

  return (
    <>
      <div style={{ width: "100%", height: "" }}></div>
      {/* <button onClick={() => handleWallet()}>Create a Wallet !</button>
      {publicKey && (
        <div>{`Your Public Key for of the wallet is : ${publicKey}`}</div>
      )}
      <div>
        already have a <b>public key </b>?
      </div>
      <input onChange={()=>handleChange()}/>
      <div>try dropping a SOL to it !</div>
      <div>
        dropping SOL to your account is important as it is the currency Solana
        uses to do transaction. And therefore they deduce some SOL in real world
        too.
      </div>
      <button onClick={() => dropSol()}>Drop 1 SOL</button> */}
    </>
  );
};

export default Wallet;
