import "./collection123.scss"
import Carousel from 'react-bootstrap/Carousel'
import image1 from "../../../assest/image/nft/Rectangle 7.jpg"
import image2 from "../../../assest/image/nft/Rectangle 8.jpg"
import image3 from "../../../assest/image/nft/Rectangle 9.jpg"
import image4 from "../../../assest/image/nft/Rectangle 10.jpg"
import image5 from "../../../assest/image/nft/Rectangle 11.jpg"
import productImg1 from "../../../assest/image/crashpunk/collection/collection1.jpg"
import productImg2 from "../../../assest/image/crashpunk/collection/collection2.jpg"
import productImg3 from "../../../assest/image/crashpunk/collection/collection3.jpg"


export default function Collection123(){

    return(<>
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
                <div className="d-flex justify-content-center p-4">
                    <div className="boxes">
                        <div className="image-wrapper d-flex">
                          <div className="image1 col-7">
                            <img src={productImg1} className="" alt="" />
                          </div>
                          {/* img-thumbnail */}

                          <div className="images col-5">
                            <img src={productImg2} className="" alt="" />
                            <img src={productImg3} className="" alt=""  />
                           
                          </div>

                        </div>
                        <div className="detail-wrapper d-flex justify-content-start align-content-center">
                          
                            <p>holder merch</p>

                        </div>
                    </div>
                </div>

                {/* merch gallery */}


                {/* public gallery */}
                <div className="d-flex justify-content-center p-4">
                    <div className="boxes">
                        <div className="image-wrapper d-flex">
                          <div className="image1 col-7">
                            <img src={productImg1} className="" alt="" />
                          </div>
                          {/* img-thumbnail */}

                          <div className="images col-5">
                            <img src={productImg2} className="" alt="" />
                            <img src={productImg3} className="" alt="" />
                          </div>

                        </div>
                        <div className="detail-wrapper d-flex justify-content-start align-content-center">
                          
                          <p>public merch</p>

                        </div>
                    </div>
                </div>

                {/* public gallery */}

          </div>
    </>)
}