import { useEffect, useState } from "react";

const Collection = () => {
  const [collectionName, setCollectionName] = useState([]);
  // const [collectionName, setCollectionName] = useState([]);

  const options = { method: "GET", headers: { accept: "application/json" } };

  const checkSpam = async () => {
    await fetch(
      "https://eth-mainnet.g.alchemy.com/nft/v3/t6V7kZSDHIWrkNIwlP7Q2Ptc6NZs8JmR/isSpamContract?contractAddress=0x11bc4c6a82b0b356c4f15c77a328ed2815924c62",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        if (response === false) return;
        console.log(response);
        console.log(response);
      })
      .catch((err) => console.error(err));

    fetch(
      "https://eth-mainnet.g.alchemy.com/nft/v3/t6V7kZSDHIWrkNIwlP7Q2Ptc6NZs8JmR/getContractMetadata?contractAddress=0x11bc4c6a82b0b356c4f15c77a328ed2815924c62",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        collectionName.push(response.name);
        console.log(collectionName);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    checkSpam();
  }, []);

  return (
    <div className="text-white">
      <form>
        <input type="text" />
      </form>
      <div></div>
    </div>
  );
};

export default Collection;
