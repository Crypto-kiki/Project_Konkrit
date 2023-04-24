import NftCard from "./NftCard";

const Nft = ({
  nftName,
  nftContract,
  nftTotalBalance,
  floorPrices,
  nftImage,
  discord,
  webUrl,
  btcPrice,
  ethPrice,
  coinApi,
}) => {
  return (
    <div>
      <NftCard
        nftName={nftName}
        nftContract={nftContract}
        nftTotalBalance={nftTotalBalance}
        floorPrices={floorPrices}
        nftImage={nftImage}
        discord={discord}
        webUrl={webUrl}
        btcPrice={btcPrice}
        ethPrice={ethPrice}
        coinApi={coinApi}
      />
    </div>
  );
};

export default Nft;
