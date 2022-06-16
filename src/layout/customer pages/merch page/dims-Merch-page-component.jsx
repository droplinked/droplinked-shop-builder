import "./dims-Merch-page-style.scss"

import { useState, useEffect, useCallback } from "react"
import { BasicURL } from "../../../sevices/functoinal-service/CallApiService"
import { useParams } from "react-router-dom";

import axios from "axios"
import Loading from "../../../components/features/loading/Loading";
import AutoWidthButton from "../../../components/features/buttons components/autow basic button/B-button-component";
import DropDownPairValId from "../../../components/features/input components/dropdown pair val and id/Dropdonw-valId-component";
import plus from "../../../assest/feature/buy product/plusIcon.png"
import minus from "../../../assest/feature/buy product/minusIcon.png"
import Carousel2 from "../../../components/features/carousels components/carousel 2/Carousel2-component";
import SpcialDropDownComp from "./specialDropDown/Special-dropdown-component";

export default function DimsMerchPage() {

    const [product, setProduct] = useState(null)
    const [skus, setSkus] = useState([])
    const [price, setPrice] = useState(0)
    const [images, setImages] = useState([])
    const [quantity, setQuantity] = useState(0)
    const [variantsArray, setVariantsArray] = useState(null)
    const [firstVariat, setFirstVariants] = useState(null)
    const [secondVariant, setSecondVariant] = useState(null)
    const [firstVariantDropDown, setFirstVarDropdown] = useState(null)
    const [secondVariantDropDown, setSecondVariantDropDown] = useState(null)

    let merchId = useParams().merchId;
    let token = JSON.parse(localStorage.getItem("token"));

    console.log(firstVariat);
    console.log(secondVariant);

    useEffect(() => {
        axios
            .get(`${BasicURL}/producer/product/${merchId}?withSku=true`,
                { headers: { Authorization: "Bearer " + token } })
            .then(e => {
                setProduct(e.data.data.product)
                setSkus(e.data.data.product.skus)
                setImages(e.data.data.product.media)
            })
            .catch(e => console.log(e.response.data.reason))
    }, [])



    // get all variants Id used in variants
    useEffect(() => {
        if (skus.length > 0) {
            let arr = []
            skus.forEach((sk, i) => {
                sk.options.forEach((opt, i) => {
                    if (!arr.includes(opt.variantID)) {
                        arr.push(opt.variantID)
                    }
                })
            })
            // let arr2 = arr.map((opt) => { return (opt == "62a989e21f2c2bbc5b1e7154") ? "Size" : "Color" })
            setVariantsArray(arr)
        }
    }, [skus])

    // get first variants values
    useEffect(() => {
        if (variantsArray) {
            let arr = []
            skus.forEach((sku, i) => {
                sku.options.forEach((opt, i) => {
                    if (opt.variantID == variantsArray[0] && (!arr.includes(opt.value))) {
                        arr.push(opt.value)
                    }
                })
            })
            setFirstVarDropdown(arr)
        }
    }, [variantsArray])


    // get second dropdown values
    useEffect(() => {
        if (firstVariat) {
            let arr = []
            skus.forEach((sku) => {
                let cond = false;
                sku.options.forEach((opt) => { if (opt.value == firstVariat) cond = true })
                if (cond) {
                    sku.options.forEach((opt, i) => {
                        if (opt.variantID == variantsArray[1] && (!arr.includes(opt.value))) {
                            arr.push(opt.value)
                        }
                    })

                }
            })
            setSecondVariantDropDown(arr)
        }
    }, [firstVariat])


    // get price
    useEffect(() => {
        if (secondVariant) {
            skus.forEach((sku) => {
                let cond = false;
                sku.options.forEach((opt) => { if (opt.value == firstVariat) cond = true })
                if (cond) {
                    let cond2 = false;
                    sku.options.forEach((opt) => {
                        if (opt.value == secondVariant) cond2= true
                    })
                    if(cond2){
                        setPrice(sku.price)
                    }
                }     
            })
        }
    }, [secondVariant])

    const getVariantName = (id) => {
        return (id == "62a989e21f2c2bbc5b1e7154") ? "Size" : "Color"
    }


    const selectFirstVariant = (e) => {
        setFirstVariants(e.target.value);
    }
    const selectSecondVariant = (e) => {
        setSecondVariant(e.target.value);
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
                        <Carousel2 imagesArray={images} />

                    </div>
                    {/* imgage side */}

                    <div className="detail-side col-12 col-md-6">
                        <p className="merch-title">{product.title}</p>
                        <p className="merch-descroption">{product.description}</p>
                        <p className="merch-price">{`$${price}`}</p>

                        <div className="merch-options-wrap">
                            <div className="opt">
                                {(firstVariantDropDown) &&
                                    <SpcialDropDownComp
                                        value={firstVariat}
                                        valArray={firstVariantDropDown}
                                        change={selectFirstVariant}
                                        place={getVariantName(variantsArray[0])}
                                    />
                                }
                            </div>
                            <div className="opt">
                                {(secondVariantDropDown) &&
                                    <SpcialDropDownComp
                                        value={secondVariant}
                                        valArray={secondVariantDropDown}
                                        change={selectSecondVariant}
                                        place={getVariantName(variantsArray[1])}
                                    />
                                }
                            </div>
                        </div>

                        <div className="calc-btn-wrap">
                            <div className="btn" onClick={() => { setQuantity(p => ++p) }}>
                                <img src={plus} alt="" />
                            </div>
                            <p className="show">{quantity}</p>
                            <div className="btn"
                                onClick={() => { if (quantity != 0) setQuantity(p => --p) }}>
                                <img src={minus} alt="" />
                            </div>
                        </div>
                        <AutoWidthButton text={"Add to basket"} />
                    </div>

                </div>
            }

        </div>)
}