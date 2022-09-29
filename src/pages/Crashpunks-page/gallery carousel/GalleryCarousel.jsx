import "./GalleryCarousel.scss";
// import rightBtn from "../../../assest/image/component assest/gallery btn/right.png";
// import leftBtn from "../../../assest/image/component assest/gallery btn/left.png";
import img1 from "./hardcode-image/1.png";
import img2 from "./hardcode-image/2.png";
import img3 from "./hardcode-image/3.png";
import img4 from "./hardcode-image/4.png";
import img5 from "./hardcode-image/5.png";
import img6 from "./hardcode-image/6.png";
import { useState, useEffect } from "react";
// import axios from "axios";

function GalleryCarousel() {
  const [imageNumber, setImageNumber] = useState(0);

  const NftId = ["1501", "1724", "1724", "4307", "5002", "5627"];
  const imageArray = [img1, img2, img3, img4, img5, img6];

  useEffect(() => {
    const timeout = setTimeout(() => {
        if (imageNumber >= 4) setImageNumber(0);
        else setImageNumber((p) => p + 1);
      }, 5000);
  
     return () => clearTimeout(timeout);
  },);

  // const nextImg = () => {
  //   if (imageNumber >= 4) setImageNumber(0);
  //   else setImageNumber((p) => p + 1);
  // };

  // const backImg = () => {
  //   if (imageNumber == 0) setImageNumber(4);
  //   else setImageNumber((p) => p - 1);
  // };

  return (
    <>
      {/* gallery wrap */}
      <div className="row d-flex justify-content-center gr mb-3">
        <div className="col-12 col-sm-5  d-flex justify-content-center">
          <div className="gallery-wrapper ">
            {imageArray.map((image, i) => {
              if (i == imageNumber || i == imageNumber + 1) {
                return (
                  <div className="image-wrap">
                    <a
                      href={`https://gamma.io/collections/crashpunks/${NftId[i]}`}
                    >
                      <img className="ratio ratio-1x1" src={image} />
                    </a>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
      {/* gallery wrap */}

      {/* description */}
      <div className="row d-flex justify-content-center w-100 mb-5">
        <div className='col-12 col-sm-8 nft-gallery-description'>9216 NFTs on Bitcoin with Stacks, made by Grace.btc, inspired by sci-fi, anime, and crypto culture.</div>
      </div>
      {/* description */}

      {/* bottom line for circle */}
      {/* <div className="row d-flex justify-content-center gr">
        <div
          className=" col-4 d-flex justify-content-center align-item-center"
          style={{ height: "50px" }}
        >
          <div className="carousel-circle">
            <img src={leftBtn} alt="" onClick={backImg} />

            {imageArray.map((item, index) => {
              return (
                <span
                  key={index}
                  className={`rounded-circle ${
                    index == imageNumber || index == imageNumber + 1 ? "active" : "nonactive"
                  }`}
                ></span>
              );
            })}

            <img src={rightBtn} alt="" onClick={nextImg} />
          </div>
        </div>
      </div> */}
      {/* bottom line for circle */}
    </>
  );
}

export default GalleryCarousel;
