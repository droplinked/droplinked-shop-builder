//import "./Producre-collection-style.scss";

import SmallModal from "../../Modal/Small-modal/Small-modal-component";
import Product from "../Product/Product";
import EditCollectionModal from "../../Modal/Edit-collection/Edit-collection-modal";
import ProducerCollectionHeader from "./producer-collection-header/Producer-collection-header";
import RuleModal from "./rule-collection-modal/Rule-modal";
import AddProduct from "../AddProduct/Add-product-component";

import { ProducerCollectionWrapper } from "./Producer-collection-style";
import { useToasty } from "../../../context/toastify/ToastContext";
import { useProfile } from "../../../context/profile/ProfileContext";
import { deleteCollection } from "../../../api/producer/Collection-api";
import { USER_TYPE } from "../../../constant/user-types";

import { useState } from "react";

const ProducerCollection = ({ collection, update }) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [ruleModal, setRuleModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const { errorToast, successToast } = useToasty();
  const { profile } = useProfile();

  const DeleteCollection = async () => {
    setLoading(true);
    let result = await deleteCollection(collection._id);
    if (result == true) {
      successToast("Collection deleted successfully");
      update();
    } else {
      errorToast(result);
    }
    setLoading(false);
    setDeleteModal(false);
  };

  const openEditModal = () => setEditModal(true);
  const closeEditModal = () => setEditModal(false);
  const openDeleteModal = () => setDeleteModal(true);
  const openRuleModal = () => setRuleModal(true);
  const closeRuleModal = () => setRuleModal(false);

  return (
    <>
      <ProducerCollectionWrapper>
        <ProducerCollectionHeader
          title={collection.title}
          collectionId={collection._id}
          shopName={profile.shopName}
          editOnclick={openEditModal}
          deleteOnclick={openDeleteModal}
          openRuleModal={openRuleModal}
        />
        {collection.products.length == 0 ? (
          <div className="mt-2 d-flex flex-wrap w-100">
            <div className="col-6 col-md-3 p-1">
              <AddProduct />
            </div>
          </div>
        ) : (
          <div className="mt-2 d-flex flex-wrap">
            {collection.products
              .filter((product, i) => {
                if (i < 4) return product;
              })
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
      </ProducerCollectionWrapper>
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
      {editModal && (
        <EditCollectionModal
          collection={collection}
          close={closeEditModal}
          update={update}
        />
      )}
      <RuleModal open={ruleModal} close={closeRuleModal} collectionId={collection._id}/>
    </>
  );
};

export default ProducerCollection;
