import "./Producre-collection-style.scss";

import SmallModal from "../../Modal/Small-modal/Small-modal-component";
import ModalContainer from "../../Modal/modal-container/modal-container";

import EditCollectionModal from "../../../pages/Producer-pages/collection/edit-collection-modal/edit-collection-modal-component";
import Product from "../Product/Product";

import { useToasty } from "../../../context/toastify/ToastContext";
import { useProfile } from "../../../context/profile/ProfileContext";
import { deleteCollection } from "../../../api/producer/Collection-api";
import { USER_TYPE } from "../../../constant/user-types";
import { Link } from "react-router-dom";
import { useState } from "react";

const ProducerCollection = ({title , id , products ,update ,type ,edit}) => {

    const [deleteModal, setDeleteModal] = useState(false);
    //const [editModal, setEditModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const { errorToast, successToast } = useToasty();
    const { profile } = useProfile();
  
   // const submitEdit = () => {};
  
    const DeleteCollection = async () => {
      setLoading(true);
      let result = await deleteCollection(id);
      if (result == true) {
        successToast("Collection deleted successfully");
        update();
      } else {
        errorToast(result);
      }
      setLoading(false);
      setDeleteModal(false);
    };
  
   // const toggleEdit = () => setEditModal((p) => !p);
  
    return (
      <>
        <div className="Collection-wrapper-component">
          <div className="d-flex justify-content-between align-items-center h-auto">
            <div className="name">{title}</div>
            <Link to={`/${profile.shopName}/collection/${id}`}>
              <button className="collection-btn">View collection</button>
            </Link>
          </div>
          {products.length == 0 ? (
            <div className="d-flex">
              <p className="text-align-center no-pro-text">Empty</p>
            </div>
          ) : (
            <div className="mt-2 d-flex flex-wrap">
              {products
                .filter((product, i) => { if (i < 4)  return product;})
                .map((product, i) => {
                  if (product.type == "SHOPIFY") {
                    return (
                      <div key={i} className="col-6 col-md-3 p-1">
                        <Product
                          shopname={profile.shopName}
                          title={product.shopifyData.title}
                          id={product._id}
                          imageUrl={
                            product.shopifyData.images.length > 0 &&
                            product.shopifyData.images[0].src
                          }
                          type={USER_TYPE.CUSTOMER}
                        />
                      </div>
                    );
                  } else {
                    return (
                      <div key={i} className="col-6 col-md-3 p-1">
                        <Product
                          shopname={profile.shopName}
                          title={product.title}
                          id={product._id}
                          imageUrl={product.media[0].url}
                          type={USER_TYPE.CUSTOMER}
                        />
                      </div>
                    );
                  }
                })}
            </div>
          )}
  
          {type != "DEFAULT_PUBLIC" && (
            <>
              <div className="d-flex justify-content-between align-items-center h-auto">
                <p
                  className="collection-delete-img"
                  onClick={() => setDeleteModal(true)}
                >
                  Delete
                </p>
                <p className="collection-edit-btn" onClick={edit}>
                  Edit
                </p>
              </div>
            </>
          )}
        </div>
         {deleteModal && (
          <SmallModal
            text={`Are you sure you want to  delete this collection?`}
            show={deleteModal}
            hide={() => setDeleteModal(false)}
            click={DeleteCollection}
            loading={loading}
            buttonText={"Delete"}
          />
        )}
      {/*  {editModal && (
          <ModalContainer>
            <EditCollectionModal toggle={toggleEdit} submitFunc={submitEdit} />
          </ModalContainer>
        )} */}
      </>
    );
}

export default ProducerCollection