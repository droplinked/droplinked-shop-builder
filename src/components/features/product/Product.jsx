import "./Product.scss"
import nft1 from "../../../assest/image/nft/produc.jpg"
import savebtn from "../../../assest/feature/product/savebtn.png"
import { Link } from "react-router-dom";
import { useState } from "react"
import { useProfile } from "../../../sevices/hooks/useProfile"


function Product({ price, title, imageUrl, id }) {
    const [viewBtn, setViewBtn] = useState(false)
    const { profile } = useProfile();

    return (
        <div className="col-6 col-sm-3 col-md-6 col-lg-3 d-flex justify-content-center ">
            <div className="product-wrap" >

                {(profile == null)
                    ?
                    <Link to={`/`}>
                        <div className="product-image-wrap"
                            onMouseLeave={() => setViewBtn(false)}
                            onMouseEnter={() => setViewBtn(true)}
                        >
                            <img className="product-save-btn" src={savebtn} alt="" />
                            <img className={`ratio ratio-1x1 ${(viewBtn) ? "product-img-opacity" : ""}`} src={imageUrl} />
                            {viewBtn && <div className="product-view-btn"><p>View</p></div>}
                        </div>
                    </Link>

                    :
                    <Link to={`/product/${id}`}>
                        <div className="product-image-wrap"
                            onMouseLeave={() => setViewBtn(false)}
                            onMouseEnter={() => setViewBtn(true)}
                        >
                            <img className="product-save-btn" src={savebtn} alt="" />
                            <img className={`ratio ratio-1x1 h-100 ${(viewBtn) ? "product-img-opacity" : ""}`} src={imageUrl} />
                            {viewBtn && <div className="product-view-btn"><p>View</p></div>}
                        </div>
                    </Link>
                }

                <div className="brand-name">{title}</div>
                <div className="priceS" dangerouslySetInnerHTML={{ __html: price }}></div>

            </div>
        </div>
    )
}

export default Product



