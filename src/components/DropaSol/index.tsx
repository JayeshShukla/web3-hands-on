import React, { useState } from "react";
import { LAMPORTS_PER_SOL, Connection, Keypair } from "@solana/web3.js";
import { PublicKey } from "@solana/web3.js";

function DropaSol() {
  const [publicKey, setPublicKey] = useState<string>();
  const [balance, setBalance] = useState<string>();

  const dev_net_endpoint = "https://api.devnet.solana.com";
  const solanaConnection = new Connection(dev_net_endpoint);

  const handlePublicKey = (e: any) => {
    const temp_public_key = e.target.value;
    setPublicKey(temp_public_key);
  };

  const handleAirdrop = async () => {
    const airdropSignature =
      publicKey &&
      solanaConnection.requestAirdrop(
        new PublicKey(publicKey),
        LAMPORTS_PER_SOL
      );
    try {
      const txId = await airdropSignature;
      console.log(`Airdrop Transaction Id: ${txId}`);
      console.log(`https://explorer.solana.com/tx/${txId}?cluster=devnet`);
      alert(`1 SOL has been Airdropped to your Address`);
    } catch (err) {
      console.log(err);
      alert(`Air Dropped Failed, too many attempts, please try after 24 Hrs`);
    }
  };

  const checkBalance = async () => {
    const balanceSignature =
      publicKey && solanaConnection.getBalance(new PublicKey(publicKey));
    try {
      const balance = await balanceSignature;
      setBalance(
        `${balance?.toString().slice(0, 1)}.${balance?.toString().slice(1)}`
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-100 pa5">
      <div className="w-100 mr2">
        <input
          className="w-100 h3 bn br3 f4"
          placeholder="Your Wallet Public Address..."
          onChange={(e) => handlePublicKey(e)}
          value={publicKey}
        />
      </div>
      <div className="w-100 flex justify-center mt3">
        <button
          className="pointer bg-black white pa3 bn br3 mr3"
          onClick={() => publicKey && handleAirdrop()}
          disabled={publicKey ? false : true}
        >
          Drop 1 SOL
        </button>
        <button
          className="pointer bg-black white pa3 bn br3"
          onClick={() => checkBalance()}
          disabled={publicKey ? false : true}
        >
          Check Balance
        </button>
      </div>
      <div className="w-100 flex justify-center mt5 f5 fw6">
        {balance && (
          <div>
            The amount in your Wallet is :{" "}
            <span className="red">{balance}</span> SOL
          </div>
        )}
      </div>
    </div>
  );
}

export default DropaSol;
