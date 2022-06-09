import "./Collection-mainpage-style.scss"
import "react-toastify/dist/ReactToastify.css";

import AutoWidthButton from "../../../../components/features/buttons components/autow basic button/B-button-component"
import CollectionWrapper from "../../../../components/features/collection wrapper/Collection-wrapper-component"
import BadicModal from "../../../../components/Modal/basic modal component/Basic-modal-component"
import AddCollectionPage from "../add collection page/Add-collection-component"
import Loading from "../../../../components/features/loading/Loading"

import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react"
import { toastValue } from "../../../../sevices/context/Toast-context"
import { ToastContainer, toast } from 'react-toastify';
import { GetApiWithAuth, DeleteWithToken } from "../../../../sevices/functoinal-service/CallApiService"

export default function CollectionMainPage({ name }) {

    const [Modal, setModal] = useState(false)
    const [collectins, setCollections] = useState(null);
    const [ren, setRen] = useState(false)
 

    const navigate = useNavigate();

    const token = JSON.parse(localStorage.getItem('token'));

  
    useEffect(() => {
        if (token == null) { navigate("/") }
        GetApiWithAuth("/producer/collection?withProducts=true", setCollections, "collections", errorHandle);
    }, [Modal , ren])

    const ToggleModal = () => setModal(p => !p)
    const errorHandle = (e) => toast.error(e)

    const PostCollection = (status, text) => {
        if (status) {
            toast.success("Collection was created successfully");

        } else {
            toast.error(text);
        }
        ToggleModal()
    }


    const renFunc = () => setRen(p => !p)
   


    return (<>
        <div className="Collection-page-wrapper">
            <div className="ims-title">Collections</div>
            <div className="number-of-merchs">{collectins && collectins.length} Collection</div>
            <div className="mt-5 col-12 col-md-3 ">
                {/* <Link to="/producer/collection/addCollection"> */}
                <AutoWidthButton text={"Add Collection"} click={ToggleModal} />
                {/* </Link> */}
            </div>

            {(collectins)
                ?
                <>
                    {(collectins.length <= 0)
                        ?
                        <div className="mt-5 col-lg-6 col-md-10 col-12 ">
                            <p className="no-collection-text">No Collection</p>
                        </div>
                        :
                        <>
                            {collectins.map((col, i) => {
                                return (
                                    <div key={i} className="mt-5 col-lg-6 col-md-10 col-12 ">
                                        <CollectionWrapper id={col._id} name={col.title} productsArray={col.products} render={renFunc} />
                                    </div>
                                )
                            })
                            }
                        </>
                    }
                </>
                :
                <Loading />
            }
        </div>
        {Modal &&
            (<BadicModal>
                <AddCollectionPage toggle={ToggleModal} submitFunc={PostCollection} />
            </BadicModal>)
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
    </>)
}