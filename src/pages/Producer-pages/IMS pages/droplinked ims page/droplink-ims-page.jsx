import "./droplink-ims-page.scss"

import BasicButton from "../../../../components/shared/BasicButton/BasicButton"
import SeachBox from "../search box/Search-box-component"
import ProductSmallWrapper from "../../../../components/features/product components/product small wrapper/Product-Small-wrapper"
import ProductLargeProducer from "../../../../components/features/product components/Product Large component producer/ProductLarge-producer"
import { useState } from "react"
import { Link } from "react-router-dom";


export default function DroplinkedImsPage({ products }) {

    const [searchText, setSearchText] = useState("")

    const onChangeSearchBox = (e) => {
        setSearchText(e.target.value.toLowerCase())
    }

    return (
        <>
            <div className="w-100 d-flex justify-content-center align-items-center mt-5">
                <Link to="/producer/addProduct" style={{ width: "200px", display: "flex" }}>
                    <BasicButton>Add merch</BasicButton>
                </Link>
            </div>
            <div style={{ margin: "15px 0xp" }}>
                <SeachBox onch={onChangeSearchBox} />
            </div>
            <ProductSmallWrapper>
                {(products.length <= 0)
                    ?
                    <div className="w-100 d-flex justify-content-center align-items-center">
                        <p className="no-product"></p>
                    </div>
                    :
                    <>
                        {(products).filter(pr => pr.title.toLowerCase().includes(searchText)).map((item) => {
                            return (
                                <div className="col-6 col-md-4 col-lg-3 p-1" key={item.id}>
                                    <ProductLargeProducer title={item.title} imageUrl={item.media[0].url} id={item._id} />
                                </div>
                            )
                        })}
                    </>
                }
            </ProductSmallWrapper>
        </>

    )
}