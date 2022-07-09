import "./Producer-product-style.scss"

import {useState} from "react"
import { Link, useNavigate } from "react-router-dom";

export default function ProducerProductComponent({ image, title, id }) {

    const [viewBtn, setViewBtn] = useState(false)


    return (<>
        <div className="Lproduct-component-wrapper">
            <Link to={`/producer/Merch/${id}`}>
                <div className="product-image-st"
                    onMouseLeave={() => setViewBtn(false)}
                    onMouseEnter={() => setViewBtn(true)}>
                    {/* <img className="product-sve-btn" style={{width:"50px" , height:"50px"}} src={savebtn} alt="" /> */}
                    <div className="ratio ratio-1x1">
                        <img className={` main-image ${(viewBtn) ? "product-img-opacity" : ""}`} src={image} />
                    </div>
                    {viewBtn && <div className="product-view-button"><p>View</p></div>}
                </div>
            </Link>

            <div className="brand-name">{title}</div>
            {/* <div className="priceS" dangerouslySetInnerHTML={{ __html: price }}></div> */}
        </div>
    </>)
}