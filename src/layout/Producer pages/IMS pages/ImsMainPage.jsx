import "./ImsMainPage.scss"
import BasicButton from "../../../components/features/buttons components/basic button/BasicButton"
import SeachBox from "../../../components/features/search box/Search-box-component"
import ProductSmallWrapper from "../../../components/features/product components/product small wrapper/Product-Small-wrapper"
import productImage from "./productimg.jpg"
import ProductLarge from "../../../components/features/product components/product component large/ProductLarge"
import { useState } from "react"
import { Link } from "react-router-dom";


function ImsMainPage() {

    const [searchText, setSearchText] = useState("")

    const prdocuts = [
        {
            price: "12 $",
            title: "aaproduct",
            imageUrl: productImage,
            id: "1"
        },
        {
            price: "12 $",
            title: "bbproduct",
            imageUrl: productImage,
            id: "2"
        },
        {
            price: "12 $",
            title: "ccproduct",
            imageUrl: productImage,
            id: "3"
        },
        {
            price: "12 $",
            title: "aproduct",
            imageUrl: productImage,
            id: "4"
        },
        {
            price: "12 $",
            title: "nnproduct",
            imageUrl: productImage,
            id: "5"
        },
        {
            price: "12 $",
            title: "bbproduct",
            imageUrl: productImage,
            id: "6"
        },
        {
            price: "12 $",
            title: "aaproduct",
            imageUrl: productImage,
            id: "7"
        },
        {
            price: "12 $",
            title: "ccproduct",
            imageUrl: productImage,
            id: "8"
        },
        {
            price: "12 $",
            title: "aaproduct",
            imageUrl: productImage,
            id: "9"
        },
        {
            price: "12 $",
            title: "nnproduct",
            imageUrl: productImage,
            id: "10"
        },
        {
            price: "12 $",
            title: "bbproduct",
            imageUrl: productImage,
            id: "11"
        },
    ]

    return (<>
        <div className="IMS-page-wrapper">
            <div className="ims-title">Merchs</div>
            <div className="number-of-merchs">11 Merchs</div>
            <div className="w-100 d-flex justify-content-center align-items-center mt-5">
                <Link to="/producer/addProduct" style={{width:"100%" , display: "flex"}}>
                    <BasicButton text={"Add merchs"} />
                </Link>
            </div>
            <div style={{ margin: "15px 0xp" }}>
                <SeachBox />
            </div>
            <ProductSmallWrapper>
                {(prdocuts).map((item) => {
                    return (
                        <div className="col-6 col-md-4 col-lg-3" id={item.id}>
                            <ProductLarge price={item.price} title={item.title} imageUrl={item.imageUrl} />
                        </div>
                    )
                })}
            </ProductSmallWrapper>

        </div>
    </>)
}

export default ImsMainPage