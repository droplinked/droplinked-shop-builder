import "./product.scss";
import basketICon from "../../assest/icon/basketIcon.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../components/features/loading/Loading";
import CustomCarousel from "../../components/features/carousel/CustomCarousel";
import { useCart } from "../../sevices/hooks/useCart";
import useProductData from "../../sevices/hooks/useProductData"

export default function Product() {
  let { id } = useParams();
  const [productDetail] = useProductData(id);
  const [heightVar, setHeightToggle] = useState(false);
  const [itemCounter, setItemCounter] = useState(0);
  const { addProduct, cartItems, increase, decrease } = useCart();

  // useEffect(() => {
  //   console.log(productDetail);
  // });

  // useEffect(() => {
  //   getData();
  //   console.log(productDetail);
  // }, []);

  const addToBakset = () => {
    if(cartItems.find((item) => item.product_id === productDetail.product_id) == undefined){
      addProduct({product:productDetail , qun:itemCounter})
    }else{
      increase({product:productDetail , qun:itemCounter})
    }
    setItemCounter(0);
  };

  const heightToggle = () => {
    setHeightToggle((pre) => !pre);
  };

  return (
    <>
      <div className="product-wrapper">
        {(productDetail == undefined) ? (
          <Loading />
        ) : (
          <div className="product-main">
            <div className="top-side d-flex justify-content-between row">
              <div className="d-flex flex-column col-md-7 col-12 ">
                <CustomCarousel imageArray={productDetail.images} />
              </div>

              <div className="option-side col-md-5 col-12">
                <div className="product-brand">
                  <p>Brand names</p>
                </div>
                <div className="product-describe">
                  <p>{productDetail.title}</p>
                </div>
                <div className="producr-price">
                  $ {productDetail.variants[0].price}
                </div>
                <div className="product-options flex-wrap d-flex justify-content-between">
                  {productDetail.options.map((item) => {
                    return (
                      <div className="product-option col-5">
                        <select>
                          {item.values.map((val) => {
                            return <option value={val}>{val}</option>;
                          })}
                        </select>
                      </div>
                    );
                  })}
                </div>
                <div className="counter-group">
                  <div
                    className="counter-button"
                    onClick={() => {
                      if (itemCounter > 0) {
                        setItemCounter((pre) => pre - 1);
                      }
                    }}
                  >
                    <p>-</p>
                  </div>
                  <div className="counter-button">
                    <p>{itemCounter}</p>
                  </div>
                  <div
                    className="counter-button"
                    onClick={() => {
                      setItemCounter((pre) => pre + 1);
                    }}
                  >
                    <p>+</p>
                  </div>
                </div>
                <button className="add-to-basket-button" 
                onClick={() => {addToBakset()}}>
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

            <div className="bottom-side">
              <div className="description">Description</div>
              <div className={`detail ${heightVar ? "open" : "close"}`}>
                {productDetail.title}
              </div>
              <div className="read-more">
                <button onClick={heightToggle}>read more</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );

  // function getData() {
  //   axios
  //     .post(
  //       "https://r4qwnd5837.execute-api.us-west-2.amazonaws.com/v1/search",
  //       {
  //         keyword: "tshirt",
  //         page: 1,
  //       }
  //     )
  //     .then((response) => {
  //       setProductDetail(response.data.shopify[id].product_listing);
  //     });
  // }
}
