import { Link } from "react-router-dom"

export default function ProducerProduct({  title, imageUrl, id , shopname}){

    return (
        <div className="Lproduct-component-wrapper">
            <Link to={`/producer/Merch/${id}`}>
                <div className="product-image-st">
                    <div className="ratio ratio-1x1">
                        <img className={` main-image `} src={imageUrl} />
                    </div>
                    {/* {viewBtn && <div className="product-view-button"><p>View</p></div>} */}
                </div>
            </Link>
            <div className="brand-name">{title}</div>
        </div>
    )

}