import { FaDiscord } from "react-icons/fa";
import { RxHome } from "react-icons/rx";
import { useEffect } from "react";

const NftCard = ({
  nftName,
  nftContract,
  nftTotalBalance,
  floorPrices,
  nftImage,
  discord,
  webUrl,
  ethPrice,
}) => {
  // 실시간 코인 가격 가져오기

  return (
    <div className="font-bold text-xl text-gray-300 flex flex-row border border-gray-600 p-4 rounded-xl justify-start shadow-sm shadow-gray-600 overflow-hidden h-80">
      <div className="rounded-xl overflow-hidden">
        <img src={nftImage} className="w-96 h-48 object-cover" />
      </div>
      <div className="ml-6 w-2/3">
        <div className="text-gray-400">Collection Name</div>
        <div className="text-xl mb-2">{nftName}</div>
        <div className="text-gray-400">Contract Address</div>
        <div className="mb-5 text-lg">{nftContract}</div>
        <div className="text-gray-400">Total Balance</div>
        <div className="text-xl mb-2">{nftTotalBalance}</div>
        <div className="text-gray-400">Floor Price</div>
        {floorPrices ? (
          <>
            <div className="text-lg">
              {floorPrices} eth{" "}
              <span>
                ({parseInt(floorPrices * ethPrice).toLocaleString()}원)
              </span>
            </div>
          </>
        ) : (
          <div>None</div>
        )}

        <div className="flex flex-row justify-end items-center">
          {discord ? (
            <a
              href={discord}
              target="_blank"
              className="hover:scale-125 transition-all"
            >
              <FaDiscord className="w-8 h-8 object-cover" />
            </a>
          ) : (
            <div />
          )}

          {webUrl ? (
            <a
              href={webUrl}
              target="_blank"
              className="ml-5 hover:scale-125 transition-all "
            >
              <RxHome className="w-8 h-7 object-cover" />
            </a>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
};

export default NftCard;
