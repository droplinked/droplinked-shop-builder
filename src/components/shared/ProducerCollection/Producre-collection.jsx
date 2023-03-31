//import "./Producre-collection-style.scss";

import SmallModal from "../../../modals/small/SmallModal";
import Product from "../Product/Product";
import CollectionModal from "../../../modals/collection/CollectionModal";
import ProducerCollectionHeader from "./producer-collection-header/Producer-collection-header";
import RuleModal from "../../../modals/rule/RuleModal";
import AddProduct from "../AddProduct/Add-product-component";

import {
  ProducerCollectionWrapper,
  ProductsWrapper,
} from "./Producer-collection-style";
import { useToasty } from "../../../context/toastify/ToastContext";
import { deleteCollection } from "../../../api-service/collections/collectionApiService";
import { Box } from "@chakra-ui/react";
import { useApi } from "../../../hooks/useApi/useApi";
import { USER_TYPE } from "../../../constant/user-types";
import { useSelector } from "react-redux";
import {
  selectCurrentProfile,
} from "../../../store/profile/profile.selector";

import { useState } from "react";

const ProducerCollection = ({ collection, update }) => {

  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [ruleModal, setRuleModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const { errorToast, successToast } = useToasty();
  const { deleteApi } = useApi()
  const profile = useSelector(selectCurrentProfile);

  const clickOnDeleteCollection = async () => {
    setLoading(true);
    let result = await deleteApi(deleteCollection(collection._id))
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
          editOnclick={openEditModal}
          deleteOnclick={openDeleteModal}
          openRuleModal={openRuleModal}
        />
        <ProductsWrapper>
          {(!collection.products || collection.products.length == 0) ? (
            <Box w={{ base: "50%", lg: "25%" }}>
              <AddProduct />
            </Box>
          ) : (
            <>
              {collection.products
                .filter((product, i) => {
                  if (i < 4) return product;
                })
                .map((product, i) => {
                  if (product.type == "SHOPIFY") {
                    return (
                      <Box key={i} w={{ base: "50%", lg: "25%" }} p="3px">
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
                      </Box>
                    );
                  } else {
                    return (
                      <Box key={i} w={{ base: "50%", lg: "25%" }} p="3px">
                        <Product
                          shopname={profile.shopName}
                          title={product.title}
                          id={product._id}
                          imageUrl={product.media[0].url}
                          type={USER_TYPE.CUSTOMER}
                        />
                      </Box>
                    );
                  }
                })}
            </>
          )}
        </ProductsWrapper>
      </ProducerCollectionWrapper>

       {deleteModal && <SmallModal
          text={`Are you sure you want to  delete this collection?`}
          show={deleteModal}
          hide={() => setDeleteModal(false)}
          click={clickOnDeleteCollection}
          loading={loading}
          buttonText={"Delete"}
        />}


      <CollectionModal
        show={editModal}
        collection={collection}
        close={closeEditModal}
        update={update}
      />


        <RuleModal
        show={ruleModal}
          close={closeRuleModal}
          collectionId={collection._id}
          update={update}
          ruleId={collection.ruleSetID || undefined}
        />

    </>
  );
};

export default ProducerCollection;
