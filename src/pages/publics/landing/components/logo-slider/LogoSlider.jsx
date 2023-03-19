
import "./LogoSlider-style.scss"

import logo from "./casper-logo.svg"
const LogoSlider = () => {
    const logos = [
        logo,
        logo,
        logo,
      ];
    
      return (
        <div className="logo-slider">
          {logos.map((logo, index) => (
            <img key={index} src={logo} alt="Logo" className="logo" />
          ))}
        </div>
      );
    };


export default LogoSlider