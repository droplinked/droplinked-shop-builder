import "./Shop-page-style.scss"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { getShopInfoByShopname } from "../../api/Public-apis/Shop-api"
import { getCollectionsByShopname } from "../../api/Public-apis/Collection-api"

import Loading from "../../components/shared/loading/Loading"
import Collection from "../../components/shared/Collection/collection-component"
import TopSection from "../../components/shared/TopSection/TopSection"


export default function ShopPage() {

    const [profile, setProfile] = useState(null)
    const [collection, setCollections] = useState(null)

    let { shopname } = useParams();


    useEffect(() => {

        const getData = async(shop) => {
         let shopinfo = await getShopInfoByShopname(shop)
         let collections = await getCollectionsByShopname(shop)
         setProfile(shopinfo)
         setCollections(collections)
        }

        getData(shopname)
        
    }, [])


    return (<>
        {(profile == null) ?
            <Loading />
            :
            <TopSection
                pic={profile.logo}
                shopname={profile.shopName}
                insta={(profile.instagramUrl) ? profile.instagramUrl : ""}
                twitter={(profile.twitterUrl) ? profile.twitterUrl : ""}
                discord={(profile.discordUrl) ? profile.discordUrl : ""}
                web={(profile.webUrl) ? profile.webUrl : ""}
            />
        }

        {(collection == null) ?
            <></>
            :
           <>
           {collection.collections.map((coll , i) => {
                return <Collection key={i} collection={coll} shopname={shopname} />
           })}
           </>
        }

    </>)
}