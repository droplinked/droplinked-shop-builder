import "./GalleryCarousel.scss"
import nft1 from "../../../assest/image/nft/nft1.jpg"
import nft2 from "../../../assest/image/nft/nft2.jpg"
import vecRight from "../../../assest/feature/flash/VectorR.svg"
import vecLeft from "../../../assest/feature/flash/VectorL.svg"

function GalleryCarousel() {

    return (<>
        {/* gallery wrap */}
        <div className="row d-flex justify-content-center gr">
            <div className="col-12 col-sm-8  d-flex justify-content-center">

                {/* button */}
                {/* <div className="gallery-btn col-md-1 d-none  d-xl-flex justify-content-end align-item-center">
                    <div className="flash rounded-circle" style={{ marginRight: "10%" }}>
                        <img src={vecLeft} alt="" />
                    </div>
                </div> */}
                {/* button */}

                <div className="gallery-wrapper ">
                    <div className="image-wrap ">
                        <img className="ratio ratio-1x1" src={nft2} />
                    </div>
                    <div className="image-wrap">
                        <img className="ratio ratio-1x1" src={nft1} />
                    </div>
                </div>


                {/* button */}
                {/* <div className="gallery-btn col-md-1 d-none  d-xl-flex justify-content-start align-item-center">
                    <div className="flash rounded-circle d-flex aling-item-center" style={{ marginLeft: "10%" }}>
                        <img src={vecRight} alt="" />
                    </div>
                </div> */}
                {/* button */}
            </div>
        </div>
        {/* gallery wrap */}


        {/* bottom line for circle */}
        <div className="row d-flex justify-content-center gr">
            <div className=" col-4 d-flex justify-content-center align-item-center"
                style={{ height: "50px" }}>

                <div className="carousel-circle">
                    <span className="rounded-circle"
                        style={{ opacity: "1" }}
                    ></span>
                    <span className="rounded-circle"></span>
                    <span className="rounded-circle"></span>
                    <span className="rounded-circle"></span>
                    <span className="rounded-circle"></span>
                    <span className="rounded-circle"></span>
                </div>

            </div>
        </div>
        {/* bottom line for circle */}
    </>)
}

export default GalleryCarousel