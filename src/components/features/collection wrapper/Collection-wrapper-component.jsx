import "./Collection-wrapper-style.scss"
import ProductLarge from "../product components/product component large/ProductLarge"
import productImg from "./productIms.png"

export default function CollectionWrapper({ name }) {

    return (
        <div className="Collection-wrapper-component">
            <div className="d-flex justify-content-between align-items-center h-auto">
                <div className="name">{name}</div>
                <button className="collection-btn">View Collection</button>
            </div>
            <div className=" mt-4 d-flex flex-wrap">
                <div className="col-6 col-md-3 p-1">
                    <ProductLarge title={"product"} price={"100$"} imageUrl={productImg} id={0} />
                </div>
                <div className="col-6 col-md-3 p-1">
                    <ProductLarge title={"product"} price={"100$"} imageUrl={productImg} id={1} />
                </div>
                <div className="col-6 col-md-3 p-1">
                    <ProductLarge title={"product"} price={"100$"} imageUrl={productImg} id={2} />
                </div>
                <div className="col-6 col-md-3 p-1">
                    <ProductLarge title={"product"} price={"100$"} imageUrl={productImg} id={3} />
                </div>
            </div>
        </div>
    )
}