import { Network, Alchemy } from "alchemy-sdk";
import axios from "axios";
import { useEffect, useState } from "react";
import NeonText from "../components/NeonText";
import Nft from "../components/Nft";
import Header from "../components/Header";
import LaunchProject from "../components/LaunchProject";
import { CONTRACT_ABI } from "../web3.config";
import { CONTRACT_ADDRESS } from "../web3.config";
import Web3 from "web3";
import Footer from "../components/Footer";

const web3 = new Web3(window.ethereum);
const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

const Main = ({ account, setAccount }) => {
  const settings = {
    apiKey: process.env.ETH_MAIN_API,
    network: Network.ETH_MAINNET,
  };

  const alchemy = new Alchemy(settings);

  const [nfts, setNfts] = useState([]);
  const [discord, setDiscord] = useState("");
  const [webUrl, setWebUrl] = useState("");
  const [nftName, setNftName] = useState("");
  const [nftContract, setNftContract] = useState([]);
  const [nftTotalBalance, setNftTotalBalance] = useState([]);
  const [floorPrices, setFloorPrices] = useState([]);
  const [nftImage, setNftImage] = useState("");

  const [totalNft, setTotalNft] = useState(0);
  const [totalValue, setTotalValue] = useState(0);

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
      `https://eth-mainnet.g.alchemy.com/nft/v2/${process.env.REACT_APP_ETH_MAIN_API}/getContractsForOwner?owner=${account}&pageSize=100&withMetadata=true`,
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
         * https://docs.alchemy.com/reference/getfloorprice
         * 문제점 : 위의 getContractForOwner 함수 내에도 floorPrice가 있지만, 업데이트된 날짜가 지난날짜임.
         * 따라서 마켓플레이스의 바닥가를 불러오는 getFloorPrice 함수만 별도로 빼서 작성함.
         * getFloorPrice 함수로 각 contracts에 맞는 배열로 담아줘야 함.
         * nfts는 response.contracts이므로, for문을 써서 바닥가를 setFloorPrices로 floorPrices useState에에 담아줌.
         * 바닥가 데이터를 불러오는데 시간이 걸림.
         * 429 오류는 요청속도가 빠르거나 API 사용량이 초과된 경우 발생. 데이터는 잘 불러옴. 일시적인듯?
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
  const onClickLogOut = async () => {
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

  // 런치패드 데이터 불러오기

  const [mintedNft, setMintedNFt] = useState(0);
  const [myNft, setMyNft] = useState(0);
  const [page, setPage] = useState(1);

  const getTotalNft = async () => {
    try {
      if (!contract) return;

      const response = await contract.methods.totalNft().call();

      setTotalNft(response);
    } catch (error) {
      console.error(error);
    }
  };

  const getMintedNft = async () => {
    try {
      if (!contract) return;

      const response = await contract.methods.mintedNft().call();

      setMintedNFt(response);
      setPage(parseInt((parseInt(response) - 1) / 10) + 1);
    } catch (error) {
      console.error(error);
    }
  };

  const getMyNft = async () => {
    try {
      if (!contract || !account) return;

      const response = await contract.methods.balanceOf(account).call();

      setMyNft(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTotalNft();
    getMintedNft();
  }, []);

  useEffect(() => {
    getMyNft();
  }, [account]);

  useEffect(() => {
    const interval = setInterval(() => {
      coinApi();
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="max-w-screen-xl mx-auto pb-10">
        <Header
          account={account}
          onClickAccount={onClickAccount}
          onClickLogOut={onClickLogOut}
          btcPrice={btcPrice}
          ethPrice={ethPrice}
          maticPrice={maticPrice}
        />
        <NeonText />
        <LaunchProject
          contract={contract}
          account={account}
          totalNft={totalNft}
          getTotalNft={getTotalNft}
        />
        <span
          id="myNft"
          className="font-bold pb-3 text-2xl inline-block rainbow mb-8"
        >
          My NFT Colleaction in Your Wallet
        </span>
        {account ? (
          <div className="grid grid-cols-2 gap-10">
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
                  ethPrice={ethPrice}
                  coinApi={coinApi}
                  account={account}
                />
              ))
            ) : (
              <div className="min-h-screen text-4xl flex flex-col items-center justify-center">
                None
              </div>
            )}
          </div>
        ) : (
          <div className="text-white h-80 border-gray-600 shadow-lg shadow-gray-600 border mt-8 rounded-lg flex flex-col justify-center items-center">
            <div>지갑을 연결해 주세요.</div>
            <button
              className="text-yellow-300 border-yellow-300 border rounded-xl px-5 py-2  font-bold mt-4 hover:bg-yellow-300 hover:text-gray-900"
              onClick={onClickAccount}
            >
              Wallet Connect
            </button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Main;
