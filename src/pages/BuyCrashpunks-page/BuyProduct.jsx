import "./BuyProduct.scss"
import plus from "../../assest/feature/buy product/plusIcon.png"
import minus from "../../assest/feature/buy product/minusIcon.png"
import Loading from "../../components/shared/loading/Loading"
import axios from 'axios';

import { useState, useEffect } from "react"
import { useProfile } from "../../sevices/hooks/useProfile"
import { useParams } from "react-router-dom";
import { useCart } from "../../sevices/hooks/useCart"
import { UseWalletInfo } from "../../sevices/context/context"
import { fetchPrincipalNFTs } from "../../sevices/functoinal-service/NFTcheck"




import Carousel2 from "../../components/features/carousels components/carousel 2/Carousel2-component"
import AutoWidthButton from "../../components/features/buttons components/autow basic button/B-button-component"


function BuyProduct() {
    let { id } = useParams();

    const [number, setNumber] = useState(1);

    const [shopName, setShopName] = useState("");
    const [mainImage, setMainImage] = useState("");
    const [optionsVal, setOptionsVal] = useState([]);
    const [hasNFT, setHasNFT] = useState([])
    const [error, setError] = useState(false)
    const { profile } = useProfile();
    const { state, increase } = useCart();
    const [fullsizeImage, setFullSizeImage] = useState(false);
    // const personId = profile.id;
    const { userData, authenticate } = UseWalletInfo();

    //new states 
    const [product, setPrudoct] = useState(null);
    const [images, setImages] = useState([])
    const [quantity, setQuantity] = useState(0)
    const [readmore, setReadmore] = useState(false);



    useEffect(() => {
        axios.get(`https://dev.flatlay.io/product/${id}`, {
            headers: {
                "Content-Type": "application/json",
                authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJlZGkubW5zQGdtYWlsLmNvbSIsInVzZXJJZCI6IjEzMTMyMCIsImlhdCI6MTY1NzA5NDU5NiwiZXhwIjoxNjYyMjc4NTk2fQ.Xh-1G0D54ginQvPr3VK5IHFZ4vg0tNWKf2aOu-g22ZI"
            }
        }).then((res) => {
            setPrudoct(res.data.product_listing);
            setShopName(res.data.headers['X-Shopify-Shop-Domain'])
            let imglist = res.data.product_listing.images.map((item) => {
                return { url: item.src }
            })
            setImages(imglist);
            setMainImage(imglist[0])
        })

        if (userData != undefined) {
            let mainet = userData.profile.stxAddress.mainnet;
            let testnet = userData.profile.stxAddress.testnet;
            fetchPrincipalNFTs(
                mainet,
                "SP3QSAJQ4EA8WXEDSRRKMZZ29NH91VZ6C5X88FGZQ.crashpunks-v2::crashpunks-v2",
                1,
                0
            )
                .then((results) => {
                    console.log("result");
                    console.log(results)
                    setHasNFT(results)
                })
                .catch((reason) => {
                    console.log("could not fetch user nfts")
                })
        }

    }, [])


    useEffect(() => {
        let arr = [];
        if (product != null) {
            {
                product.options.forEach((option) => {
                    arr.push(option.values[0])
                })
            }
            setOptionsVal(arr)
        }

    }, [product])



    return (<>
        <div className="merch-page-container">
            {(product == null)
                ?
                <Loading />
                :
                <>
                    <div className="merch-page-wrapper d-flex justify-content-between">
                        <div className="image-side col-12 col-md-6">
                            <Carousel2 imagesArray={images} />
                        </div>

                        <div className="detail-side col-12 col-md-6">
                            <p className="merch-title">{product.title}</p>
                            <p className="merch-descroption">{product.handle}</p>
                            <p className="merch-price">{`$ 0`}</p>

                            <div className="merch-options-wrap">
                         {/*    <div className="opt">
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
                            </div>*/}
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



                    <div className="botom-wrapper">
                        <div className={`${(readmore) ? "readmore-orginal" : "readmore-limited"}`}
                            dangerouslySetInnerHTML={{ __html: product.body_html }}>
                        </div>

                        <div className="readmore-btn"
                        onClick={() => setReadmore(p => !p)}
                        >Read More</div>
                    </div>
                </>
            }
        </div>


    </>)
}

export default BuyProduct

