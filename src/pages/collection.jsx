import axios from "axios";
import { useEffect, useState } from "react";
import {
  BsReverseLayoutSidebarReverse,
  BsBorderAll,
  BsGrid3X3,
  BsHousesFill,
} from "react-icons/bs";
import { Link } from "react-router-dom";

const Collection = ({ account, setAccount }) => {
  const [name, setName] = useState([]);
  const [imgSrc, setImgSrc] = useState([]);
  const [desc, setDesc] = useState();

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

  const [view, setView] = useState(3);
  const [font, setFont] = useState("xl");
  const onClickView2 = () => {
    setFont("3xl");
    setView(2);
  };
  const onClickView3 = () => {
    setFont("xl");
    setView(3);
  };
  const onClickView5 = () => {
    setFont("md");
    setView(5);
  };

  useEffect(() => {
    getNfts();
  });

  return (
    <div className="max-w-screen-xl mx-auto pb-10 text-white">
      <div className="font-bold text-4xl py-12 rainbow">Collection</div>
      <div className="flex justify-between items-center">
        <div>
          <div className="text-3xl font-bold">Cycle of Season</div>
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
      <div className={` grid grid-cols-${view} gap-10`}>
        {name.map((v, i) => (
          <div
            key={i}
            className={`border-gray-400 flex flex-col text-${font} mx-auto`}
          >
            <div className="mb-2">{v}</div>
            <div>
              <img src={imgSrc[i]} alt={v} className="rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collection;
