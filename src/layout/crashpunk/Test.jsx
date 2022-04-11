import "./test.scss";
import { RiShoppingBasketFill } from "react-icons/ri";
import ProfileTopSection from "../../components/features/top section/ProfileTopSection";
import walletIcon from "../../assest/header/Unknown.svg";
import MainHeader from "../../components/features/header/MainHeader";
import Footer from "../../components/features/footer/Footer";
import MainWrapper from "../../components/Structure/page wrapper/MainWrapper";

export default function Test() {
  return (
    <>
      <div
        style={{ backgroundColor: "#222", minHeight: "100%", minWidth: "100%" }}
      >
        <ProfileTopSection />

        <div className="body-wrapper d-flex justify-content-center">
          <iframe
            src="https://blocksurvey.io/survey/t/6de8a3bb-08d4-46bc-b3db-fafc5e2697c3/r/o"
            className="frame col-12 col-md-8"
          ></iframe>
        </div>
      </div>
    </>
  );
}

function Header() {
  return (
    <>
      <div className="header-wrap">
        <div className="header-container justify-content-between">
          <h1 style={{ color: "white" }}>droplinked</h1>
          <div className="header-item col-6 col-md-3">
            {/* <RiShoppingBasketFill className="header-icon col-6 invisible"/>
                <AiFillWallet className="header-icon col-6"/> */}
            <RiShoppingBasketFill className="header-icon col-6 invisible" />
            <img src={walletIcon} alt="" className="header-icon col-6" />
          </div>
        </div>
      </div>
    </>
  );
}
