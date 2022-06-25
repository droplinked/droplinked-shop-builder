import "./shop-page-style.scss"

import { useState, useEffect } from "react"
import { BasicURL } from "../../../sevices/functoinal-service/CallApiService"
import { useParams } from "react-router-dom"
import { useCart } from "../../../sevices/hooks/useCart"

import axios from "axios"
import Loading from "../../../components/features/loading/Loading"
import ProducerTopSection from "../../../components/producer component/producer top section/Producer-top-section"
import Collection from "../../../components/collection component/collection-component"

export default function ShopPage() {

    const [profile, setProfile] = useState(null)
    const [collection, setCollections] = useState(null)

    let { shopname } = useParams();
    const { updateCart } = useCart()


    useEffect(() => {

        let url1 = BasicURL + `/shopinfo/${shopname}`
        let url2 = BasicURL + `/collections/${shopname}`

        const requestOne = axios.get(url1);
        const requestTwo = axios.get(url2);

        axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => {
            const responseOne = responses[0]
            const responseTwo = responses[1]
            setProfile(responseOne.data.data);
            setCollections(responseTwo.data.data);
        })).catch(errors => {
            console.log(errors.response);
        })
        
        updateCart(shopname)
    }, [])


    return (<>
        {(profile == null) ?
            <Loading />
            :
            <ProducerTopSection
                pic={profile.shopLogo}
                shopname={profile.shopName}
                insta={(profile.instagram) ? profile.instagram : ""}
                twitter={(profile.twitter) ? profile.twitter : ""}
                discord={(profile.discord) ? profile.discord : ""}
                web={(profile.web) ? profile.web : ""}
            />
        }

        {(collection == null) ?
            <></>
            :
           <>
           {collection.collections.map((coll , i) => {
                return <Collection collection={coll} shopname={shopname} />
           })}
           </>
        }

    </>)
}