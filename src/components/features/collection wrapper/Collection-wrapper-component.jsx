import "./Collection-wrapper-style.scss"
import ProductLarge from "../product components/product component large/ProductLarge"
import productImg from "./productIms.png"
import { Link } from "react-router-dom"

export default function CollectionWrapper({ name, productsArray }) {
    console.log(productsArray);

    return (
        <div className="Collection-wrapper-component">
            <div className="d-flex justify-content-between align-items-center h-auto">
                <div className="name">{name}</div>
                <Link to="/collection/1">
                    <button className="collection-btn">View Collection</button>
                </Link>
            </div>
            {(productsArray.length == 0)
                ?
                <div className="d-flex">
                    <p className="text-align-center">No Product</p>
                </div>
                :
                <div className=" mt-4 d-flex flex-wrap">
                    {productsArray.filter((product, i) => {
                        if (i < 4) { return product }
                    }).map((product, i) => {
                      return(  <div key={i} className="col-6 col-md-3 p-1">
                            <ProductLarge title={product.title}  imageUrl={product.media[0].url} id={product._id} />
                        </div>)
                    })
                    }

                </div>

            }

        </div>
    )
}