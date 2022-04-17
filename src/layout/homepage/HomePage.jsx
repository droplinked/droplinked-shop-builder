import "./HomePage.scss";
import SideImage from "./image component/SideImage";
import HomeInput from "./input-homepage/HomeInput";

function HomePage() {
  return (
    <>
      <div className="wraper" >
        <div className="col-12 col-md-7 sides d-flex align-item-center justify-content-start">
          <HomeInput />
        </div>
        <div className="col-12 col-md-5 sides d-flex justify-content-end align-item-center">
          <SideImage />
        </div>
      </div>
    </>
  );
}

export default HomePage;
