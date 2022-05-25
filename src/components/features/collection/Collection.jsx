import "./Collection.scss"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import axios from 'axios';
import Loading from "../loading/Loading"
import ProductLarge from "../product components/product component large/ProductLarge"


function Collection() {

    const [product, setProduct] = useState(null)

    useEffect(() => {
        axios.post('https://r4qwnd5837.execute-api.us-west-2.amazonaws.com/v1/search',
            {
                page: 1,
                shop_domain: "crashpunks-gear.myshopify.com",
                keyword: ""
            }).then((response) => {
                let x = response.data.shopify.map((item) => { return item.product_listing })
                setProduct(x)
            });
    }, [])

    return (<>
        <div className="d-flex justify-content-center">
            <div className="collection-component-wrapper">
                {/* head */}
                <div className="d-flex justify-content-between h-auto" >
                    <p className="title">Holder merch</p>
                    <Link to="/productList">
                        <button className="seemore-btn">see more</button>
                    </Link>
                </div>
                {/* head */}
                {/* content */}
                <div className="product-contant mt-4">
                    {(product == null)
                        ?
                        <div className="w-100">
                            <Loading />
                        </div>
                        :
                        <>
                            {product.map((item) => {
                                return (<div className="product-item-content">
                                    <ProductLarge title={item.title} price={item.variants[0].formatted_price} imageUrl={item.images[0].src} id={item.product_id} />
                                </div>)
                            })}
                        </>
                    }
                </div>
                {/* content */}
            </div>
        </div>
    </>)
}

export default Collection