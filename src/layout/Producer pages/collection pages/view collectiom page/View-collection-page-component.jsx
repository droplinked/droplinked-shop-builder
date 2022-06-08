import "./View-collection-page-style.scss"
import "react-toastify/dist/ReactToastify.css";

import ProductLarge from "../../../../components/features/product components/product component large/ProductLarge"
import Loading from "../../../../components/features/loading/Loading";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { GetApiWithAuth } from "../../../../sevices/functoinal-service/CallApiService"
import { ToastContainer, toast } from 'react-toastify';

export default function ViewPageCollection() {

    let params = useParams().collectionId;
    const [Collection, setCollectin] = useState(null)

    useEffect(() => {
        GetApiWithAuth(`/producer/collection/${params}?withProducts=true`, setCollectin, "collection", errorHandel)
    }, [])

    const errorHandel = (e) => {
        toast.error(e);
    }

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
                                    <ProductLarge title={product.title} imageUrl={product.media[0].url} id={product._id} />
                                </div>
                            )
                        })}
                    </div>
                </>
                :
                <Loading />
            }
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='dark'
            />
        </div>
    </>)
}