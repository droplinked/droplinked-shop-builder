import "./ImsMainPage.scss"
import BasicButton from "../../../components/features/buttons components/basic button/BasicButton"
import SeachBox from "../../../components/features/search box/Search-box-component"
import ProductSmallWrapper from "../../../components/features/product components/product small wrapper/Product-Small-wrapper"
import ProductLarge from "../../../components/features/product components/product component large/ProductLarge"
import axios from "axios"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import Loading from "../../../components/features/loading/Loading"


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


    const onChangeSearchBox = (e) => {
        setSearchText(e.target.value)
    }


    return (<>
        <div className="IMS-page-wrapper">
            <div className="ims-title">Merchs</div>
            <div className="number-of-merchs">{(products != undefined) ? products.length : '0'} Merchs</div>
            <div className="w-100 d-flex justify-content-center align-items-center mt-5">
                <Link to="/producer/addProduct" style={{ width: "100%", display: "flex" }}>
                    <BasicButton text={"Add merchs"} />
                </Link>
            </div>
            <div style={{ margin: "15px 0xp" }}>
                <SeachBox onch={onChangeSearchBox} />
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
                            {(products).filter(pr => pr.title.includes(searchText)).map((item) => {
                                return (
                                    <div className="col-6 col-md-4 col-lg-3" id={item.id}>
                                        <ProductLarge title={item.title} imageUrl={item.media[0].url} />
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