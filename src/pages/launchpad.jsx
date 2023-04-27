import { useEffect, useState } from "react";
import { CONTRACT_ABI } from "../web3.config";
import { CONTRACT_ADDRESS } from "../web3.config";
import Web3 from "web3";
import axios from "axios";
import { SiOpensea } from "react-icons/si";
import { Link } from "react-router-dom";

const web3 = new Web3(window.ethereum);
const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

const Launchpad = ({ account, setAccount }) => {
  const [totalNft, setTotalNft] = useState(0);
  const [mintedNft, setMintedNFt] = useState(0);
  const [nftMetadata, setNftMetadata] = useState();
  const [myNft, setMyNft] = useState(0);

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
    } catch (error) {
      console.error(error);
    }
  };

  const getMyNft = async () => {
    try {
      if (!contract || !account) return;

      const response = await contract.methods.balanceOf(account).call();
      console.log(response);

      setMyNft(response);
    } catch (error) {
      console.error(error);
    }
  };

  const onClickMint = async () => {
    try {
      // 버튼을 찾아서 disabled 속성을 true로 설정
      const mintButton = document.getElementById("mintButton");
      mintButton.disabled = true;

      if (myNft >= 18) {
        alert("지갑당 1개만 민팅이 가능합니다.");
        return;
      }

      const mintNft = await contract.methods.mintNft().send({ from: account });

      if (!mintNft.status) return;

      // 민팅하면 해당 컨트랙트 보유 갯수.
      const balanceOf = await contract.methods.balanceOf(account).call();

      // 방금 민팅한 tokenId값
      const tokenOfOwnerByIndex = await contract.methods
        .tokenOfOwnerByIndex(account, parseInt(balanceOf - 1))
        .call();

      // 방금 민팅한 toeknId값의 uri 주소
      const tokenURI = await contract.methods
        .tokenURI(tokenOfOwnerByIndex)
        .call();
      console.log(tokenURI);

      // 가져온 tokenURI의 주소에서 메타데이터를 가져옴.
      const response = await axios.get(tokenURI);
      console.log(response);
      console.log(response);
      setNftMetadata(response.data);

      // 10초 후에 버튼의 disabled 속성을 false로 설정
      setTimeout(() => {
        mintButton.disabled = false;
      }, 10000);
    } catch (error) {
      console.error(error);
    }
  };

  // const [rotateImgSrc, setImgSrc] = useState("");

  const rotateImage = () => {
    const ranNum = Math.floor(Math.random() * 50) + 1;
    const imgSrc = `${process.env.PUBLIC_URL}/images/Character/${ranNum}.png`;

    // setImgSrc(getImgSrc);
  };

  useEffect(() => {
    getMintedNft();
    getTotalNft();
    onClickAccount();
    setMyNft();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      rotateImage();
      getMintedNft();
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      getMyNft();
    }, 10000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto flex min-h-screen flex-col text-white px-14 pb-20">
      <div className="text-4xl font-bold text-yellow-300 my-10">
        <Link to={`/`}>
          <span>KONKRIT</span>
        </Link>
        <span> Launchpad</span>
      </div>
      <div className="border border-blue-200 h-2/3 p-10 flex justify-between rounded-2xl mt-10">
        <img
          src={imgSrc}
          className="w-[512px] h-[512px] rounded-2xl overflow-hidden"
        />
        <div className="flex flex-col justify-between">
          <div className="flex flex-col mr-10">
            <div>퍼블릭 세일 진행중</div>
            <div className="font-bold text-5xl mt-3">Collection Name</div>
            <div className="text-xl mt-8">총 발행량</div>
            <div className="text-2xl font-bold">{totalNft} 개</div>
          </div>
          <div className="text-right">
            <div className="text-xl">현재 민팅 된 수량</div>
            <div className="text-2xl">
              {mintedNft} / {totalNft}
            </div>
            <div className="flex flex-col">
              <div className="flex items-center mt-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  fill="none"
                  viewBox="0 0 1024 1024"
                  id="polygon-token"
                >
                  <circle cx="512" cy="512" r="512" fill="#8247E5"></circle>
                  <path
                    fill="#fff"
                    d="M681.469 402.456C669.189 395.312 653.224 395.312 639.716 402.456L543.928 457.228L478.842 492.949L383.055 547.721C370.774 554.865 354.81 554.865 341.301 547.721L265.162 504.856C252.882 497.712 244.286 484.614 244.286 470.325V385.786C244.286 371.498 251.654 358.4 265.162 351.256L340.073 309.581C352.353 302.437 368.318 302.437 381.827 309.581L456.737 351.256C469.018 358.4 477.614 371.498 477.614 385.786V440.558L542.7 403.646V348.874C542.7 334.586 535.332 321.488 521.824 314.344L383.055 235.758C370.774 228.614 354.81 228.614 341.301 235.758L200.076 314.344C186.567 321.488 179.199 334.586 179.199 348.874V507.237C179.199 521.525 186.567 534.623 200.076 541.767L341.301 620.353C353.582 627.498 369.546 627.498 383.055 620.353L478.842 566.772L543.928 529.86L639.716 476.279C651.996 469.135 667.961 469.135 681.469 476.279L756.38 517.953C768.66 525.098 777.257 538.195 777.257 552.484V637.023C777.257 651.312 769.888 664.409 756.38 671.553L681.469 714.419C669.189 721.563 653.224 721.563 639.716 714.419L564.805 672.744C552.525 665.6 543.928 652.502 543.928 638.214V583.442L478.842 620.353V675.125C478.842 689.414 486.21 702.512 499.719 709.656L640.944 788.242C653.224 795.386 669.189 795.386 682.697 788.242L823.922 709.656C836.203 702.512 844.799 689.414 844.799 675.125V516.763C844.799 502.474 837.431 489.377 823.922 482.232L681.469 402.456Z"
                  ></path>
                </svg>{" "}
                <div className="ml-8 font-bold text-2xl">0.01 MATIC</div>
              </div>
              <button
                id="mintButton"
                className="border border-blue-100 text-2xl py-4 mt-8 rounded-xl"
                onClick={onClickMint}
                disabled={false}
              >
                MINT
              </button>
            </div>
            <div className="mt-4">트랜잭션 당 1개만 민팅 가능합니다.</div>
            <div>민팅 후 10초간 버튼이 비활성화 됩니다.</div>
          </div>
        </div>
      </div>
      <div className="flex items-center mt-20 mb-10">
        <div className=" font-bold text-4xl">Minted NFT</div>
        <div>
          <a
            href="https://testnets.opensea.io/account"
            target="_blank"
            className="bg-blue-500 w-8 h-8 rounded-full flex justify-center items-center text-white ml-4"
          >
            <SiOpensea size={20} />
          </a>
        </div>
      </div>
      <div className="flex flex-col xl:flex-row justify-center items-center py-16 border border-blue-200 rounded-2xl">
        {nftMetadata ? (
          <>
            <div className="max-w-[512px]">
              <img
                className="rounded-t-2xl"
                src={nftMetadata.image}
                alt="image"
              />
              <ul className="grid grid-cols-4 gap-8 py-8 bg-gray-600 rounded-b-xl text-center px-8">
                {nftMetadata.attributes.map((v, i) => {
                  return (
                    <li key={i}>
                      <div>{v.trait_type}</div>
                      <div className="mt-1 border-t-2 font-bold">{v.value}</div>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="m-8 pl-8">
              <div className="text-5xl flex items-center">
                <div>{nftMetadata.name}</div>
              </div>
              <div className="mt-8 text-2xl">{nftMetadata.description}</div>
            </div>
          </>
        ) : (
          <div>MINTING 가능합니다.</div>
        )}
      </div>
    </div>
  );
};

export default Launchpad;
