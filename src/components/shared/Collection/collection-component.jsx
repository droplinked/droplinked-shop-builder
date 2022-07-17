
import { Link } from "react-router-dom";

import Product from "../Product/Product"

export default function Collection({ collection , shopname}) {

    return (
        <>
            <div className="d-flex justify-content-center">
                <div className="collection-component-wrapper">
                    {/* head */}
                    <div className="d-flex justify-content-between h-auto" >
                        <p className="title">{collection.title}</p>
                        <Link to={`collection/${collection._id}`}>
                            <button className="seemore-btn">see more</button>
                        </Link>
                    </div>
                    {/* head */}
                    {/* content */}
                    <div className="mt-4 d-flex flex-wrap">
                        {collection.products.map((product, i) => {
                            if (i < 4) {
                                return (
                                    <div className="col-6 col-md-3 p-1" key={i}>
                                        <Product
                                            title={product.title}
                                            imageUrl={product.media[0].url}
                                            id={product._id}
                                            shopname={shopname}
                                        />
                                    </div>
                                )
                            }
                        })}
                    </div>
                    {/* content */}
                </div>
            </div>
        </>
    )
}