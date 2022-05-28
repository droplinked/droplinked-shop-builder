import "./Product-Small-wrapper.scss"
import productImage from "./productimg.jpg"
import ProductLarge from "../product component large/ProductLarge"

export default function ProductSmallWrapper({ children }) {
    return (
        <div className="product-small-wrapper">

            <div className="product-item col-6 col-md-4 col-lg-3">
                <ProductLarge price={12} title={"product"} imageUrl={productImage} id={1} />
            </div>
            <div className="product-item col-6 col-md-4 col-lg-3">
                <ProductLarge price={12} title={"product"} imageUrl={productImage} id={1} />
            </div>
            <div className="product-item col-6 col-md-4 col-lg-3">
                <ProductLarge price={12} title={"product"} imageUrl={productImage} id={1} />
            </div>
            <div className="product-item col-6 col-md-4 col-lg-3">
                <ProductLarge price={12} title={"product"} imageUrl={productImage} id={1} />
            </div>
            <div className="product-item col-6 col-md-4 col-lg-3">
                <ProductLarge price={12} title={"product"} imageUrl={productImage} id={1} />
            </div>
            <div className="product-item col-6 col-md-4 col-lg-3">
                <ProductLarge price={12} title={"product"} imageUrl={productImage} id={1} />
            </div>
            <div className="product-item col-6 col-md-4 col-lg-3">
                <ProductLarge price={12} title={"product"} imageUrl={productImage} id={1} />
            </div>
            <div className="product-item col-6 col-md-4 col-lg-3">
                <ProductLarge price={12} title={"product"} imageUrl={productImage} id={1} />
            </div>
            <div className="product-item col-6 col-md-4 col-lg-3">
                <ProductLarge price={12} title={"product"} imageUrl={productImage} id={1} />
            </div>
            <div className="product-item col-6 col-md-4 col-lg-3">
                <ProductLarge price={12} title={"product"} imageUrl={productImage} id={1} />
            </div>
            <div className="product-item col-6 col-md-4 col-lg-3">
                <ProductLarge price={12} title={"product"} imageUrl={productImage} id={1} />
            </div>

        </div>
    )
}