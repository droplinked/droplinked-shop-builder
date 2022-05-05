import "./CollectionManagement.scss"
import { useState, useEffect } from "react"
import axios from 'axios';
import Product from "../../../components/features/product/Product";
import { useNavigate } from 'react-router-dom'
import AddCollectoin from "./add collection modal/AddCollection"

export default function CollectionManagement() {
    const navigate = useNavigate()
    const [modal, setModal] = useState(true)
    const [show, setShow] = useState(false)
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

    const closeModal = () =>{
        setModal(false)
    }
    return (
        <>
            <div className="collection-management-page">
                <div className="header-text">Collection management</div>
                {(true) ?
                    <div className="collection-wraper">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="collection-name">Collection name</div>
                            <div className="rule-name">collection's rule name</div>
                        </div>
                        <div className="row mt-2 mb-2">
                            {(product != null) &&
                                <>
                                    {product.map((item) => {
                                        return <Product title={item.title} price={item.variants[0].formatted_price} imageUrl={item.images[0].src} id={item.product_id} />
                                    })}
                                </>
                            }
                        </div>
                    </div>
                    :
                    <div className="collection-wraper">
                        <div className="text"> no collection</div>
                    </div>
                }

                <button className="add-btn"
                onClick={()=>{setModal(true)}}
                >+ add collection</button>
            </div>
            {(modal) && <AddCollectoin close={closeModal}/>}
        </>
    )
}