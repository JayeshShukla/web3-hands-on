import React, { useState } from "react";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { getAccount, mintTo } from "@solana/spl-token";
import * as buffer from "buffer";

function MintToken() {
  const [mintAddress, setMintAddress] = useState<string>();
  const [privateKey, setPrivateKey] = useState<string>();
  const [recieverAddress, setRecieverAddress] = useState<string>();
  const [displayToken, setDisplayToken] = useState<number>();

  window.Buffer = buffer.Buffer;

  const dev_net_endpoint = "https://api.devnet.solana.com";
  const solanaConnection = new Connection(dev_net_endpoint);

  const transferToken = async () => {
    if (privateKey && mintAddress && recieverAddress) {
      const userWallet = Keypair.fromSecretKey(
        new Uint8Array(JSON.parse(privateKey))
      );
      try {
        const sentToken = await mintTo(
          solanaConnection,
          userWallet,
          new PublicKey(mintAddress),
          new PublicKey(recieverAddress),
          userWallet.publicKey,
          100000000000
        );
        alert("100 Token recieved Succesfully.");
      } catch (error) {
        console.log(error);
        alert(
          "Some Error occured, please check your Private/Mint/Token addresses and try again."
        );
      }
    }
  };

  const checkTokens = async () => {
    if (recieverAddress) {
      try {
        const accountInfo = await getAccount(
          solanaConnection,
          new PublicKey(recieverAddress)
        );
        setDisplayToken(parseInt(accountInfo.amount.toString()) / 1000000000);
      } catch (err) {
        console.log(err);
        alert("cant fetch token, check the Reciepient address and try again");
      }
    }
  };

  return (
    <div className="w-100">
      <div className="w-50 center pt5">
        <div className="f3 fw5 mb4 purple">
          Transfer <strong className="red">100</strong>Tokens/Currencies into :
          <strong>(TOKEN ACCOUNT)</strong>
        </div>
        <div className="f3 fw6">Provide the Mint/Token/Currency Address :</div>
        <input
          className="w-100 h3 bn br3 f4 mt3"
          placeholder="Token Address..."
          onChange={(e) => setMintAddress(e.target.value)}
        />
        <div className="f3 fw6 mt2">Provide the Private Key :</div>
        <input
          className="w-100 h3 bn br3 f4 mt3"
          placeholder="Private Key..."
          onChange={(e) => setPrivateKey(e.target.value)}
          type="password"
        />
        <div className="f3 fw6 mt2">Provide the Reciepient Address :</div>
        <input
          className="w-100 h3 bn br3 f4 mt3"
          placeholder="Reciever Address ..."
          onChange={(e) => setRecieverAddress(e.target.value)}
        />
        <div className="w-100 flex justify-center">
          <button
            className="pointer bg-black white pa3 bn br3 mt3"
            onClick={() => transferToken()}
            disabled={
              mintAddress && privateKey && recieverAddress ? false : true
            }
          >
            Send 100 Tokens
          </button>
          <button
            className="pointer bg-black white pa3 bn br3 mt3 ml3"
            onClick={() => checkTokens()}
            disabled={recieverAddress ? false : true}
          >
            Check Tokens
          </button>
        </div>
        {displayToken && (
          <div className="w-100 flex justify-center mt3 fw6 f3">
            Number of Token's in Your Account :
            <strong className="red">{displayToken}</strong>
          </div>
        )}
      </div>
    </div>
  );
}

export default MintToken;
