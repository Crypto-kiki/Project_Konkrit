// Setup
import { Network, Alchemy } from "alchemy-sdk";
import axios from "axios";
import { useEffect, useState } from "react";
import Main from "./components/Main";
import NftCard from "./components/NftCard";
import Nft from "./components/Nft";
import { TbCoinBitcoin } from "react-icons/tb";
import { FaEthereum } from "react-icons/fa";
import Effect from "./components/Effect";

function App() {
  const settings = {
    apiKey: process.env.ETH_MAIN_API,
    network: Network.ETH_MAINNET,
  };

  const alchemy = new Alchemy(settings);

  const [account, setAccount] = useState("");

  const [nfts, setNfts] = useState([]);
  const [discord, setDiscord] = useState("");
  const [webUrl, setWebUrl] = useState("");
  const [nftName, setNftName] = useState("");
  const [nftContract, setNftContract] = useState([]);
  const [nftTotalBalance, setNftTotalBalance] = useState("");
  const [floorPrices, setFloorPrices] = useState([]);
  const [nftImage, setNftImage] = useState("");

  const [btcPrice, setBtcPrice] = useState("");
  const [ethPrice, setEthPrice] = useState("");
  const [maticPrice, setMaticPrice] = useState("");

  // getContractsForOwner : https://docs.alchemy.com/reference/getcontractsforowner
  useEffect(() => {
    let response = undefined;

    if (!account) {
      return;
    }

    const options = { method: "GET", headers: { accept: "application/json" } };

    fetch(
      `https://eth-mainnet.g.alchemy.com/nft/v2/t6V7kZSDHIWrkNIwlP7Q2Ptc6NZs8JmR/getContractsForOwner?owner=${account}&pageSize=100&withMetadata=true`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setNfts(response.contracts);

        const nfts = response.contracts;
        if (nfts.length > 0) {
          setNftName(nfts[0].opensea.collectionName);
          setNftContract(nfts[0].address);
          setNftTotalBalance(nfts[0].totalBalance);
          setNftImage(nfts[0].media[0].gateway);
          setDiscord(nfts[0].opensea.discordUrl);
          setWebUrl(nfts[0].opensea.externalUrl);
        }

        /** getFloorPrice
         * 문제점 : 위의 getContractForOwner 함수 내에도 floorPrice가 있지만, 업데이트된 날짜가 지난날짜임.(지갑 마지막 활성날짜인듯)
         * 따라서 마켓플레이스의 바닥가를 불러오는 getFloorPrice 함수만 별도로 빼서 작성함.
         * getFloorPrice 함수로 각 contracts에 맞는 배열로 담아줘야 함.
         * nfts는 response.contracts이므로, for문을 써서 바닥가를 setFloorPrices로 floorPrices useState에에 담아줌.
         */
        const callFloorPrices = async () => {
          if (nfts.length == 0) {
            return;
          }

          const prices = [];

          for (let i = 0; i < nfts.length; i++) {
            const price = await alchemy.nft.getFloorPrice(nfts[i].address);
            prices.push(price.openSea.floorPrice);
          }

          setFloorPrices(prices);
          console.log(floorPrices);
        };

        if (nfts.length > 0) {
          callFloorPrices();
        }
      });
  }, [account]);

  // 지갑 로그인 및 account 저장
  const onClickAccount = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setAccount(accounts[0]);
    } catch (error) {
      console.error(error);
    }
  };

  // 지갑 로그아웃
  const onClickLogOut = () => {
    setAccount("");
  };

  // 업비트 API
  const coinApi = async () => {
    try {
      const response = await axios.get(
        `https://api.upbit.com/v1/ticker?markets=KRW-BTC,%20KRW-ETH,%20KRW-MATIC`
      );
      const btcPrice = response.data[0].trade_price;
      const ethPrice = response.data[1].trade_price;
      const maticPrice = response.data[2].trade_price;
      setBtcPrice(btcPrice);
      setEthPrice(ethPrice);
      setMaticPrice(maticPrice);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      coinApi();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="bg-[#18181B] min-h-screen min-w-[1250px] relative">
        <header className="bg-black sticky top-0 h-20 w-full flex flex-row justify-between items-center text-white px-8">
          <div className="flex flex-row items-center">
            <a href="#" className="text-2xl font-bold text-yellow-300">
              KONKRIT
            </a>
            <div className="ml-36 text-lg">
              <a>Trending</a>
              <a className="mx-10">MY NFTs</a>
              <a>FAQ</a>
            </div>
          </div>
          <div className="flex flex-row items-center text-sm">
            <div>
              <TbCoinBitcoin className="inline w-7 h-7 object-cover mr-2" />{" "}
              {btcPrice.toLocaleString()}원
            </div>
            <div className="mx-8">
              <FaEthereum className="inline w-5 h-5 object-cover" />{" "}
              {ethPrice.toLocaleString()}원
            </div>
            <div className="flex flex-row justify-center items-center mr-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 1024 1024"
                id="polygon-token"
              >
                <circle cx="512" cy="512" r="512" fill="#8247E5"></circle>
                <path
                  fill="#fff"
                  d="M681.469 402.456C669.189 395.312 653.224 395.312 639.716 402.456L543.928 457.228L478.842 492.949L383.055 547.721C370.774 554.865 354.81 554.865 341.301 547.721L265.162 504.856C252.882 497.712 244.286 484.614 244.286 470.325V385.786C244.286 371.498 251.654 358.4 265.162 351.256L340.073 309.581C352.353 302.437 368.318 302.437 381.827 309.581L456.737 351.256C469.018 358.4 477.614 371.498 477.614 385.786V440.558L542.7 403.646V348.874C542.7 334.586 535.332 321.488 521.824 314.344L383.055 235.758C370.774 228.614 354.81 228.614 341.301 235.758L200.076 314.344C186.567 321.488 179.199 334.586 179.199 348.874V507.237C179.199 521.525 186.567 534.623 200.076 541.767L341.301 620.353C353.582 627.498 369.546 627.498 383.055 620.353L478.842 566.772L543.928 529.86L639.716 476.279C651.996 469.135 667.961 469.135 681.469 476.279L756.38 517.953C768.66 525.098 777.257 538.195 777.257 552.484V637.023C777.257 651.312 769.888 664.409 756.38 671.553L681.469 714.419C669.189 721.563 653.224 721.563 639.716 714.419L564.805 672.744C552.525 665.6 543.928 652.502 543.928 638.214V583.442L478.842 620.353V675.125C478.842 689.414 486.21 702.512 499.719 709.656L640.944 788.242C653.224 795.386 669.189 795.386 682.697 788.242L823.922 709.656C836.203 702.512 844.799 689.414 844.799 675.125V516.763C844.799 502.474 837.431 489.377 823.922 482.232L681.469 402.456Z"
                ></path>
              </svg>
              <span className="ml-2">{maticPrice.toLocaleString()}원</span>
            </div>
            {account ? (
              <button
                className="border-gray-100 border rounded-xl px-4 py-3 w-36 font-bold"
                onClick={onClickLogOut}
              >
                {account.substring(0, 4)}...
                {account.substring(account.length - 4)}
              </button>
            ) : (
              <button
                onClick={onClickAccount}
                className="border-yellow-300 border rounded-xl px-5 py-2 w-36 text-yellow-300 font-bold"
              >
                Wallet Connect
              </button>
            )}
          </div>
        </header>
        <Main />
        <span className="font-bold ml-14 pb-3 text-2xl inline-block rainbow">
          NFT Colleaction in Your Wallet
        </span>
        {account ? (
          <div className="grid grid-cols-2 gap-10 px-14 mt-8">
            {nfts.length > 0 ? (
              nfts.map((v, i) => (
                <Nft
                  key={v.address}
                  nftName={v.opensea.collectionName}
                  nftContract={v.address}
                  nftTotalBalance={v.totalBalance}
                  nftImage={v.media[0].gateway}
                  discord={v.opensea.discordUrl}
                  webUrl={v.opensea.externalUrl}
                  floorPrices={floorPrices[i]}
                  // floorPrices에 담긴 배열의 순서에 맞게 내려줘야 함.
                  btcPrice={btcPrice}
                  ethPrice={ethPrice}
                  coinApi={coinApi}
                />
              ))
            ) : (
              <div className="min-h-screen text-4xl flex flex-col items-center justify-center">
                Loading...
              </div>
            )}
          </div>
        ) : (
          <div className="text-white h-80 border-gray-600 shadow-lg shadow-gray-600 border mx-14 mt-8 rounded-lg flex flex-col justify-center items-center">
            <div>지갑을 연결해 주세요.</div>
            <button
              className="border-gray-200 border rounded-xl px-5 py-2 text-gray-200 font-bold mt-4"
              onClick={onClickAccount}
            >
              Wallet Connect
            </button>
          </div>
        )}
        <Effect />
      </div>
    </>
  );
}

export default App;
