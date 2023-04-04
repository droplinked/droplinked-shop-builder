
import "./LogoSlider-style.scss"

import logo1 from "./casper-logo.svg"
import logo2 from "./stacks-logo.svg"
import logo3 from "./polygon-logo.svg"
import logo4 from "./skace.logo.svg"
import logo5 from "./near-logo.svg"
//Frame 20774
const LogoSlider = () => {

    const logos = [
        logo1,
        logo2,
        logo3,
        logo4 ,
        logo5,
        logo1,
        logo2,
        logo3,
        logo4 ,
        logo5,
        logo1,
        logo2,
        logo3,
        logo4 ,
        logo5,
        logo1,
        logo2,
        logo3,
        logo4 ,
        logo5,
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