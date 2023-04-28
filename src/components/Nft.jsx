import NftCard from "./NftCard";

const Nft = ({
  nftName,
  nftContract,
  nftTotalBalance,
  floorPrices,
  nftImage,
  discord,
  webUrl,
  ethPrice,
  coinApi,
}) => {
  return (
    <NftCard
      nftName={nftName}
      nftContract={nftContract}
      nftTotalBalance={nftTotalBalance}
      floorPrices={floorPrices}
      nftImage={nftImage}
      discord={discord}
      webUrl={webUrl}
      ethPrice={ethPrice}
      coinApi={coinApi}
    />
  );
};

export default Nft;
