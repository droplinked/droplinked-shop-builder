import "./BuyProduct.scss"
import mainImg from "./assest/mainImg.jpg"
import img1 from "./assest/img1.jpg"
import img2 from "./assest/img2.jpg"
import img3 from "./assest/img3.png"
import img4 from "./assest/img4.jpg"
import left from "../../assest/feature/buy product/leftflask.png"
import right from "../../assest/feature/buy product/righIcon.png"
import plus from "../../assest/feature/buy product/plusIcon.png"
import minus from "../../assest/feature/buy product/minusIcon.png"
import basket from "../../assest/feature/buy product/basketIcon.png"
import readmoreIcon from "../../assest/feature/buy product/readmore.png"
import icon1 from "../../assest/feature/buy product/saveIcon.png"
import icon2 from "../../assest/feature/buy product/upIcon.png"
import icon3 from "../../assest/feature/buy product/bigIcon.png"
import icon4 from "../../assest/feature/buy product/big2Icon.png"
import { useState, useEffect } from "react"
import axios from 'axios';
import { useProfile } from "../../sevices/hooks/useProfile"
import { useParams } from "react-router-dom";
import Loading from "../../components/features/loading/Loading"
import { useCart } from "../../sevices/hooks/useCart"
import Side from "./cart-component/Side"
import { log } from "react-modal/lib/helpers/ariaAppHider"
import FullSizeImage from "../../components/features/full size image/FullSizeImage"




function BuyProduct() {
    let { id } = useParams();
    const [readmore, setReadmore] = useState(false);
    const [number, setNumber] = useState(1);
    const [product, setPrudoct] = useState(null);
    const [shopName, setShopName] = useState("");
    const [images, setImages] = useState([]);
    const [mainImage, setMainImage] = useState("");
    const [optionsVal, setOptionsVal] = useState([]);
    const { profile } = useProfile();
    const { state, increase } = useCart();
    const [fullsizeImage, setFullSizeImage] = useState(false);
    // const personId = profile.id;



    useEffect(() => {
        axios.get(`https://dev.flatlay.io/product/${id}`, {
            headers: {
                "Content-Type": "application/json",
                authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJlZGkubW5zQGdtYWlsLmNvbSIsInVzZXJJZCI6IjEzMTMyMCIsImlhdCI6MTY1MTg0NDI0MSwiZXhwIjoxNjU3MDI4MjQxfQ.v--CI4iWCjvmS_34u1zRF-inryI6zTitk-IprJm0Zw8",
            }
        }).then((res) => {
            setPrudoct(res.data.product_listing);
            setShopName(res.data.headers['X-Shopify-Shop-Domain'])
            let imglist = res.data.product_listing.images.map((item) => {
                return item.src
            })
            setImages(imglist);
            setMainImage(imglist[0])
        })

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






    const findVariant = () => {
        let selectedVariant = {};
        let con = true;
        let find = product.variants.map((vari) => {
            let f = true;
            vari.option_values.map((vl) => {
                if (!optionsVal.includes(vl.value)) { f = false }
            })
            if (f == true) {
                selectedVariant = vari;
                return;
            }
        })

        return selectedVariant;
    }

    const addItem = () => {
        let variant = findVariant();
        increase({
            amount: number,
            product: product,
            shopName: shopName,
            variant: variant
        })
    }

    const closeFullsize = ()=>{
        setFullSizeImage(false)
    }



    return (<>
        <div className="product-page-wrap">
            <div className="row">
                <div className="d-flex justify-content-between "  >
                    <div className="col-md-8 col-12 product-whole-border" >
                        {(product == null) ? <Loading />
                            : (<>
                                <div className="buy-product-wraper">

                                    <div className="product-img-form-wr">
                                        <div className="product-main-image" style={{ backgroundImage: `url(${mainImage})`}}>

                                            <div className="position-absolute d-flex justify-content-end " style={{ top: "12px", right: "12px", width: "130px" }}>
                                                <div className="product-main-img-icon"
                                                    onClick={() => { setFullSizeImage(p => !p) }}>
                                                    <img src={icon3} className="product-icon-img" alt="" />
                                                </div>
                                                {/*  <div className="product-main-img-icon">
                                                    <img src={icon2} className="product-icon-img" alt="" />
                                                </div>
                                                <div className="product-main-img-icon">
                                                    <img src={icon1} className="product-icon-img" alt="" />
                                                </div>*/}
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

                                        <button className="product-addbasket-btn"
                                            onClick={addItem}
                                        >
                                            <div className="d-flex justify-content-center align-items-center" style={{ height: "18px" }}>
                                                <img src={basket} className="h-100" alt="" />
                                                <p className="product-add-basket-text">Add to basket</p>
                                            </div>
                                        </button>
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
        {fullsizeImage && <FullSizeImage image={mainImage} close={closeFullsize}/>}
    </>)
}




export default BuyProduct