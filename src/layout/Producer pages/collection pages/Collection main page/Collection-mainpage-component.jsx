import "./Collection-mainpage-style.scss"
import { useState } from "react"
import AutoWidthButton from "../../../../components/features/buttons components/autow basic button/B-button-component"
import CollectionWrapper from "../../../../components/features/collection wrapper/Collection-wrapper-component"
import BadicModal from "../../../../components/Modal/basic modal component/Basic-modal-component"
import AddCollectionPage from "../add collection page/Add-collection-component"
import { Link } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
export default function CollectionMainPage({ name }) {

    const [Modal, setModal] = useState(false)

    const ToggleModal = () => {
        setModal(p => !p)
    }

    const PostCollection = ( status , text ) => {
        if(status){
            toast.success("Collection was created successfully");
        }else{
            toast.error(text);
        }       
        ToggleModal()
    }

    return (<>
        <div className="Collection-page-wrapper">
            <div className="ims-title">Collections</div>
            <div className="number-of-merchs">2 Collection</div>
            <div className="mt-5 col-12 col-md-3 ">
                {/* <Link to="/producer/collection/addCollection"> */}
                <AutoWidthButton text={"Add Collection"} click={ToggleModal} />
                {/* </Link> */}
            </div>
            <div className="mt-5 col-lg-6 col-md-10 col-12 ">
                <CollectionWrapper name={"collection 1"} />
            </div>
            <div className="mt-5 col-lg-6 col-md-10 col-12 ">
                <CollectionWrapper name={"collection 2"} />
            </div>
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