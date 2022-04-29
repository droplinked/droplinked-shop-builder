import "./ProctuPageTest.scss"
import { useState, useEffect } from "react"
import axios from 'axios';
import ProfileTopic from "../../components/features/top section/ProfileTopSection"
import Loading from "../../components/features/loading/Loading"
import Product from "../../components/features/product/Product"

function ProctuPageTest() {
    const [product, setProduct] = useState(null)
    useEffect(() => {
        axios.post('https://r4qwnd5837.execute-api.us-west-2.amazonaws.com/v1/search',
            {
                keyword: 'tshirt',
                page: 1,
            }).then((response) => {
                console.log(response.data.shopify);
                let x = response.data.shopify.map((item) => { return item.product_listing })
                setProduct(x)
            });
    }, [])



    return (<>
        <ProfileTopic />

        <div className="row w-100 d-flex justify-content-center mt-5">


            {(product == null)
                ?
                <div className="col-md-8 col-12 h-auto product-list-wrap justify-content-center" >
                    <Loading />
                </div>
                :
                <div className="col-md-8 col-12 h-auto product-list-wrap" >
                    <h1>x</h1>
                    {product.map((item) => {
                        return <Product title={item.title} price={item.variants[0].formatted_price} imageUrl={item.images[0].src} id={item.product_id} />
                    })}
                </div>
            }

        </div>
    </>)
}

export default ProctuPageTest