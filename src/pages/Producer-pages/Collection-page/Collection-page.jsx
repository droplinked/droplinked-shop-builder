import "./Collection-page-style.scss"

import AutoWidthButton from "../../../components/features/buttons components/autow basic button/B-button-component"
import CollectionComponent from "./Collection-component/Collection-component"
import ModalContainer from "../../../components/Modal/modal-container/modal-container"
import AddCollectionPage from "./add collection page/Add-collection-component"
import Loading from "../../../components/shared/loading/Loading"
import EditCollectionModal from "./edit collection modal/edit-collection-modal-component"

import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react"
import { getCollections } from "../../../api/Producer-apis/Collection-api"


export default function CollectionMainPage() {
    const navigate = useNavigate();

    const [Modal, setModal] = useState(false)
    const [EditModal, setEditModal] = useState(false)
    const [collectins, setCollections] = useState(null);
    const [ren, setRen] = useState(false)
    const editRef = useRef(null)

    const token = JSON.parse(localStorage.getItem('token'));

    if (token == null) { navigate("/") }


    const updateCollections = async () => {
        let collections = await getCollections()
        if (collections != null) setCollections(collections)
    }

    useEffect(() => {
        updateCollections()
    }, [Modal, ren])

    const ToggleModal = () => setModal(p => !p)


    const renFunc = () => setRen(p => !p)

    const ToggleeditCollection = (coll) => {
        editRef.current = (coll)
        setEditModal(true)
    }

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
                                        <CollectionComponent
                                            id={col._id}
                                            name={col.title}
                                            productsArray={col.products}
                                            edit={() => { ToggleeditCollection(col) }}
                                            render={renFunc}
                                            editable={true}
                                        />
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
            (<ModalContainer>
                <AddCollectionPage toggle={ToggleModal}  />
            </ModalContainer>)
        }
        {EditModal &&
            (<ModalContainer>
                <EditCollectionModal toggle={() => { setEditModal(false); renFunc() }} submitFunc={updateCollections} defaultValue={editRef.current} />
            </ModalContainer>)
        }
    </>)
}