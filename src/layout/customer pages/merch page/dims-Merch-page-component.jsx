import "./dims-Merch-page-style.scss"

import { useState, useEffect, useCallback } from "react"
import { BasicURL } from "../../../sevices/functoinal-service/CallApiService"
import { useParams } from "react-router-dom";
import { UseWalletInfo } from "../../../sevices/context/context"
import { useProfile } from "../../../sevices/hooks/useProfile"
import { useToasty } from "../../../sevices/hooks/useToastify"
import { checkRules } from "../../../sevices/functoinal-service/NFTcheck"
import { useCart } from "../../../sevices/hooks/useCart"

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
    const [images, setImages] = useState([])
    const [quantity, setQuantity] = useState(0)
    const [variants, setVariants] = useState(null)
    const [selectedSku, setselectedSku] = useState(null)
    const [disableBtn, setDisableBtn] = useState(false)

    const { userData, authenticate } = UseWalletInfo();
    const { profile } = useProfile();
    const { errorToast, successToast } = useToasty();
    const { updateCart } = useCart();

    let params = useParams();
    let merchId = params.merchId;
    let shopName = params.shopname;
    let token = JSON.parse(localStorage.getItem("token"));



    useEffect(() => {
        axios
            .get(`${BasicURL}/product/${merchId}?withSku=true`,)
            .then(e => {
                setProduct(e.data.data)
                setImages(e.data.data.media)
                initialskuArray(e.data.data.skus)
            })
            .catch(e => console.log(e.response.data.reason))
    }, [])




    const initialskuArray = (skuArray) => {
        if (skuArray.length == 0) return

        let variantsArray = []
        variantsArray = skuArray.map(sku => {
            let optionText = ""
            sku.options.forEach((opt, i) => {
                if (i > 0) {
                    optionText += `| ${opt.variantName} : ${opt.value} `
                } else {
                    optionText += ` ${opt.variantName} : ${opt.value} `
                }

            })
            return {
                id: sku._id,
                price: sku.price,
                option: optionText
            }
        })
        setVariants(variantsArray);
        setselectedSku(variantsArray[0])
    }

    const ChangeSelected = (e) => {
        setselectedSku(JSON.parse(e.target.value));
    }


    const Addtobasket = () => {
        //  console.log(selectedSku.id);
        if (userData == undefined) {
            authenticate();
            return
        }
        if (profile == null) {
            errorToast("Please login")
            return
        }
        if (quantity == 0) {
            errorToast("Please add quantity")
            return
        }

        const cart = {
            skuID: selectedSku.id,
            quantity: quantity
        }

        if (product.ruleset == undefined) {
            setDisableBtn(true)
            axios.post(BasicURL + `/${shopName}/cart/sku`, cart,
                { headers: { Authorization: 'Bearer ' + token } })
                .then((e) => {
                    setDisableBtn(false)
                    successToast("Merch added to cart")
                    setQuantity(0)
                    updateCart(shopName)
                })
                .catch(e => {
                    setDisableBtn(false)
                    errorToast(e.response.data.reason)
                })
                return;
        }

        const Rules = product.ruleset.rules.map(rule => rule.address)

        setDisableBtn(true)
        checkRules(userData.profile.stxAddress.mainnet, Rules)
            .then(e => {
                if (e) {
                    axios.post(BasicURL + `/${shopName}/cart/sku`, cart,
                        { headers: { Authorization: 'Bearer ' + token } })
                        .then((e) => {
                            setDisableBtn(false)
                            successToast("Merch added to cart")
                            setQuantity(0)
                            updateCart(shopName)
                        })
                        .catch(e => {
                            setDisableBtn(false)
                            errorToast(e.response.data.reason)
                        })
                } else {
                    setDisableBtn(false)
                    errorToast("You have NFT for this merch")
                }
            })
            .catch(e => {
                setDisableBtn(false)
                errorToast(e.response.data)
            })
        setDisableBtn(true)
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
                        <p className="merch-price">{`$${(selectedSku != null) ? (selectedSku.price) : ""}`}</p>

                        {(variants && variants.length > 1) &&
                            <div className="merch-options-wrap " >
                                <div className="opt w-100">
                                    <SpcialDropDownComp variant={variants} change={ChangeSelected} />
                                </div>
                            </div>
                        }

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
                        <AutoWidthButton text={"Add to basket"} click={Addtobasket} disable={disableBtn} />
                    </div>

                </div>
            }

        </div>)
}