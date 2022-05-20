import "./CollectionPage.scss"
import Product from "../../components/features/product/Product"
import { useState, useEffect } from "react"
import axios from 'axios'
import Loading from "../../components/features/loading/Loading"


function CollectionPage() {
    const [product, setProduct] = useState(null)

    useEffect(() => {
        axios.post('https://r4qwnd5837.execute-api.us-west-2.amazonaws.com/v1/search',
            {
                page: 1,
                shop_domain: "crashpunks-gear.myshopify.com",
                keyword: ""
            }).then((response) => {
                console.log(response.data.shopify);
                let x = response.data.shopify.map((item) => { return item.product_listing })
                setProduct(x)
            });
    }, [])

    return (<>
        <div className="row d-flex justify-content-center " style={{ padding: "0px 12px" }}>
            <div className="gr d-flex justify-content-center">


                <div className="col-12 col-md-8 d-flex justify-content-center ">
                    <div className="products-wrap">
                        <div className="h-auto d-flex flex-column justify-content-center">
                            <div className="colection-title">Holder merch</div>
                            <div className="product-counter">2 Products</div>
                        </div>
                        <div className="wrap">
                            <div className=" row">
                                {(product == null)
                                    ?
                                    <Loading />
                                    :
                                    <>
                                        {product.map((item) => {
                                            return <Product title={item.title} price={item.variants[0].formatted_price} imageUrl={item.images[0].src} id={item.product_id} />
                                        })}
                                    </>
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </>)
}



export default CollectionPage