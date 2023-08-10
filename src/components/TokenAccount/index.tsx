import React, { useState } from "react";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import {
  createAssociatedTokenAccount,
  getOrCreateAssociatedTokenAccount,
} from "@solana/spl-token";
import * as buffer from "buffer";

function TokenAccount() {
  const [tokenAddress, setTokenAddress] = useState<string>();
  const [privateKey, setPrivateKey] = useState<string>();
  const [tokenAccount, setTokenAccount] = useState<string>();

  window.Buffer = buffer.Buffer;

  const dev_net_endpoint = "https://api.devnet.solana.com";
  const solanaConnection = new Connection(dev_net_endpoint);

  const createToken = async () => {
    if (privateKey && tokenAddress) {
      const userWallet = Keypair.fromSecretKey(
        new Uint8Array(JSON.parse(privateKey))
      );
      try {
        const createdToken = await createAssociatedTokenAccount(
          solanaConnection,
          userWallet,
          new PublicKey(tokenAddress),
          userWallet.publicKey
        );
        setTokenAccount(createdToken.toString());
      } catch (error) {
        alert("Your Associated Token is already there, cannot create new.");
        const foundToken = await getOrCreateAssociatedTokenAccount(
          solanaConnection,
          userWallet,
          new PublicKey(tokenAddress),
          userWallet.publicKey
        );
        setTokenAccount(foundToken.address.toString());
      }
    }
  };

  return (
    <div className="w-100">
      <div className="w-50 center pt5">
        <div className="f3 fw5 mb4 purple">
          Create A bank Account to hold the Currency Generated via :
          <strong>(MINT ADDRESS)</strong>
        </div>
        <div className="f3 fw6">Provide the Token/Currency Address :</div>
        <input
          className="w-100 h3 bn br3 f4 mt3"
          placeholder="Token Address..."
          onChange={(e) => setTokenAddress(e.target.value)}
        />
        <div className="f3 fw6 mt2">Provide the Private Key :</div>
        <input
          className="w-100 h3 bn br3 f4 mt3"
          placeholder="Private Key..."
          onChange={(e) => setPrivateKey(e.target.value)}
          type="password"
        />
        <div className="w-100 flex justify-center">
          <button
            className="pointer bg-black white pa3 bn br3 mt3"
            onClick={() => createToken()}
            disabled={tokenAddress && privateKey ? false : true}
          >
            Create/Find Token Account
          </button>
        </div>
        {tokenAccount && (
          <div className="mt2 flex nowrap mt3">
            Your Associated Token Account Address is :
            <strong className="red">{tokenAccount}</strong>
          </div>
        )}
      </div>
    </div>
  );
}

export default TokenAccount;
