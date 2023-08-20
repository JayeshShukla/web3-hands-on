import React, { useState, ChangeEvent, useEffect } from "react";

import {
  bundlrStorage,
  keypairIdentity,
  Metaplex,
  UploadMetadataInput,
  toMetaplexFileFromBrowser,
} from "@metaplex-foundation/js";

import { Connection, Keypair, clusterApiUrl } from "@solana/web3.js";

import {
  DataV2,
  createCreateMetadataAccountV3Instruction,
} from "@metaplex-foundation/mpl-token-metadata";

function Metadata() {
  const [ownerPrivateKey, setOwnerPrivateKey] = useState<string>();
  const [browserFiles, setBrowserFiles] = useState<FileList | null>(null);
  const [dataToBeUpLoaded, setDataToBeUpLoaded] = useState<UploadMetadataInput>(
    {
      name: "",
      symbol: "",
      description: "",
    }
  );
  const { name, symbol, description } = dataToBeUpLoaded;

  // const dev_net_endpoint = "https://api.devnet.solana.com";
  // const solanaConnection = new Connection(dev_net_endpoint);

  const connection = new Connection(clusterApiUrl("devnet"));

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDataToBeUpLoaded((prevItem) => ({
      ...prevItem,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBrowserFiles(e.target.files);
  };

  const uploadMetadata = async (tokenMetadata: UploadMetadataInput) => {
    try {
      if (browserFiles && ownerPrivateKey) {
        const ownerWallet = Keypair.fromSecretKey(
          new Uint8Array(JSON.parse(ownerPrivateKey))
        );

        const metaplex = Metaplex.make(connection)
          .use(keypairIdentity(ownerWallet))
          .use(
            bundlrStorage({
              address: "https://devnet.bundlr.network",
              providerUrl: "https://api.devnet.solana.com",
              timeout: 60000,
            })
          );

        const { uri, metadata } = await metaplex.nfts().uploadMetadata({
          name: tokenMetadata.name,
          // symbol: tokenMetadata.symbol,
          // description: tokenMetadata.description,
          image: await toMetaplexFileFromBrowser(browserFiles[0]),
        });
        console.log(metadata.image);
        console.log(uri);
      }
    } catch (error) {
      console.log(error);
    }

    // let url = undefined;
    // if (ownerPrivateKey) {
    //   try {
    // const ownerWallet = Keypair.fromSecretKey(
    //   new Uint8Array(JSON.parse(ownerPrivateKey))
    // );
    //     const metaplex = Metaplex.make(connection)
    //       .use(keypairIdentity(ownerWallet))
    //       .use(
    //         bundlrStorage({
    //           address: "https://devnet.bundlr.network",
    //           providerUrl: "https://api.devnet.solana.com",
    //           timeout: 60000,
    //         })
    //       );
    //     const { uri } = await metaplex.nfts().uploadMetadata(tokenMetadata);
    //     console.log(`Arweave URL: `, uri);
    //     url = uri;
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
    // return url;
  };

  const uploadMetaData = async () => {
    if (
      ownerPrivateKey &&
      name &&
      symbol &&
      description &&
      browserFiles?.length
    ) {
      try {
        // let metaDataUri =
        await uploadMetadata(dataToBeUpLoaded);
        // console.log("returned", metaDataUri);
        // if (metaDataUri) {
        //   var ON_CHAIN_METADATA = {
        //     name: name,
        //     symbol: symbol,
        //     uri: metaDataUri,
        //     sellerFeeBasisPoints: 0,
        //     creators: null,
        //     collection: null,
        //     uses: null,
        //   } as DataV2;
        //   console.log(ON_CHAIN_METADATA);
        // }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="w-100 pa5">
      <div className="w-100 flex justify-center f3 fw6 mb1">
        Attach Meta Data
      </div>
      <div className="w-100 mr2">
        <input
          className="w-100 h3 bn br3 f4"
          placeholder="Owner's Private Key..."
          onChange={(e) => setOwnerPrivateKey(e.target.value)}
          value={ownerPrivateKey}
          type="password"
        />
      </div>
      <div className="w-100 mr2 mt3">
        <input
          className="w-100 h3 bn br3 f4"
          placeholder="Enter Name for Your Token"
          onChange={(e) => handleChange(e)}
          value={name}
          name="name"
        />
      </div>
      <div className="w-100 mr2 mt3">
        <input
          className="w-100 h3 bn br3 f4"
          placeholder="Give Your Token a Symbol"
          onChange={(e) => handleChange(e)}
          value={symbol}
          name="symbol"
        />
      </div>
      <div className="w-100 mr2 mt3">
        <input
          className="w-100 h3 bn br3 f4"
          placeholder="Enter a Description of Your Token"
          onChange={(e) => handleChange(e)}
          value={description}
          name="description"
        />
      </div>
      <div className="w-100 mr2 mt3">
        <input
          className="w-100 h3 bn br3 f4"
          placeholder="Public url for your Token Image"
          onChange={(e) => handleFileChange(e)}
          type="file"
        />
        <div>Ex: https://example1.com</div>
      </div>
      <div className="w-100 flex justify-center mt3">
        <button
          className="pointer bg-black white pa3 bn br3"
          onClick={() => uploadMetaData()}
          disabled={
            ownerPrivateKey &&
            name &&
            symbol &&
            description &&
            browserFiles?.length
              ? false
              : true
          }
        >
          Upload Token MetaData
        </button>
      </div>
      <div className="w-100 flex justify-center mt5 f5 fw6">
        {/* {createdTokenAccount && (
          <div>
            Your Token Account is :{" "}
            <span className="red">
              {createdTokenAccount.address.toString()}
            </span>
          </div>
        )} */}
      </div>
    </div>
  );
}

export default Metadata;

// const userWallet = Keypair.fromSecretKey(
//     new Uint8Array(JSON.parse(ownerPrivateKey))
//   );

//   const metaplex = Metaplex.make(solanaConnection)
//     .use(keypairIdentity(userWallet))
//     .use(
//       bundlrStorage({
//         address: "https://devnet.bundlr.network",
//         providerUrl: dev_net_endpoint,
//         timeout: 60000,
//       })
//     );

//   const uploadMetadata = async (
//     tokenMetadata: UploadMetadataInput
//   ): Promise<string> => {
//     //Upload to Arweave
//     const { uri } = await metaplex.nfts().uploadMetadata(tokenMetadata);
//     console.log(`Arweave URL: `, uri);
//     return uri;
//   };

//   uploadMetadata();

// const attachMetaData = async () => {
//     const MY_TOKEN_METADATA: UploadMetadataInput = {
//       name: "Test Token",
//       symbol: "TEZT",
//       description: "This is a test token!",
//       image: "https://pasteboard.co/EUTmSuaGBd7r.jpg",
//     };

//     const ON_CHAIN_METADATA = {
//       name: MY_TOKEN_METADATA.name,
//       symbol: MY_TOKEN_METADATA.symbol,
//       uri: "TO_UPDATE_LATER",
//       sellerFeeBasisPoints: 0,
//       creators: null,
//       collection: null,
//       uses: null,
//     } as DataV2;
//   };
