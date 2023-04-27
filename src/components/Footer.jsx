import { AiFillGithub } from "react-icons/ai";
import { SiTistory } from "react-icons/si";

const Footer = () => {
  return (
    <div className="mt-20 py-10 bg-black text-white flex flex-col justify-center items-center">
      <div className="flex justify-center items-center my-4">
        <a
          href="https://github.com/Crypto-kiki/Project_Konkrit"
          target="_blank"
        >
          <AiFillGithub className="w-8 h-8" />
        </a>
        <div className="ml-4">
          <a href="https://hing9-studying.tistory.com/" target="_blank">
            <SiTistory className="w-8 h-6" />
          </a>
        </div>
      </div>
      <div>E-mail : ejo2123@naver.com</div>
      <div className="mt-4 italic">
        본 사이트는 Techit 블록체인 스쿨 클론 코딩 연습입니다.
      </div>
    </div>
  );
};

export default Footer;
