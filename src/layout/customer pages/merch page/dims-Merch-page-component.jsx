import "./dims-Merch-page-style.scss"

import { useState, useEffect } from "react"
import { BasicURL } from "../../../sevices/functoinal-service/CallApiService"
import { useParams } from "react-router-dom";

import axios from "axios"
import Loading from "../../../components/features/loading/Loading";
import AutoWidthButton from "../../../components/features/buttons components/autow basic button/B-button-component";
import DropDownPairValId from "../../../components/features/input components/dropdown pair val and id/Dropdonw-valId-component";
import plus from "../../../assest/feature/buy product/plusIcon.png"
import minus from "../../../assest/feature/buy product/minusIcon.png"
import Carousel2 from "../../../components/features/carousels components/carousel 2/Carousel2-component";

export default function DimsMerchPage() {

    const [product, setProduct] = useState(null)
    const [skus, setSkus] = useState([])
    const [price, setPrice] = useState(0)
    const [images, setImages] = useState([])
    const [quantity, setQuantity] = useState(0)
    let merchId = useParams().merchId;
    let token = JSON.parse(localStorage.getItem("token"));


    useEffect(() => {
        axios
            .get(`${BasicURL}/producer/product/${merchId}?withSku=true`,
                { headers: { Authorization: "Bearer " + token } })
            .then(e => {
                setProduct(e.data.data.product)
                initialSkus(e.data.data.product.skus)
                setImages(e.data.data.product.media)
            })
            .catch(e => console.log(e.response.data.reason))
    }, [])

    const initialSkus = (sku) => {
        let skusArray = sku.map(opts => {
            let skuName = "";
            let skuId = opts._id;
            opts.options.forEach((optItem, i) => {
                skuName += (i == 0) ? optItem.value : (" - " + optItem.value)
            })
            return { value: skuName, id: skuId }
        })
        setSkus(skusArray);
    }


    const selectVariant = (e) => {
        console.log(e.target.value);

        product.skus.forEach((merch) => {
            if (merch._id == e.target.value) {
                setPrice(merch.price)
            }
        })
    }


    return (
        <div className="merch-page-container">
            {(product == null)
                ?
                <Loading />
                :
                <div className="merch-page-wrapper d-flex justify-content-between">

                    {/* imgage side */}
                    <div className="image-side col-12 col-md-6"> 
                    <Carousel2  imagesArray={images}/>

                    </div>
                    {/* imgage side */}

                    <div className="detail-side col-12 col-md-6">
                        <p className="merch-title">{product.title}</p>
                        <p className="merch-descroption">{product.description}</p>
                        <p className="merch-price">{`$${price}`}</p>

                        <div className="w-100">
                            {(skus.length > 0) &&
                                <DropDownPairValId pairArray={skus} change={selectVariant} />
                            }
                        </div>

                        <div className="calc-btn-wrap">
                            <div className="btn" onClick={()=>{setQuantity(p => ++p)}}>
                                <img src={plus} alt="" />
                            </div>
                            <p className="show">{quantity}</p>
                            <div className="btn"
                            onClick={()=>{if(quantity != 0)setQuantity(p => --p)}}>
                                <img src={minus} alt="" />
                            </div>
                        </div>
                        <AutoWidthButton text={"Add to basket"} />
                    </div>

                </div>
            }
            
        </div>)
}