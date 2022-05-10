
import Product from "../../../components/features/product/Product"
import Loading from "../../../components/features/loading/Loading"
import { useState, useEffect } from "react"
import axios from 'axios';
import { Link } from "react-router-dom";

function CollectionDemo(props) {

    const [product, setProduct] = useState(null)
    useEffect(() => {
        axios.post('https://r4qwnd5837.execute-api.us-west-2.amazonaws.com/v1/search',
            {
                page: 1,
                shop_domain: "crashpunks-gear.myshopify.com",
                keyword: ""
            }).then((response) => {

                console.log(response.data.shopify);
                let x = response.data.shopify.filter((item) => { return item.meta.hash != 7543805411491 }).map((item) => { return item.product_listing })
                setProduct(x)
            });
    }, [])

    return (<>
        <div className="row  d-flex justify-content-center" style={{ padding: "0px 10px" }}>
            <div className="d-flex justify-content-center gr">
                <div className="col-12 col-sm-8 d-flex justify-content-center">
                    <div className="collection-wrapper ">
                        <div className="collection-child" >
                            <div className="header">
                                <div className="titleS"><p>{props.name}</p></div>
                                {(props.data)
                                    ?
                                    <>
                                        <Link to="/collectionpage">
                                            <button className="see-more d-flex"><p>See more</p></button>
                                        </Link>
                                    </>

                                    :
                                    <button className="see-more d-flex" disabled><p>See more</p></button>
                                }

                            </div>


                            <div className="collectio-products-wrapper row">
                                {(product != null)
                                    ? <>
                                        {(props.data)
                                            ?
                                            <>
                                                {product.map((item) => {
                                                    return <Product title={item.title} price={item.variants[0].formatted_price} imageUrl={item.images[0].src} id={item.product_id} />
                                                })}
                                            </>
                                            :
                                            <div className="d-flex justify-content-center"
                                                style={{ width: "100%", height: "100%", padding: "80px 0px" }}>
                                                <div className="empty-text">No Product to show</div>
                                            </div>
                                        }

                                    </>
                                    :
                                    <Loading />
                                }
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default CollectionDemo