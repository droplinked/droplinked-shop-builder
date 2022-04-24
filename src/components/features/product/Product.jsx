import "./Product.scss"
import nft1 from "../../../assest/image/nft/produc.jpg"
import savebtn from "../../../assest/feature/product/savebtn.png"
import { useState } from "react"


function Product() {
    const [viewBtn, setViewBtn] = useState(false)

    return (
        <div className="col-6 col-sm-3 col-md-6 col-lg-3 d-flex justify-content-center">
            <div className="product-wrap">
                <div className="product-image-wrap"
                onMouseLeave={() => setViewBtn(false)}
                onMouseEnter={() => setViewBtn(true)}
                >
                    <img className="product-save-btn" src={savebtn} alt="" />
                    <img className={`ratio ratio-1x1 ${(viewBtn)?"product-img-opacity":""}`} src={nft1}     />
                    {viewBtn && <div className="product-view-btn"><p>View</p></div>}
                </div>
                <div className="brand-name">Brand Name</div>
                <div className="priceS">$ 75</div>
            </div>
        </div>
    )
}

export default Product