import "./Collection.scss"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import axios from 'axios';
import Loading from "../../../components/shared/loading/Loading"
import ShopifyProductLarge from "../../../components/features/product components/shopify product component/shopify-product-component"


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

    return (
    <>
       <div className="d-flex justify-content-center">
            <div className="collection-component-wrapper">
             
                <div className="d-flex justify-content-between h-auto" >
                    <p className="title">Holder merch</p>
                    <Link to="/productList">
                        <button className="seemore-btn">see more</button>
                    </Link>
                </div>
          
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
                                    <ShopifyProductLarge title={item.title} price={item.variants[0].formatted_price} imageUrl={item.images[0].src} id={item.product_id} />
                                </div>)
                            })}
                        </>
                    }
                </div>
           
            </div>
        </div>
     
    </>)
}

export default Collection