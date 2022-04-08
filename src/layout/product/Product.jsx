import "./product.scss";
import basketICon from "../../assest/icon/basketIcon.svg";
import image1 from "../../assest/image/product/image1.jpg";
import image2 from "../../assest/image/product/image2.jpg";
import image3 from "../../assest/image/product/image3.jpg";
import image4 from "../../assest/image/product/image4.jpg";
import image5 from "../../assest/image/product/image5.jpg";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Product() {
  const [heightVar, setHeightToggle] = useState(false);
  const [imageCarousel, setImageCarousel] = useState(image1);

  const heightToggle = () => {
    setHeightToggle((pre) => !pre);
  };
  const toggle = (img) => {
    setImageCarousel(img);
  };

  return (
    <>
      <div className="product-wrapper">
        <div className="product-main">
          {/* Top side */}

          <div className="top-side d-flex justify-content-between row">
            <div className="d-flex flex-column col-md-7 col-12 ">
              <div className="image-side ">
                <img src={imageCarousel} alt="" />
              </div>

              {/* image carousel */}
              <div className="image-groupe d-flex justify-content-between align-items-center">
                <button className="slide-button">&#60;</button>
                <img
                  className="slide-img"
                  src={image2}
                  onClick={() => toggle(image2)}
                />
                <img
                  className="slide-img"
                  src={image3}
                  onClick={() => toggle(image3)}
                />
                <img
                  className="slide-img"
                  src={image4}
                  onClick={() => toggle(image4)}
                />
                <img
                  className="slide-img"
                  src={image5}
                  onClick={() => toggle(image5)}
                />
                <button className="slide-button">&#62;</button>
              </div>
              {/* image carousel */}
            </div>

            <div className="option-side col-md-5 col-12">
              <div className="product-brand">
                <p>Brand names</p>
              </div>
              <div className="product-describe">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Tempore quis dolorum unde? Dignissimos corrupti in modi dicta
                  dolorum, vitae rem quae provident architecto ipsa
                  voluptatibus!
                </p>
              </div>
              <div className="producr-price">$ 2.000</div>
              <div className="product-options flex-wrap d-flex justify-content-between">
                <div className="product-option col-5"> {optionTest()}</div>
                <div className="product-option col-5"> {optionTest()}</div>
                <div className="product-option col-5"> {optionTest()}</div>
                <div className="product-option col-5"> {optionTest()}</div>
                <div className="product-option col-5"> {optionTest()}</div>
                <div className="product-option col-5"> {optionTest()}</div>
              </div>
              <div className="counter-group">
                <div className="counter-button">
                  <p>-</p>
                </div>
                <div className="counter-button">
                  <p>1</p>
                </div>
                <div className="counter-button">
                  <p>+</p>
                </div>
              </div>
              <button className="add-to-basket-button">
                <img
                  src={basketICon}
                  alt=""
                  style={{ width: "25px", height: "25px" }}
                />
                <p> add to basket</p>
              </button>
            </div>
          </div>
          {/* Top side */}

          {/* Bottom side */}
          <div className="bottom-side">
            <div className="description">Description</div>
            <div className={`detail ${heightVar ? "open" : "close"}`}>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Praesentium delectus molestiae ab, quia, aliquam, maiores rerum
              aliquid minima consequatur deleniti commodi maxime iste. Enim vero
              unde assumenda voluptates asperiores est facilis similique numquam
              totam doloremque, tempore provident. Repudiandae, deserunt.
              Accusantium eligendi, illum magnam exercitationem deleniti iste
              eaque cumque nemo aliquam sunt, animi dolor quod incidunt magni
              pariatur minima explicabo architecto, porro natus vel ducimus
              culpa velit. Libero nemo distinctio incidunt.
            </div>
            <div className="read-more">
              <button onClick={heightToggle}>read more</button>
            </div>
          </div>
          {/* Bottom side */}
        </div>
      </div>
    </>
  );
}

function optionTest() {
  return (
    <select>
      <option value="volvo">value 1</option>
      <option value="saab">value 2</option>
      <option value="opel">value 3</option>
      <option value="audi">value 4</option>
    </select>
  );
}
