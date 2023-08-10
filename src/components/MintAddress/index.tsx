import React, { useEffect } from "react";
import { useState } from "react";
import { Connection, Keypair } from "@solana/web3.js";
import { createMint } from "@solana/spl-token";

import * as buffer from "buffer";

function MintAddress() {
  window.Buffer = buffer.Buffer;
  const [privateKey, setprivateKey] = useState<string>();
  const [mintAddress, setMintAddress] = useState<string>();

  const dev_net_endpoint = "https://api.devnet.solana.com";
  const solanaConnection = new Connection(dev_net_endpoint);

  const createToken = async () => {
    if (privateKey) {
      const userWallet = Keypair.fromSecretKey(
        new Uint8Array(JSON.parse(privateKey))
      );
      const mint = await createMint(
        solanaConnection,
        userWallet,
        userWallet.publicKey,
        userWallet.publicKey,
        9
      );
      setMintAddress(mint.toBase58());
    }
  };

  return (
    <div className="w-100">
      <div className="w-50 center pt5">
        <div className="f3 fw5 mb4 purple">
          Create Your Own Token via Money Printer <strong>(MINT)</strong>
        </div>
        <div className="f3 fw6">Provide the Wallet Private Address :</div>
        <input
          className="w-100 h3 bn br3 f4 mt3"
          placeholder="Your Wallet Private Address..."
          onChange={(e) => setprivateKey(e.target.value)}
          type="password"
        />
        <div className="mt2 red fw5 f5">
          (*this address resembles the owner of the currency aka{" "}
          <strong className="black">MINT AUTHORITY</strong> and are allowing it
          create a currency of your own.)
        </div>
        <div>
          It is supposed to look like :
          [242,131,16,79,3,155,183,180,8,112,26,192]
        </div>
        {mintAddress && (
          <div className="fw6 f3 mt3">
            Your Mint Address is: <span className="red">{mintAddress}</span>
          </div>
        )}
        <div className="w-100 flex justify-center">
          <button
            className="pointer bg-black white pa3 bn br3 mt5"
            onClick={() => createToken()}
            disabled={privateKey ? false : true}
          >
            Create Token
          </button>
        </div>
      </div>
    </div>
  );
}

export default MintAddress;
