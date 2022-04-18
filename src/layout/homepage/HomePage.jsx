import "./HomePage.scss";
import SideImage from "./image component/SideImage";
import HomeInput from "./input-homepage/HomeInput";
import ModalEmail from "./modal/EmailModal"
import { useState } from "react"

function HomePage() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
     
    {/* home page */}
      <div className="wraper" >
        <div className="col-12 col-md-7 sides d-flex align-item-center justify-content-start">
          <HomeInput open={handleShow} />
        </div>
        <div className="col-12 col-md-5 sides d-flex justify-content-end align-item-center">
          <SideImage />
        </div>
      </div>
      {/* home page */}
      {show && <ModalEmail close={handleClose} />}
      
    </>
  );
}

export default HomePage;
