import "./Merch-page-style.scss"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import { UseWalletInfo } from "../../context/wallet/WalletContext"
import { useProfile } from "../../context/profile/ProfileContext"
import { useToasty } from "../../context/toastify/ToastContext"
import { checkRules } from "../../services/NftService/NFTcheck"
import { useCart } from "../../context/cart/CartContext"
import { getProduct } from "../../api/Public-apis/Product-api"
import { addSkuToCart } from "../../api/BaseUser-apis/Cart-api"


import Loading from "../../components/shared/loading/Loading";
import AutoWidthButton from "../../components/features/buttons components/autow basic button/B-button-component";
import plus from "../../assest/feature/buy product/plusIcon.png"
import minus from "../../assest/feature/buy product/minusIcon.png"
import Carousel2 from "../../components/features/carousels components/carousel 2/Carousel2-component";
import SpcialDropDownComp from "./specialDropDown/Special-dropdown-component";



export default function MerchPage() {

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

    let token = JSON.parse(localStorage.getItem("token"));

    useEffect(() => {

        const getdata = async (merchId) => {
            let pr = await getProduct(merchId)
            setProduct(pr)
            setImages(pr.media)
            initialskuArray(pr.skus)
        }
        getdata(merchId)

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


    const Addtobasket = async () => {

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
           await addMerhcToCart(cart)
            return;

        }

        if (userData == undefined) {
            authenticate();
            return
        }

        const Rules = product.ruleset.rules.map(rule => rule.address)

        setDisableBtn(true)
        checkRules(userData.profile.stxAddress.mainnet, Rules)
            .then(async e => {
                if (e) {
                    await addMerhcToCart(cart)
                } else {
                    setDisableBtn(false)
                    errorToast("Required NFT missing")
                }
            })
            .catch(e => {
                setDisableBtn(false)
                errorToast(e.response.data)
            })
    }


    const addMerhcToCart = async (cart) => {
        let result = await addSkuToCart(cart)
        if (result == true) {
            successToast("Merch added to cart")
            setQuantity(0)
            updateCart()
        } else {
            errorToast(result)
        }
        setDisableBtn(false)
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