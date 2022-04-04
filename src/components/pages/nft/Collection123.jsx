import "./collection123.scss"
import Carousel from 'react-bootstrap/Carousel'
import image1 from "../../../assest/image/nft/img1.png"
import image2 from "../../../assest/image/nft/img2.png"
import image3 from "../../../assest/image/nft/img3.png"


export default function Collection123(){

    return(<>
            <div className="container-fluid collection-container d-flex flex-column">
                {/* nft gallery */}
                <div className="d-flex justify-content-center p-4">
                    <div className="nft-gallery">

                        <Carousel variant="dark">
                            <Carousel.Item interval={500}>
                              <img
                                className="carousel-img"
                                src={image1}
                                alt="First slide"
                              />
                            </Carousel.Item>

                            <Carousel.Item interval={500}>
                              <img
                                className="carousel-img"
                                src={image2}
                                alt="Second slide"
                              />
                            </Carousel.Item>
                            <Carousel.Item interval={500}>
                              <img
                                className="carousel-img"
                                src={image3}
                                alt="Third slide"
                              />
                            </Carousel.Item>
                        </Carousel>

                    </div>
                </div>
                {/* nft gallery */}

                {/* merch gallery */}
                <div className="d-flex justify-content-center p-4">
                    <div className="holder-merch">

                    </div>
                </div>

                {/* merch gallery */}


                {/* public gallery */}
                <div className="d-flex justify-content-center p-4">
                    <div className="public-merch">

                    </div>
                </div>

                {/* public gallery */}

            </div>
    </>)
}