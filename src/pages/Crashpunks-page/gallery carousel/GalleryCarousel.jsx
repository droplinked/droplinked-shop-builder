import "./GalleryCarousel.scss"
import nft1 from "../../../assest/image/nft/nft1.jpg"
import nft2 from "../../../assest/image/nft/nft2.jpg"
import rightBtn from "../../../assest/image/component assest/gallery btn/right.png"
import leftBtn from "../../../assest/image/component assest/gallery btn/left.png"
import img1 from "./hardcode image/1504.png"
import img2 from "./hardcode image/1724.png"
import img3 from "./hardcode image/1724.png"
import img4 from "./hardcode image/4307.png"
import img5 from "./hardcode image/5002.png"
import img6 from "./hardcode image/5627.png"
import { useState, useEffect } from "react"
import axios from "axios"

function GalleryCarousel() {
    const [num1, setNum] = useState(0)
    const [onetime, setOne] = useState(false)


    const NftId = ["1501", "1724", "1724", "4307", "5002", "5627"];

    const imageArray = [img1, img2, img3, img4, img5, img6];


    const nextImg = () => {
        (num1 >= 3) ? setNum(0) : setNum(p => p + 2)
        clearTimeout(timer);
    }

    const backImg = () => {
        (num1 == 0) ? setNum(4) : setNum(p => p - 1)
        clearTimeout(timer);
    }

    const timer = () => setTimeout(nextImg, 5000);
    timer();

    useEffect(() => {
        NftId.forEach((item) => {
            axios.get(`https://gamma.io/api/v1/collections/SP32AEEF6WW5Y0NMJ1S8SBSZDAY8R5J32NBZFPKKZ.free-punks-v0/${item}`)
                .then(e => { })
                .catch(e => console.log(e))
        })
    }, [onetime])



    return (<>
        {/* gallery wrap */}
        <div className="row d-flex justify-content-center gr">
            <div className="col-12 col-sm-8  d-flex justify-content-center" >

                <div className="gallery-wrapper ">

                    <div className="image-wrap">
                        <a href={`https://gamma.io/collections/crashpunks/${NftId[num1]}`}>
                            <img className="ratio ratio-1x1" src={`https://ipfs.io/ipfs/Qmb84UcaMr1MUwNbYBnXWHM3kEaDcYrKuPWwyRLVTNKELC/${NftId[num1]}.png`} />
                        </a>
                    </div>


                    <div className="image-wrap">
                        <a href={`https://gamma.io/collections/crashpunks/${NftId[num1 + 1]}`}>
                            <img className="ratio ratio-1x1" src={`https://ipfs.io/ipfs/Qmb84UcaMr1MUwNbYBnXWHM3kEaDcYrKuPWwyRLVTNKELC/${NftId[num1 + 1]}.png`} />
                        </a>
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