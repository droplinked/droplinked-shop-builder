import "./Shop-page-style.scss"
import axios from "axios"
import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom";
import { useProfile } from "../../../../sevices/hooks/useProfile"
import ProducerTopSection from "../../../../components/producer component/producer top section/Producer-top-section"
import ProductSmallWrapper from "../../../../components/features/product components/product small wrapper/Product-Small-wrapper";
import ProductLarge from "../../../../components/features/product components/product component large/ProductLarge"
import Loading from "../../../../components/features/loading/Loading"
import AutoWidthButton from "../../../../components/features/buttons components/autow basic button/B-button-component"

export default function ShopPage() {
    const [products, setProdcuts] = useState([]);
    const { profile } = useProfile();
    let { shopname } = useParams();

    const token = JSON.parse(localStorage.getItem('token'));

    useEffect(() => {
        axios.get(`https://api.droplinked.com/dev/producer/product`,
            { headers: { Authorization: 'Bearer ' + token } })
            .then(e => {
                setProdcuts(e.data.data.products)
            })
            .catch(e => console.log(e))
    }, [])



    return (<div className="d-flex flex-column justify-content-center align-items-center">

        <ProducerTopSection
            pic={profile.shopLogo}
            shopname={profile.shopName}
            insta={profile.instagram}
            twitter={profile.twitter}
            discord={profile.discord}
            web={profile.web} />

        <ProductSmallWrapper>
            {products
                ?
                <>{(products.length <= 0)
                    ?
                    <div className="w-100 d-flex justify-content-center align-items-center">
                        <div className="col-12 col-md-6">
                            <Link to="/producer/addProduct">
                                <AutoWidthButton text={"Add Product"} />
                            </Link>
                        </div>
                    </div>
                    :
                    <>
                        {(products).map((item) => {
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

    </div>)
}