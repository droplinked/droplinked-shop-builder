import "./GalleryCarousel.scss"
import nft1 from "../../../assest/image/nft/nft1.jpg"
import nft2 from "../../../assest/image/nft/nft2.jpg"
import rightBtn from "../../../assest/image/component assest/gallery btn/right.png"
import leftBtn from "../../../assest/image/component assest/gallery btn/left.png"
import img1 from "./hardcode image/1504.png"
import img2 from "./hardcode image/1724.png"
import img3 from "./hardcode image/3002.png"
import img4 from "./hardcode image/4307.png"
import img5 from "./hardcode image/5002.png"
import img6 from "./hardcode image/5627.png"
import { useState } from "react"

function GalleryCarousel() {
    const [num1, setNum] = useState(0)

    const imageArray = [img1, img2, img3, img4, img5, img6];


    const nextImg = () => {
        (num1 == 4) ? setNum(0) : setNum(p => p + 1)
    }

    const backImg = () => {
        (num1 == 0) ? setNum(4) : setNum(p => p - 1)
    }

    setTimeout(nextImg, 5000);

    return (<>
        {/* gallery wrap */}
        <div className="row d-flex justify-content-center gr">
            <div className="col-12 col-sm-8  d-flex justify-content-center" >

                <div className="gallery-wrapper ">
                    <div className="image-wrap ">
                        <img className="ratio ratio-1x1" src={imageArray[num1]} />
                    </div>
                    <div className="image-wrap">
                        <img className="ratio ratio-1x1" src={imageArray[num1 + 1]} />
                    </div>
                </div>

            </div>
        </div>
        {/* gallery wrap */}


        {/* bottom line for circle */}
        <div className="row d-flex justify-content-center gr">
            <div className=" col-4 d-flex justify-content-center align-item-center"
                style={{ height: "50px", }}>

                <div className="carousel-circle">
                    <img src={leftBtn} alt="" onClick={backImg} />

                    {imageArray.map((item, index) => {
                        return <span className={`rounded-circle ${(index == num1 || index == num1 + 1) ? "active" : "nonactive"}`}></span>
                    })}

                    <img src={rightBtn} alt="" onClick={nextImg} />
                </div>

            </div>
        </div>
        {/* bottom line for circle */}
    </>)
}

export default GalleryCarousel