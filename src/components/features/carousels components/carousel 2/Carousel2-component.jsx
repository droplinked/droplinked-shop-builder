import "./Carousel2-style.scss"

import { useState, useEffect } from "react"

import left from "../../../../assest/feature/buy product/leftflask.png"
import right from "../../../../assest/feature/buy product/righIcon.png"

export default function Carousel2({ imagesArray }) {

    const [images, setImages] = useState(null)
    const [mainImage, setMainImage] = useState(null)

    useEffect(() => {
        if (imagesArray.length > 0) {
            setMainImage(imagesArray[0].url)
            let imagesGallery = imagesArray.map((img, i) => {
               if(i<4) return i
            })
            setImages(imagesGallery);
        }
    }, [imagesArray])


    const nextImage = () =>{
    }



    return (<div className="carousel2-container">
        {(imagesArray.length > 0) &&
            <>
                <div className="carousel-main-image-wrap">
                    <img src={mainImage} alt="" />
                    {/* <div className="main-img-cont" style={{ backgroundImage: `url(${product.media[0].url})` }}/> */}
                </div>
                <div className="carousel-controler-wrap">
                    <div className="carousel-btn">
                        <img src={left} alt="" />
                    </div>
                    {(images) &&
                        images.map((number, i) => {
                            if (i < 4) {
                                return <img
                                    key={number}
                                    onClick={() => { setMainImage(imagesArray[number].url) }}
                                    className="carouse-img-gallery"
                                    src={imagesArray[number].url}
                                    alt="" />
                            }
                        })}

                    <div className="carousel-btn">
                        <img
                         src={right} 
                         alt="" 
                         onClick={nextImage}
                         />
                    </div>
                </div>
            </>
        }
    </div>)
}