import "./product.scss";
import basketICon from "../../assest/icon/basketIcon.svg";
import image1 from "../../assest/image/product/image1.jpg";
import image2 from "../../assest/image/product/image2.jpg";
import image3 from "../../assest/image/product/image3.jpg";
import image4 from "../../assest/image/product/image4.jpg";
import image5 from "../../assest/image/product/image5.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {BrowserRouter as Router, Switch,Route,Link, useParams} from "react-router-dom";
import axios from "axios";
import { useEffect, useState} from "react";
import Loading from "../../components/features/loading/Loading";

export default function Product() {
  let { id } = useParams();
  const [productDetail , setProductDetail] = useState();
  const [heightVar, setHeightToggle] = useState(false);
  const [imageCarousel, setImageCarousel] = useState(image1);

  useEffect(() => {
    getData();
  }, []);

  const heightToggle = () => {
    setHeightToggle((pre) => !pre);
  };
  const toggle = (img) => {
    setImageCarousel(img);
  };

  return (
    <>
      <div className="product-wrapper">
      {(productDetail==undefined) 
          ?
          <Loading />
          :
        <div className="product-main">
         

          <div className="top-side d-flex justify-content-between row">
            <div className="d-flex flex-column col-md-7 col-12 ">
              <div className="image-side ">
                <img src={productDetail.images[0].src} alt="" />
              </div>

              {/* image carousel */}
              <div className="image-groupe d-flex justify-content-between align-items-center">
                <button className="slide-button">&#60;</button>
                <img
                  className="slide-img"
                  src={productDetail.images[0].src}
                  onClick={() => toggle(image2)}
                />
                <img
                  className="slide-img"
                  src={productDetail.images[1].src}
                  onClick={() => toggle(image3)}
                />
                <img
                  className="slide-img"
                  src={productDetail.images[2].src}
                  onClick={() => toggle(image4)}
                />
                <img
                  className="slide-img"
                  src={productDetail.images[3].src}
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
                  {productDetail.title}
                </p>
              </div>
              <div className="producr-price">$ {productDetail.variants[0].price}</div>
              <div className="product-options flex-wrap d-flex justify-content-between">
                {productDetail.options.map((item)=>{
                  return(
                    <div className="product-option col-5">
                          <select>
                            {item.values.map((val)=>{
                              return(<option value={val}>{val}</option>)
                            })}
                              
                          </select>
                    </div>
                  )
                })}
                
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
              <Link to="/shopping" className="add-to-basket-button">
                <img
                  src={basketICon}
                  alt=""
                  style={{ width: "25px", height: "25px" }}
                />
                <p> add to basket</p>
              </Link>
            </div>
          </div>
                {/* Top side */}

          <div className="bottom-side">
            <div className="description">Description</div>
            <div className={`detail ${heightVar ? "open" : "close"}`}>
              {productDetail.tags}
            </div>
            <div className="read-more">
              <button onClick={heightToggle}>read more</button>
            </div>
          </div>
          
          
        </div>
      }
      </div>
    </>
  );


  function getData() {
    axios
      .post(
        "https://r4qwnd5837.execute-api.us-west-2.amazonaws.com/v1/search",
        {
          keyword: "tshirt",
          page: 1,
        }
      )
      .then((response) => {
        console.log(response.data.shopify[id].product_listing);
        setProductDetail(response.data.shopify[id].product_listing);
      });
  }
}
