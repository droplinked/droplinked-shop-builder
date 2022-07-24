import "./Collection-page-style.scss"
import "react-toastify/dist/ReactToastify.css";

import Loading from "../../components/shared/loading/Loading";
import Product from "../../components/shared/Product/Product";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCollectionById } from "../../api/public/Collection-api"

export default function CollectionPage() {
  
    const [Collection, setCollectin] = useState(null)

    const {collectionId , shopname} = useParams()

    useEffect(() => {

        const getCollection =  async(id) =>{
            let coll = await getCollectionById(id)
            setCollectin(coll)
        }
        getCollection(collectionId)

    }, [])

    return (<>
        <div className="view-collcetion-page-wrapper">
            {(Collection)
                ?
                <>
                    <div className="title">{Collection.title}</div>
                    <div className=" mt-5 d-flex flex-wrap">
                        {Collection.products.map((product, i) => {
                            return (
                                <div key={i} className="col-6 col-md-3 p-1">
                                    <Product shopname={shopname} title={product.title} imageUrl={product.media[0].url} id={product._id} />
                                </div>
                            )
                        })}
                    </div>
                </>
                :
                <Loading />
            }
        </div>
    </>)
}