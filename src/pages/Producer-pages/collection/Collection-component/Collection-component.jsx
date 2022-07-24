import "./Collection-component-style.scss"

import editIcon from '../../../../assest/icon/icons8-edit.svg'
import deleteIcon from '../../../../assest/icon/icons8-delete.svg'
import SmallModal from "../../../../components/Modal/Small-modal/Small-modal-component"
import ModalContainer from "../../../../components/Modal/modal-container/modal-container"
import EditCollectionModal from "../edit-collection-modal/edit-collection-modal-component"
import Product from "../../../../components/shared/Product/Product"

import { useToasty } from "../../../../context/toastify/ToastContext"
import { deleteCollection } from "../../../../api/Producer-apis/Collection-api"
import { Link } from "react-router-dom"
import { useState } from "react"

export default function CollectionComponent({ id, name, productsArray, edit, render, editable }) {


    const [deleteModal, setDeleteModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const { errorToast, successToast } = useToasty();

    const submitEdit = () => {
    }

    const DeleteCollection = async () => {

        let result = await deleteCollection(id)
        if (result == true) {
            successToast("Collection deleted successfully")
            render()
        } else {
            errorToast(result)
        }
        setDeleteModal(false)
    }

    const toggleEdit = () => setEditModal(p => !p)

    return (<>
        <div className="Collection-wrapper-component">
            <div className="d-flex justify-content-between align-items-center h-auto">
                <div className="name">{name}</div>
                <Link to={`/collection/${id}`}>
                    <button className="collection-btn">View Collection</button>
                </Link>
            </div>
            {(productsArray.length == 0)
                ?
                <div className="d-flex">
                    <p className="text-align-center no-pro-text">No Product</p>
                </div>
                :
                <div className="mt-4 d-flex flex-wrap">
                    {productsArray.filter((product, i) => {
                        if (i < 4) { return product }
                    }).map((product, i) => {
                        return (<div key={i} className="col-6 col-md-3 p-1">
                            <Product title={product.title} imageUrl={product.media[0].url} id={product._id} />
                        </div>)
                    })
                    }
                </div>
            }

            {editable && <>
                <div className="d-flex justify-content-between align-items-center h-auto">
                    <img src={editIcon} onClick={edit} alt="icon" className="edit-img" style={{ cursor: "pointer" }} />
                    <img src={deleteIcon} onClick={() => setDeleteModal(true)} alt="icon" className="delete-img" style={{ cursor: "pointer" }} />
                </div>
            </>}


        </div>
        {deleteModal &&
            <SmallModal
                text={`Are you sure you want to  delete this collection?`}
                show={deleteModal}
                hide={() => setDeleteModal(false)}
                click={DeleteCollection}
            />
        }
        {editModal &&
            (<ModalContainer>
                <EditCollectionModal toggle={toggleEdit} submitFunc={submitEdit} />
            </ModalContainer>)
        }
    </>
    )
}