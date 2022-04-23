import "./footer.scss";
import footerLogo from "../../../assest/feature/footer/Flatlay-Logo.png"
import telegram from "../../../assest/feature/footer/telegram.png"
import twiter from "../../../assest/feature/footer/brand.png"
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="footer-wrap">
      <div className="footer-body">
        <div className="leftside">
          <div className="text"><p>droplinked by</p></div>
          <Link to={'/'}>
            <img src={footerLogo} className="logo" />
          </Link>
        </div>
        <div className="righside">
          <span className="right-text">Terms of service</span>
          <Link to={'/'}>
            <img src={twiter} className="icon-img be-i"/>
          </Link>
          <Link to={'/'}>
            <img src={telegram} className="icon-img" />
          </Link>
        </div>
      </div>
    </div>
  );
}


// filter={'brightness(0) invert(1)'} 