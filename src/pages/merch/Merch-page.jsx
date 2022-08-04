import "./Merch-page-style.scss"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import { UseWalletInfo } from "../../context/wallet/WalletContext"
import { useProfile } from "../../context/profile/ProfileContext"
import { useToasty } from "../../context/toastify/ToastContext"
import { checkRules } from "../../services/nft-service/NFTcheck"
import { useCart } from "../../context/cart/CartContext"
import { getProduct } from "../../api/public/Product-api"
import { addSkuToCart } from "../../api/base-user/Cart-api"


import Carousel from "../../components/shared/Carousel/Carousel-component"
import Loading from "../../components/shared/loading/Loading";
import plus from "../../assest/feature/buy product/plusIcon.png"
import minus from "../../assest/feature/buy product/minusIcon.png"
import SpcialDropDownComp from "./specialDropDown/Special-dropdown-component";
import BasicButton from "../../components/shared/BasicButton/BasicButton"


export default function MerchPage() {

    const [product, setProduct] = useState(null)
    const [images, setImages] = useState([])
    const [quantity, setQuantity] = useState(1)
    const [disableBtn, setDisableBtn] = useState(false)
    // state for change description limited
    const [readmore, setReadmore] = useState(false)

    const [optionTypes, setOptionTypes] = useState(null)
    const [optionsValue, setOptionsValue] = useState(null)
    const [options, setOptions] = useState(null)
    const [sku, setSku] = useState(null)


    const { userData, authenticate } = UseWalletInfo();
    const { profile } = useProfile();
    const { errorToast, successToast } = useToasty();
    const { updateCart } = useCart();

    let params = useParams();
    let merchId = params.merchId;
    let shopname = params.shopname;


    useEffect(() => {
        const getdata = async (merchId) => {
            let pr = await getProduct(merchId)
            setProduct(pr)
            setImages(pr.media)
        }
        getdata(merchId)

    }, [])


    // build array of option's type like : ["size" , "color"]
    useEffect(() => {
        if (product != null) {
            let optionsTypeArray = []
            optionsTypeArray = product.skus[0].options.map((option) => {
                return option.variantName
            })
            setOptionTypes(optionsTypeArray)
        }
    }, [product])


    // build array of product's options like : [ {size: 'xl', color: 'white'} , ...]
    useEffect(() => {
        if (optionTypes != null) {
            if (optionTypes.length > 0) {
                let optionsArray = []
                product.skus.forEach((sku, i) => {
                    let newOptionObject = {}
                    sku.options.forEach(option => {
                        newOptionObject[option.variantName] = option.value
                    })
                    optionsArray.push(newOptionObject)
                })
                setOptionsValue(optionsArray)
            } else {
                // set sku if havent options
                setSku(product.skus[0])
            }
        }
    }, [optionTypes])


    // build array of options name and values like :  [ {name: 'size', values: Array(2), selected: 'xl'} , ...]
    useEffect(() => {
        if (optionsValue != null) {
            let optionsArray = []
            optionTypes.forEach((optionType, i) => {
                let optionObject = {}
                optionObject['name'] = optionType
                if (i == 0) {
                    let valueArray = optionsValue.map(optionValue => optionValue[optionType])
                    valueArray = [...new Set(valueArray)];
                    optionObject['values'] = valueArray
                    optionObject['selected'] = valueArray[0]
                } else {
                    let valueArray = optionsValue.map(optionValue => {
                        if (optionValue[optionsArray[i - 1].name] == optionsArray[i - 1].selected)
                            return optionValue[optionType]
                    })
                    valueArray = valueArray.filter(value => value != undefined)
                    valueArray = [...new Set(valueArray)];
                    optionObject['values'] = valueArray
                    optionObject['selected'] = valueArray[0]
                }
                optionsArray.push(optionObject)
            })
            setOptions(optionsArray)
        }
    }, [optionsValue])


    // set sku after change optionsArray
    useEffect(() => {
        if (options != null) {
            let result = {};
            product.skus.forEach(sku => {
                let flag = true;
                sku.options.forEach(option => {
                    let find = options.find(opt => opt.name == option.variantName)
                    if (find.selected != option.value) flag = false
                })
                if (flag) {
                    result = sku
                }
            })
            setSku(result);
        }
    }, [options])



    // add to baskset functionality
    const Addtobasket = async () => {

        if (profile == null) {
            errorToast("Please login")
            return
        }
        if (quantity == 0) {
            errorToast("Please add items")
            return
        }

        const cart = {
            skuID: sku._id,
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
                    errorToast("Required NFT not found, accessed denied")
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
            successToast("Item added to cart")
            setQuantity(1)
            updateCart()
        } else {
            errorToast(result)
        }
        setDisableBtn(false)
    }

    // change option array selected element after select new option  value
    const changeSelect = (e, optionName, index) => {
        let optionsArray = options.map(option => {
            if (option.name == optionName) {
                return { ...option, selected: e.target.value }
            } else {
                return option
            }
        })
        updateOptions(optionsArray, index);
    }

    // update options after change
    const updateOptions = (newOptionArray, index) => {
        let optionArray = newOptionArray.map((option, i) => {
            if (i == 0) {
                return option
            } else {
                let valueArray = optionsValue.map(optionValue => {
                    if (optionValue[newOptionArray[i - 1].name] == newOptionArray[i - 1].selected)
                        return optionValue[option.name]
                })
                valueArray = valueArray.filter(value => value != undefined)
                valueArray = [...new Set(valueArray)];

                let select = (index < i) ? valueArray[0] : option.selected
                return {
                    ...option,
                    values: valueArray,
                    selected: select
                }
            }
        })
        setOptions(optionArray);
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
                        <Carousel imagesArray={images} />

                    </div>
                    {/* imgage side */}

                    <div className="detail-side col-12 col-md-6">
                        <p className="merch-brandname">{shopname}</p>
                        <p className="merch-title">{product.title}</p>

                        <p className="merch-price">{`$${(sku != null) ? (sku.price) : ""}`}</p>

                        {(options && optionTypes.length > 0) &&
                            <div className="merch-options-wrap " >
                                {options.map((option, i) => {
                                    return (
                                        <div style={{ width: "45%" }}>
                                            <SpcialDropDownComp key={i} option={option} change={changeSelect} index={i} />
                                        </div>
                                    )
                                })}
                            </div>
                        }

                        {sku && (sku.quantity > 0) &&
                            <div className="calc-btn-wrap">
                                <div className="btn"
                                    onClick={() => { if (quantity != 1) setQuantity(p => --p) }}>
                                    <img src={minus} alt="" />
                                </div>
                                <p className="show">{quantity}</p>
                                <div className="btn" onClick={() => { setQuantity(p => ++p) }}>
                                    <img src={plus} alt="" />
                                </div>
                            </div>
                        }
                        <div style={{ height: "auto" }}>
                            {sku && (sku.quantity == 0) ?
                                <BasicButton disabled={true}>Sold out</BasicButton>
                                :
                                <BasicButton click={Addtobasket} disabled={disableBtn}>Add to basket</BasicButton>
                            }

                        </div>
                    </div>
                    <div className="merch-description-wrapper">
                    <p className={`merch-description ${(readmore)?"":'merch-limite-description'}`}>{product.description}</p>
                    <button className="merch-readmore-button" onClick={()=>{setReadmore(p => !p)}}>Readmore</button>
                    </div>
                    
                </div>
            }

        </div>)
}