import "./Shop-page-style.scss"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom";
import { useProfile } from "../../../../sevices/hooks/useProfile"
import { BasicURL } from "../../../../sevices/functoinal-service/CallApiService"
import { useToasty } from "../../../../sevices/hooks/useToastify"

import ProducerTopSection from "../../../../components/producer component/producer top section/Producer-top-section"
import Loading from "../../../../components/features/loading/Loading"
import axios from "axios"
import CollectionWrapper from "../../../../components/features/collection wrapper/Collection-wrapper-component";


export default function ShopPage() {

    const [collections, setCollections] = useState(null);
    const { profile } = useProfile();
    const { successToast, errorToast } = useToasty();
    const token = JSON.parse(localStorage.getItem('token'));


    // get collections 
    useEffect(() => {
        axios.get(BasicURL + `/producer/collection?withProducts=true`,
            { headers: { Authorization: 'Bearer ' + token } })
            .then(e => {
                setCollections(e.data.data.collections)
            })
            .catch(e => errorToast(e.response.data.reason))
    }, [])

    return (
        <div className="d-flex flex-column justify-content-center align-items-center shop-page-wrapper">
            <ProducerTopSection
                pic={profile.shopLogo}
                shopname={profile.shopName}
                insta={profile.instagram}
                twitter={profile.twitter}
                discord={profile.discord}
                web={profile.web}
            />
            {(collections == null) // before get collection
                ?
                <Loading />
                :
                <>
                    {(collections.length == 0)
                        ? // if collection is empty
                        <div className="w-100">
                            <p className="no-collection">No collection</p>
                        </div>
                        : // show collection
                        <>
                            {collections.map((collection, i) => {
                                return (
                                    <div key={i} className="mt-4 col-lg-6 col-md-10 col-12 ">
                                        <CollectionWrapper
                                            id={collection._id}
                                            name={collection.title}
                                            productsArray={collection.products}
                                        />
                                    </div>
                                )
                            })}
                        </>
                    }
                </>
            }
        </div>
    )
}