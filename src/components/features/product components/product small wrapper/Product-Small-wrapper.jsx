import "./Product-Small-wrapper.scss"
import productImage from "./productimg.jpg"
import ProductLarge from "../product component large/ProductLarge"

export default function ProductSmallWrapper({ children }) {
    return (
        <div className="product-small-wrapper">
            {children}
        </div>
    )
}