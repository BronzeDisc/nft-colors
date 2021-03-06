import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
const { useState, useEffect } = require("react");
import getBlockchain from "../ethereum.js";
import axios from "axios";

export const Home = () => {
  const [tokenInfo, setTokenInfo] = useState(undefined);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const init = async () => {
      const { nft } = await getBlockchain();
      const balance = await nft.balanceOf(
        nft.provider.provider.selectedAddress
      );

      setTokenInfo(nft);

      console.log(nft.provider.provider.selectedAddress);
      console.log(nft.provider);

      console.log(`balance: ${balance}`);

      for (let i = 0; i < balance; i++) {
        let tokenURI = await nft.tokenURI(i);
        const data = await axios.get(tokenURI);
        const name = await data.data.title;
        const picture = await data.data.properties.image.description;
        console.log(data);
        setImages((images) => [...images, { picture, name }]);
      }
    };
    init();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        {images.map((item, key) => {
          return (
            <div key={key}>
              <div>{item.name}</div>
              <img src={item.picture} width="600px" alt="" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
