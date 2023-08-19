import React, { useState } from "react";
import {
  transfer,
  getOrCreateAssociatedTokenAccount,
  createAssociatedTokenAccount,
} from "@solana/spl-token";
import { Connection, PublicKey, Keypair } from "@solana/web3.js";
import * as buffer from "buffer";

function SendToken() {
  window.Buffer = buffer.Buffer;

  const dev_net_endpoint = "https://api.devnet.solana.com";
  const solanaConnection = new Connection(dev_net_endpoint);

  const [senderPrivateKey, setSenderPrivateKey] = useState<string>();
  const [recieverPublicKey, setRecieverPublicKey] = useState<string>();
  const [tokenAmount, setTokenAmount] = useState<string>();
  const [mintAddress, setMintAddress] = useState<string>();
  const [createdTokenAccount, setCreatedTokenAccount] = useState<any>();

  const sendToken = async () => {
    if (senderPrivateKey && recieverPublicKey && tokenAmount && mintAddress) {
      const senderWallet = Keypair.fromSecretKey(
        new Uint8Array(JSON.parse(senderPrivateKey))
      );
      try {
        const createdToken = await createAssociatedTokenAccount(
          solanaConnection,
          senderWallet,
          new PublicKey(mintAddress),
          new PublicKey(recieverPublicKey)
        );
        setCreatedTokenAccount(createdToken);
      } catch (error) {
        const foundToken = await getOrCreateAssociatedTokenAccount(
          solanaConnection,
          senderWallet,
          new PublicKey(mintAddress),
          new PublicKey(recieverPublicKey)
        );
        setCreatedTokenAccount(foundToken);
      }

      if (createdTokenAccount) {
        try {
          const senderTokenAccount = await getOrCreateAssociatedTokenAccount(
            solanaConnection,
            senderWallet,
            new PublicKey(mintAddress),
            new PublicKey(senderWallet.publicKey)
          );
          const signature = await transfer(
            solanaConnection,
            senderWallet,
            senderTokenAccount.address,
            createdTokenAccount.address,
            senderTokenAccount.owner,
            parseInt(tokenAmount)
          );
          alert(
            `${tokenAmount} Tokens of ${mintAddress} has been transfered to ${createdTokenAccount.address.toString()} Token Account`
          );
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  return (
    <div className="w-100 pa5">
      <div className="w-100 flex justify-center f3 fw6 mb1">
        Send Token To a user.
      </div>
      <div className="w-100 flex justify-center red f5 fw6 mb3">
        Dont worry if they dont posses token Account, we will create one
      </div>
      <div className="w-100 mr2">
        <input
          className="w-100 h3 bn br3 f4"
          placeholder="Senders Private Key..."
          onChange={(e) => setSenderPrivateKey(e.target.value)}
          value={senderPrivateKey}
          type="password"
        />
      </div>
      <div className="w-100 mr2 mt3">
        <input
          className="w-100 h3 bn br3 f4"
          placeholder="Reciever Public Key..."
          onChange={(e) => setRecieverPublicKey(e.target.value)}
          value={recieverPublicKey}
        />
      </div>
      <div className="w-100 mr2 mt3">
        <input
          className="w-100 h3 bn br3 f4"
          placeholder="Mint Address ..."
          onChange={(e) => setMintAddress(e.target.value)}
          value={mintAddress}
        />
      </div>
      <div className="w-100 mr2 mt3">
        <input
          className="w-100 h3 bn br3 f4"
          placeholder="Token Amount to be sent..."
          onChange={(e) => setTokenAmount(e.target.value)}
          value={tokenAmount}
          type="number"
        />
      </div>
      <div className="w-100 flex justify-center mt3">
        <button
          className="pointer bg-black white pa3 bn br3"
          onClick={() => sendToken()}
          disabled={
            senderPrivateKey && recieverPublicKey && tokenAmount && mintAddress
              ? false
              : true
          }
        >
          Send Token
        </button>
      </div>
      <div className="w-100 flex justify-center mt5 f5 fw6">
        {createdTokenAccount && (
          <div>
            Your Token Account is :{" "}
            <span className="red">
              {createdTokenAccount.address.toString()}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default SendToken;
