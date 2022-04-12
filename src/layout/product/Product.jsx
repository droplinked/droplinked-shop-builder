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

export default function Product() {
  let { id } = useParams();
  const [productDetail, setProductDetail] = useState();
  const [heightVar, setHeightToggle] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const heightToggle = () => {
    setHeightToggle((pre) => !pre);
  };

  return (
    <>
      <div className="product-wrapper">
        {productDetail == undefined ? (
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
        setProductDetail(response.data.shopify[id].product_listing);
      });
  }
}
