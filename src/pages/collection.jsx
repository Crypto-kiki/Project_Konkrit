import axios from "axios";
import { useEffect, useState } from "react";
import {
  BsReverseLayoutSidebarReverse,
  BsBorderAll,
  BsGrid3X3,
  BsHousesFill,
} from "react-icons/bs";
import { SiOpensea } from "react-icons/si";
import { Link } from "react-router-dom";

const Collection = ({ account, setAccount }) => {
  const [name, setName] = useState([]);
  const [imgSrc, setImgSrc] = useState([]);
  const [desc, setDesc] = useState();

  const [view, setView] = useState(3);
  const [textSize, setTextSize] = useState("xl");

  const getNfts = async () => {
    try {
      let response = await axios.get(
        `${process.env.REACT_APP_JSON_URL}/_metadata.json`
      );

      setDesc(response.data[0].description);

      let nameArr = [];
      let imgArr = [];

      for (let i = 0; i < response.data.length; i++) {
        nameArr.push(response.data[i].name);
        imgArr.push(response.data[i].image);
      }

      setName(nameArr);
      setImgSrc(imgArr);
    } catch (error) {
      console.log(error);
    }
  };

  const onClickView2 = () => {
    setTextSize("3xl");
    setView(2);
  };
  const onClickView3 = () => {
    setTextSize("xl");
    setView(3);
  };
  const onClickView5 = () => {
    setTextSize("md");
    setView(5);
  };

  useEffect(() => {
    getNfts();
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto pb-10 text-white">
      <div className="font-bold text-4xl py-12 rainbow">Collection</div>
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center">
            <div className="text-4xl font-bold">Cycle of Season</div>
            <a
              href="https://testnets.opensea.io/account"
              target="_blank"
              className="bg-blue-500 w-8 h-8 rounded-full flex justify-center items-center text-white ml-4"
            >
              <SiOpensea size={20} />
            </a>
          </div>
          <div className="mt-2 mb-8">{desc}</div>
        </div>
        <div className="flex justify-center items-center">
          <div className="mr-6">
            <Link to={`/`}>
              <BsHousesFill className="w-9 h-9 text-yellow-300" />
            </Link>
          </div>
          <Link to={`/Launchpad`}>
            <button className="border-yellow-300 border shadow-sm shadow-yellow-600 rounded-xl px-5 py-2 w-36 text-yellow-300 font-bold hover:bg-yellow-300 hover:text-gray-900">
              민팅하러 가기
            </button>
          </Link>
        </div>
      </div>

      <div className=" flex justify-end items-center">
        <button onClick={onClickView2}>
          <BsReverseLayoutSidebarReverse className="w-[28px] h-[28px]" />
        </button>
        <button onClick={onClickView3} className="mx-6">
          <BsBorderAll className="w-[28px] h-[28px]" />
        </button>
        <button onClick={onClickView5}>
          <BsGrid3X3 className="w-[28px] h-[28px]" />
        </button>
      </div>
      <div>
        <div className="mt-10 mb-20 border-b-2 pb-5 border-white">
          <div className="mt-10 font-bold text-3xl mb-5 text-pink-300">
            Spring
          </div>
          <div
            className={`grid ${
              view === 2
                ? "grid-cols-2"
                : view === 3
                ? "grid-cols-3"
                : "grid-cols-5"
            } gap-10`}
          >
            {name.map((v, i) => {
              if (v.substring(0, 2) === "Sp") {
                return (
                  <div
                    key={i}
                    className={`border-gray-400 flex flex-col text-${textSize} mx-auto`}
                  >
                    <div className="mb-2">{v}</div>
                    <div>
                      <img src={imgSrc[i]} alt={v} className="rounded-xl" />
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
        <div className="mt-10 mb-20 border-b-2 pb-5 border-white">
          <div className="mt-10 font-bold text-3xl mb-5 text-green-400">
            Summer
          </div>
          <div
            className={`grid ${
              view === 2
                ? "grid-cols-2"
                : view === 3
                ? "grid-cols-3"
                : "grid-cols-5"
            } gap-10`}
          >
            {name.map((v, i) => {
              if (v.substring(0, 2) === "Su") {
                return (
                  <div
                    key={i}
                    className={`border-gray-400 flex flex-col text-${textSize} mx-auto`}
                  >
                    <div className="mb-2">{v}</div>
                    <div>
                      <img src={imgSrc[i]} alt={v} className="rounded-xl" />
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
        <div className="mt-10 mb-20 border-b-2 pb-5 border-white">
          <div className="mt-10 font-bold text-3xl mb-5 text-orange-400">
            Autumn
          </div>
          <div
            className={`grid ${
              view === 2
                ? "grid-cols-2"
                : view === 3
                ? "grid-cols-3"
                : "grid-cols-5"
            } gap-10`}
          >
            {name.map((v, i) => {
              if (v.substring(0, 2) === "Au") {
                return (
                  <div
                    key={i}
                    className={`border-gray-400 flex flex-col text-${textSize} mx-auto`}
                  >
                    <div className="mb-2">{v}</div>
                    <div>
                      <img src={imgSrc[i]} alt={v} className="rounded-xl" />
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
        <div className="mt-10 mb-20 border-b-2 pb-5 border-white">
          <div className="mt-10 font-bold text-3xl mb-5 text-blue-100">
            Winter
          </div>
          <div
            className={`grid ${
              view === 2
                ? "grid-cols-2"
                : view === 3
                ? "grid-cols-3"
                : "grid-cols-5"
            } gap-10`}
          >
            {name.map((v, i) => {
              if (v.substring(0, 2) === "Wi") {
                return (
                  <div
                    key={i}
                    className={`border-gray-400 flex flex-col text-${textSize} mx-auto`}
                  >
                    <div className="mb-2">{v}</div>
                    <div>
                      <img src={imgSrc[i]} alt={v} className="rounded-xl" />
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;
