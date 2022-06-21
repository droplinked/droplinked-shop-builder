import "./Shopify-merch-view-page-style.scss"

import axios from "axios"
import Loading from "../../../../components/features/loading/Loading"
import DropDownPairValId from "../../../../components/features/input components/dropdown pair val and id/Dropdonw-valId-component"

import { useState, useEffect } from "react"


export default function ShopifyMerchViewPage() {

    const [product, setProduct] = useState(null)

    useEffect(() => {
        axios.post('https://r4qwnd5837.execute-api.us-west-2.amazonaws.com/v1/search',
            {
                page: 1,
                shop_domain: "crashpunks-gear.myshopify.com",
                keyword: ""
            }).then((response) => {
                let x = response.data.shopify[0]
                setProduct(x)
            });
    }, [])

    console.log(product);

    const imageArray = [
        "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/1a3468d1313bdd6449891a374f58cecee6dc88b4057ddf147170b6e22f6f4b1c_st", , "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/1a3468d1313bdd6449891a374f58cecee6dc88b4057ddf147170b6e22f6f4b1c_st",
        "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/1a3468d1313bdd6449891a374f58cecee6dc88b4057ddf147170b6e22f6f4b1c_st", , "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/1a3468d1313bdd6449891a374f58cecee6dc88b4057ddf147170b6e22f6f4b1c_st",
        "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/1a3468d1313bdd6449891a374f58cecee6dc88b4057ddf147170b6e22f6f4b1c_st", , "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/1a3468d1313bdd6449891a374f58cecee6dc88b4057ddf147170b6e22f6f4b1c_st",
        "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/1a3468d1313bdd6449891a374f58cecee6dc88b4057ddf147170b6e22f6f4b1c_st", , "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/1a3468d1313bdd6449891a374f58cecee6dc88b4057ddf147170b6e22f6f4b1c_st",
    ]

    const hardCode = [{id: 1 , value :"collection 1"} , {id: 2 , value :"collection 12"}]

    return (<>
        <div className="shopify-merch-view-page-wrapper">
            {(product == null)
                ?
                <Loading />
                :
                <>
                    <div className="shopName">Shop name</div>
                    <div className="title">T-shirt crashpunks</div>
                    <div className="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, quisquam quibusdam ducimus quia deleniti soluta, nobis ea ad eaque nihil voluptatibus facilis cupiditate accusamus ipsa amet sunt qui consequatur id iusto. Eum, quibusdam. Quia tempore aliquam fugit deleniti vitae corporis atque cupiditate quae quidem earum libero non itaque doloribus et quibusdam provident, qui ad pariatur animi odit commodi quas enim. Qui, cum reiciendis? Qui voluptates amet veniam atque et deleniti reprehenderit eligendi ipsum sequi quasi natus culpa ullam rerum consectetur, accusantium iste! Alias blanditiis dolores obcaecati doloribus, vitae harum tempora culpa commodi nobis nostrum suscipit cum magnam, architecto temporibus molestias?</div>

                    <div 
                    style={{marginTop:"60px"}}
                    className="d-flex flex-wrap w-100">
                        {imageArray.map((image, i) => {
                            return (
                                <div  key={i} className="col-6 col-md-3 p-2">
                                    <img src={image} className="w-100 ratio ratio-1x1 "  />
                                </div>
                            )
                        })}

                    </div>

                    <div className="w-100 mt-5">
                        < DropDownPairValId pairArray={hardCode} value={"Collection"}/>
                    </div>
                </>
            }
        </div>
    </>)
}