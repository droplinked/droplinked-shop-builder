import "./Merch-page-style.scss"

import { useState, useEffect } from "react"
import { BasicURL } from "../../../sevices/functoinal-service/CallApiService"
import { useParams } from "react-router-dom";

import axios from "axios"
import Loading from "../../../components/features/loading/Loading";


export default function MerchPage() {

    const [product, setProduct] = useState(null)
    let merchId = useParams().merchId;
    let token = JSON.parse(localStorage.getItem("token"));

    useEffect(() => {
        axios
            .get(`${BasicURL}/producer/product/${merchId}?withSku=true`,
                { headers: { Authorization: "Bearer " + token } })
            .then(e => setProduct(e.data.data.product))
            .catch(e => console.log(e.response.data.reason))
    }, [])

    return (
        <>
            {(product == null)
                ?
                <Loading />
                :
                <>
                    <img src={product.media[0].url} alt="" />
                    <p style={{ color: "white" }}>{product.title}</p>
                    <p style={{ color: "white" }}>{product.description}</p>
                </>
            }
            {/* <div className="product-page-wrap">
            <div className="row">
                <div className="d-flex justify-content-between "  >
                    <div className="col-md-8 col-12 product-whole-border" >
                        {(product == null) ? <Loading />
                            : (<>
                                <div className="buy-product-wraper">
                                    <div className="product-img-form-wr">
                                        <div className="product-main-image" style={{ backgroundImage: `url(${mainImage})` }}>
                                            <div className="position-absolute d-flex justify-content-end " style={{ top: "12px", right: "12px", width: "130px" }}>
                                                <div className="product-main-img-icon"
                                                    onClick={() => { setFullSizeImage(p => !p) }}>
                                                    <img src={icon3} className="product-icon-img" alt="" />
                                                </div>
                                            </div>

                                            <div className="product-main-img-downicon">
                                                <img src={icon4} alt="" />
                                                <p>Official website</p>
                                            </div>

                                        </div>

                                        <div className=" w-100 d-flex justify-content-between" style={{ height: "80px", paddingTop: "10px" }}>
                                            {(images.length > 1) && <>
                                                <div className="product-carusel-btn">
                                                    <img src={left} className="w-100 h-100" alt="" />
                                                </div>
                                                {images.map((img, i) => {
                                                    if (i >= 0 && i < 4) return (<img className="product-carosel-img" src={img} alt=""
                                                        onClick={() => { setMainImage(images[i]) }} />)
                                                })}

                                                <div className="product-carusel-btn">
                                                    <img src={right} className="w-100 h-100" alt="" />
                                                </div>
                                            </>}
                                        </div>
                                    </div>
                                    <div className="product-img-form-wr product-left-side">
                                        <div className="product-brand-name">{product.title}</div>
                                        <div className="product-text-brand">{product.handle}</div>
                                        <div className="product-price">{product.variants[0].formatted_price}</div>
                                        <div className="w-100 d-flex justify-content-between flex-wrap">
                                            {product.options.map((option, i) => {
                                                return (<div className="product-select-wrap">
                                                    <select className="product-select-text"
                                                        onChange={(e) => {
                                                            let vl = optionsVal
                                                            vl[i] = e.target.value
                                                            setOptionsVal(vl)
                                                            console.log(optionsVal)
                                                        }}>
                                                        {option.values.map((val) => {
                                                            return <option value={val}>{val}</option>
                                                        })}
                                                    </select>
                                                </div>)
                                            })}
                                        </div>
                                        <div className="d-flex">
                                            <div className="product-counter-btn"
                                                onClick={() => { setNumber(p => p + 1) }}
                                            >
                                                <img src={plus} alt="" />
                                            </div>
                                            <div className="product-counter-btn" style={{ margin: "0px 10px", backgroundColor: "transparent" }}><p>{number}</p></div>
                                            <div className="product-counter-btn"
                                                onClick={() => { if (number > 0) { setNumber(p => p - 1) } }}
                                            >
                                                <img src={minus} alt="" />
                                            </div>
                                        </div>

                                        {(hasNFT.length > 0) ?
                                            <button className="product-addbasket-btn"
                                                onClick={addItem}
                                            >
                                                <div className="d-flex justify-content-center align-items-center" style={{ height: "18px" }}>
                                                    <img src={basket} className="h-100" alt="" />
                                                    <p className="product-add-basket-text">Add to basket</p>
                                                </div>
                                            </button>
                                            :
                                            <button className="product-addbasket-btn"
                                                onClick={clickOnProduct}
                                            >
                                                <div className="d-flex justify-content-center align-items-center" style={{ height: "18px" }}>
                                                    <img src={basket} className="h-100" alt="" />
                                                    <p className="product-add-basket-text">Add to basket</p>
                                                </div>
                                            </button>
                                        }

                                    </div>

                                </div>
                                <div className="product-down-wrp">
                                    <div className="product-describe-text">Description</div>
                                    <div id="s" className={`product-detail-text ${readmore ? "" : "showReadMore"}`} dangerouslySetInnerHTML={{ __html: product.body_html }}></div>
                                    <button className="product-readmore-btn"
                                        onClick={() => { setReadmore(p => !p) }}
                                    >
                                        <img src={readmoreIcon} alt="" />
                                        <p>Read more</p>
                                    </button>
                                </div>

                            </>)}
                    </div>
                    {(state.length > 0) &&
                        <div className="col-4 d-none d-md-inline">
                            <Side />
                        </div>
                    }
                </div>

            </div>


        </div>
        {fullsizeImage && <FullSizeImage image={mainImage} close={closeFullsize} />}
        {error &&
            <div style={{ position: "fixed", maxWidth: "200px", maxHeight: "100px" }}>
                <ErrorModal>you haven't NFT</ErrorModal>
            </div>
        } */}
        </>)
}