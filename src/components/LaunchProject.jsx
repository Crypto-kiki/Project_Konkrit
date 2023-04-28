import { Link } from "react-router-dom";

const LaunchProject = ({ totalNft }) => {
  const ranNum = Math.floor(Math.random() * 45) + 1;
  const ranNum2 = Math.floor(Math.random() * 10) + 1;
  const imgSrc = `${process.env.PUBLIC_URL}/images/Character/${ranNum}.png`;
  const imgSrc2 = `${process.env.PUBLIC_URL}/images/dog/${ranNum2}.png`;
  return (
    <div className="my-20">
      <div className="font-bold text-2xl mb-8 rainbow">Launch Project</div>
      <div>
        <div className="flex mb-20 text-white justify-between">
          <div className=" flex border border-gray-600 p-4 rounded-xl justify-between shadow-sm shadow-gray-600 w-[512px]">
            <img src={imgSrc} className="w-48 rounded-xl" />
            <div className="flex flex-col text-sm w-1/2">
              <div className="text-2xl text-gray-300 font-bold">
                Cycle of Season
              </div>
              <div className="text-gray-400 mt-2">Total Supply</div>
              <div className="text-gray-300">{totalNft} EA</div>
              <div className="text-gray-400 mt-2">Mint Price</div>
              <div className="text-gray-300">0.01 Matic</div>
              <Link to={`/Launchpad`}>
                <button className="w-full border border-gray-300 py-3 mt-4 rounded-xl font-bold text-yellow-300 hover:bg-yellow-300 hover:text-gray-900">
                  Mint Now
                </button>
              </Link>
            </div>
          </div>
          <div className=" flex border border-gray-600 p-4 rounded-xl justify-between shadow-sm shadow-gray-600 w-[512px]">
            <img src={imgSrc2} className="w-48 rounded-xl" />
            <div className="flex flex-col text-sm w-1/2">
              <div className="text-xl text-gray-300 font-bold">Hot dog</div>
              <div className="text-gray-400 mt-2">Total Supply</div>
              <div className="text-gray-300">10 EA</div>
              <div className="text-gray-400 mt-2">Mint Price</div>
              <div className="text-gray-300">Free</div>
              <button
                className="w-full border border-gray-500 py-3 mt-4 rounded-xl font-bold text-gray-500"
                disabled
              >
                Coming Soon
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaunchProject;
