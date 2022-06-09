import "./Collection-wrapper-style.scss"

import ProductLarge from "../product components/product component large/ProductLarge"
import editIcon from '../../../assest/icon/icons8-edit.svg'
import deleteIcon from '../../../assest/icon/icons8-delete.svg'
import SmallModal from "../../Modal/little modal/Small-modal-component"
import { toastValue } from "../../../sevices/context/Toast-context"
import { DeleteWithToken } from "../../../sevices/functoinal-service/CallApiService"

import { Link } from "react-router-dom"
import { useState, useContext } from "react"

export default function CollectionWrapper({ id, name, productsArray, editClick, deleteClick , render }) {

    const [deleteModal, setDeleteModal] = useState(false)

    const { successToast, errorToast } = useContext(toastValue);

    const resHandler = (status, mess) => {
        if (status) {
            successToast("Collection deleted successfully")
            render()
        } else {
            errorToast(mess)
        }
        setDeleteModal(false)
    }

    const DeleteCollection = () => {
        DeleteWithToken(`/producer/collection/${id}`, resHandler)
    }



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
                    <p className="text-align-center">No Product</p>
                </div>
                :
                <div className=" mt-4 d-flex flex-wrap">
                    {productsArray.filter((product, i) => {
                        if (i < 4) { return product }
                    }).map((product, i) => {
                        return (<div key={i} className="col-6 col-md-3 p-1">
                            <ProductLarge title={product.title} imageUrl={product.media[0].url} id={product._id} />
                        </div>)
                    })
                    }
                </div>
            }

            <div className="d-flex justify-content-between align-items-center h-auto">
                <img src={editIcon} onClick={editClick} alt="icon" style={{ width: "28px", height: "28px", cursor: "pointer" }} />
                <img src={deleteIcon} onClick={() => setDeleteModal(true)} alt="icon" style={{ width: "32px", height: "32px", cursor: "pointer" }} />
            </div>

        </div>
        {deleteModal &&
            <SmallModal
                text={`Are you sure you want to  delete this collection?`}
                show={deleteModal}
                hide={() => setDeleteModal(false)}
                click={DeleteCollection}
            />
        }
    </>
    )
}