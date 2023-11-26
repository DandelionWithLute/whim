import styles from "./navbar.module.css";
import { SiBilibili } from "react-icons/si";
import { FaFreeCodeCamp } from "react-icons/fa";
import { BiLogoPython, BiLogoTiktok } from "react-icons/bi";
import { SiTencentqq } from "react-icons/si";
import { AiFillWechat } from "react-icons/ai";
import { LogButton } from "../logButton/LogButton";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div href="#" className={styles.whim}>
        Whim
      </div>
      <div className={styles.links}>
        <a href="#" className={styles.link}>
          Home
        </a>
        <a href="#" className={styles.link}>
          About
        </a>
        <a href="#" className={styles.link}>
          Contact
        </a>
      </div>

      <div className={styles.icons}>
        <a href="#" className={styles.icon}>
          <SiBilibili />
        </a>
        <a href="#" className={styles.icon}>
          <FaFreeCodeCamp />
        </a>
        <a href="#" className={styles.icon}>
          <BiLogoPython />
        </a>
        <a href="#" className={styles.icon}>
          <SiTencentqq />
        </a>
        <a href="#" className={styles.icon}>
          <AiFillWechat />
        </a>
        <a href="#" className={styles.icon}>
          <BiLogoTiktok />
        </a>
      </div>
      <a className={styles.log}>
        <LogButton />
      </a>
    </div>
  );
};

export default Navbar;
