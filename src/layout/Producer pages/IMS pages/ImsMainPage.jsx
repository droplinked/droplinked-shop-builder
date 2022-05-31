import "./ImsMainPage.scss"
import BasicButton from "../../../components/features/buttons components/basic button/BasicButton"
import SeachBox from "../../../components/features/search box/Search-box-component"
import ProductSmallWrapper from "../../../components/features/product components/product small wrapper/Product-Small-wrapper"
import productImage from "./productimg.jpg"
import ProductLarge from "../../../components/features/product components/product component large/ProductLarge"
import axios from "axios"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import Loading from "../../../components/features/loading/Loading"
// import { useProfile } from "../../../sevices/hooks/useProfile"


function ImsMainPage() {
    const [products, setProdcuts] = useState(null)
    const [searchText, setSearchText] = useState("")
    const token = JSON.parse(localStorage.getItem('token'));

    useEffect(() => {
        axios.get(`https://api.droplinked.com/dev/producer/product`,
            { headers: { Authorization: 'Bearer ' + token } })
            .then(e => setProdcuts(e.data.products))
            .catch(e => console.log(e))
    }, [])

    if(products) console.log(products);
   

    // const prdocuts = [
    //     {
    //         price: "12 $",
    //         title: "aaproduct",
    //         imageUrl: productImage,
    //         id: "1"
    //     },
    //     {
    //         price: "12 $",
    //         title: "bbproduct",
    //         imageUrl: productImage,
    //         id: "2"
    //     },
    //     {
    //         price: "12 $",
    //         title: "ccproduct",
    //         imageUrl: productImage,
    //         id: "3"
    //     },
    //     {
    //         price: "12 $",
    //         title: "aproduct",
    //         imageUrl: productImage,
    //         id: "4"
    //     },
    //     {
    //         price: "12 $",
    //         title: "nnproduct",
    //         imageUrl: productImage,
    //         id: "5"
    //     },
    //     {
    //         price: "12 $",
    //         title: "bbproduct",
    //         imageUrl: productImage,
    //         id: "6"
    //     },
    //     {
    //         price: "12 $",
    //         title: "aaproduct",
    //         imageUrl: productImage,
    //         id: "7"
    //     }
    // ]

    return (<>
        <div className="IMS-page-wrapper">
            <div className="ims-title">Merchs</div>
            <div className="number-of-merchs">{(products!= undefined)?products.length:'0'} Merchs</div>
            <div className="w-100 d-flex justify-content-center align-items-center mt-5">
                <Link to="/producer/addProduct" style={{ width: "100%", display: "flex" }}>
                    <BasicButton text={"Add merchs"} />
                </Link>
            </div>
            <div style={{ margin: "15px 0xp" }}>
                <SeachBox />
            </div>
            <ProductSmallWrapper>
                {products
                    ?
                    <>{(products.length <= 0)
                        ?
                        <div className="w-100 d-flex justify-content-center align-items-center">
                            <p className="no-product">no merch</p>
                        </div>
                        :
                        <>
                            {(products).map((item) => {
                                return (
                                    <div className="col-6 col-md-4 col-lg-3" id={item.id}>
                                        <ProductLarge  title={item.title} imageUrl={item.media[0].url} />
                                    </div>
                                )
                            })}
                        </>
                    }

                    </>
                    :
                    <Loading />
                }

            </ProductSmallWrapper>

        </div>
    </>)
}

export default ImsMainPage