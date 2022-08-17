import "./footer.scss";
import footerLogo from "../../../assest/icon/Flatlay-Logo.png"
import telegram from "../../../assest/icon/telegram.png"
import twiter from "../../../assest/icon/brand.png"
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div style={{borderTop: "1px solid #B3B3B3"}}>
    <div className="footer-wrap">
      <div className="footer-body">
        <div className="leftside">
          <div className="text"><p>droplinked by</p></div>
          <a href='https://flatlay.io/'>
            <img src={footerLogo} className="logo" />
          </a>
        </div>
        <div className="righside">
          <Link to="/terms">
          <span className="right-text">Terms of service</span>
          </Link>
          <a href='https://twitter.com/flatlay'>
            <img src={twiter} className="icon-img be-i"/>
          </a>
          <a href='https://t.me/droplinked'>
            <img src={telegram} className="icon-img" />
          </a>
        </div>
      </div>
    </div>
    </div>
  );
}

