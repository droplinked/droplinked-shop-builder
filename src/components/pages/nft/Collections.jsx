import "./collection123.scss";
import Carousel from "react-bootstrap/Carousel";
import image1 from "../../../assest/image/nft/Rectangle 7.jpg";
import image2 from "../../../assest/image/nft/Rectangle 8.jpg";
import image3 from "../../../assest/image/nft/Rectangle 9.jpg";
import image4 from "../../../assest/image/nft/Rectangle 10.jpg";
import image5 from "../../../assest/image/nft/Rectangle 11.jpg";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import ProfileTopic from "../../features/top section/ProfileTopSection";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../features/loading/Loading";
import useData from "../../../sevices/hooks/useData"

export default function Collections() {
  const [products] = useData();
  
  //const [products, setProducts] = useState();
  //const [loading, setLoading] = useState(true);


  return (
    <>
      <ProfileTopic />
      <div className="container-fluid collection-container d-flex flex-column">
        {/* nft gallery */}
        <div className="d-flex justify-content-center p-4">
          <div className="boxes">
            <a href="https://stxnft.com/collections/crashpunks">
              <Carousel variant="dark">
                <Carousel.Item interval={5000}>
                  <img
                    className="carousel-img"
                    src={image1}
                    alt="First slide"
                  />
                </Carousel.Item>

                <Carousel.Item interval={5000}>
                  <img
                    className="carousel-img"
                    src={image2}
                    alt="Second slide"
                  />
                </Carousel.Item>
                <Carousel.Item interval={5000}>
                  <img
                    className="carousel-img"
                    src={image3}
                    alt="Third slide"
                  />
                </Carousel.Item>
                <Carousel.Item interval={5000}>
                  <img
                    className="carousel-img"
                    src={image4}
                    alt="Third slide"
                  />
                </Carousel.Item>
                <Carousel.Item interval={5000}>
                  <img
                    className="carousel-img"
                    src={image5}
                    alt="Third slide"
                  />
                </Carousel.Item>
              </Carousel>
            </a>
          </div>
        </div>
        {/* nft gallery */}

        {/* merch gallery */}
        {(products == undefined) ? (
          <Loading />
        ) : (
          <>
            <div className="d-flex justify-content-center p-4">
              <Link to="/products" style={{ textDecoration: "none" }}>
                <div className="boxes">
                  <div className="image-wrapper d-flex">
                    <div className="image1 col-7">
                      <div className="image-wrap">
                        <img src={products[0].product_listing.images[0].src} className="" alt="" />
                      </div>
                    </div>

                    <div className="images col-5">
                      <div className="image-wrap">
                        <img src={products[1].product_listing.images[0].src} className="" alt="" />
                      </div>
                      <div className="image-wrap">
                        <img src={products[2].product_listing.images[0].src} className="" alt="" />
                      </div>
                    </div>
                  </div>
                  <div className="detail-wrapper d-flex justify-content-start align-content-center">
                    <p>holder merch</p>
                  </div>
                </div>
              </Link>
            </div>

            <div className="d-flex justify-content-center p-4">
              <Link to="/products" style={{ textDecoration: "none" }}>
                <div className="boxes">
                  <div className="image-wrapper d-flex">
                    <div className="image1 col-7">
                      <div className="image-wrap">
                        <img src={products[0].product_listing.images[0].src} className="" alt="" />
                      </div>
                    </div>

                    <div className="images col-5">
                      <div className="image-wrap">
                        <img src={products[1].product_listing.images[0].src} className="" alt="" />
                      </div>
                      <div className="image-wrap">
                        <img src={products[2].product_listing.images[0].src} className="" alt="" />
                      </div>
                    </div>
                  </div>
                  <div className="detail-wrapper d-flex justify-content-start align-content-center">
                    <p>public merch</p>
                  </div>
                </div>
              </Link>
            </div>
          </>
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
  //       setProducts(response.data.shopify);
  //       setLoading(false);
  //     });
  // }
}
