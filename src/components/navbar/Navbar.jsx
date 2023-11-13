import "./navbar.scss";
import { SiBilibili } from "react-icons/si";
import { FaFreeCodeCamp } from "react-icons/fa";
import { BiLogoPython, BiLogoTiktok } from "react-icons/bi";
import { SiTencentqq } from "react-icons/si";
import { AiFillWechat } from "react-icons/ai";
import { LogButton } from "../logButton/LogButton";

const Navbar = () => {
  return (
    <div className="container">
      <a href="#" className="whim">
        Whim
      </a>
      <div className="links">
        <a href="#" className="link">
          Home
        </a>
        <a href="#" className="link">
          About
        </a>
        <a href="#" className="link">
          Contact
        </a>
      </div>

      <div className="icons">
        <a href="#" className="icon">
          <SiBilibili />
        </a>
        <a href="#" className="icon">
          <FaFreeCodeCamp />
        </a>
        <a href="#" className="icon">
          <BiLogoPython />
        </a>
        <a href="#" className="icon">
          <SiTencentqq />
        </a>
        <a href="#" className="icon">
          <AiFillWechat />
        </a>
        <a href="#" className="icon">
          <BiLogoTiktok />
        </a>
        <a className="link log">
          <LogButton />
        </a>
      </div>
    </div>
  );
};

export default Navbar;
