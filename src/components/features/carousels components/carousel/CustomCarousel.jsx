import "./CustomCarousel.scss";
import { useState } from "react";

export default function CustomCarousel({ imageArray }) {
  const [images, setImages] = useState(imageArray);
  const [mainImage, setMainImage] = useState(imageArray[0]);
  const [startNum, setStartNum] = useState(0);
  const [endNum, setEndNum] = useState(3);

  const selectImage = (img) => {
    setMainImage(img);
  };

  const nextImage = () => {
    setStartNum((pre) => pre + 1);
    setEndNum((pre) => pre + 1);
  };

  const preImage = () => {
    setStartNum((pre) => pre - 1);
    setEndNum((pre) => pre - 1);
  };

  return (
    <>
      <div className="image-side ">
        <img src={mainImage.src} alt="" />
      </div>

      <div className="image-groupe d-flex justify-content-between align-items-center">
        <button
          className="slide-button"
          disabled={startNum == 0}
          onClick={() => {
            preImage();
          }}
        >
          &#60;
        </button>

        {images.map((img, i) => {
          if (i >= startNum && i <= endNum) {
            return (
              <img
                className="slide-img"
                src={img.src}
                onClick={() => {
                  selectImage(img);
                }}
              />
            );
          }
        })}

        <button
          className="slide-button"
          disabled={endNum == images.length - 1}
          onClick={() => {
            nextImage();
          }}
        >
          &#62;
        </button>
      </div>
    </>
  );
}
