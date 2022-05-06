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
        <div className="col-6 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center h-auto p-1">
            <div className="product-wrap mt-3" >

                {/* {(profile == null)
                    ?
                    <Link to={`/`}>
                        <div className="product-image-wrap"
                            onMouseLeave={() => setViewBtn(false)}
                            onMouseEnter={() => setViewBtn(true)}

                        >
                           <img className="product-save-btn" src={savebtn} alt="" /> 
                            <div className="ratio ratio-1x1">
                                <img className={`main-img ${(viewBtn) ? "product-img-opacity" : ""}`} src={imageUrl} />
                            </div>
                            {viewBtn && <div className="product-view-btn"><p>View</p></div>}
                        </div>
                    </Link>

                    : */}
                <Link to={`/product/${id}`}>
                    <div className="product-image-wrap"
                        onMouseLeave={() => setViewBtn(false)}
                        onMouseEnter={() => setViewBtn(true)}

                    >
                        <img className="product-save-btn" src={savebtn} alt="" />
                        <div className="ratio ratio-1x1">
                            <img className={` main-img ${(viewBtn) ? "product-img-opacity" : ""}`} src={imageUrl} />
                        </div>
                        {viewBtn && <div className="product-view-btn"><p>View</p></div>}
                    </div>
                </Link>
                {/* } */}

                <div className="brand-name">{title}</div>
                <div className="priceS" dangerouslySetInnerHTML={{ __html: price }}></div>

            </div>
        </div>
    )
}

export default Product



