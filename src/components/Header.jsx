import { TbCoinBitcoin } from "react-icons/tb";
import { FaEthereum } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = ({
  account,
  btcPrice,
  ethPrice,
  maticPrice,
  onClickAccount,
  onClickLogOut,
}) => {
  return (
    <header className="sticky top-0 h-20 w-full flex flex-row justify-between items-center text-white px-8 bg-[#18181B]">
      <div className="flex flex-row items-center">
        <a href="#" className="text-2xl font-bold text-yellow-300">
          KONKRIT
        </a>
        <div className="ml-2 relative bottom-2 text-sm italic font-bold text-white">
          test
        </div>
        <div className="ml-24 text-lg">
          <a href="#myNft">My NFTs</a>
          <Link to={`/Launchpad`}>
            <span className="mx-10">Launchpad</span>
          </Link>
          <Link to={`/Collection`}>
            <span>Collection</span>
          </Link>
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
            className="border-yellow-300 border rounded-xl px-5 py-2 w-36 text-yellow-300 font-bold hover:bg-yellow-300 hover:text-gray-900"
          >
            Wallet Connect
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
