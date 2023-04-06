import { useSelector } from "react-redux";
import { Box } from "@chakra-ui/react";
import { useState } from "react";

import {
  ProducerCollectionWrapper,
  ProductsWrapper,
} from "./CollectionComponent-style";
import { useToasty } from "../../../../../context/toastify/ToastContext";
import { deleteCollection } from "../../../../../apis/collectionApiService";
import { useApi } from "../../../../../hooks/useApi/useApi";
import { USER_TYPE } from "../../../../../constant/user-types";
import { selectCurrentProfile } from "../../../../../store/profile/profile.selector";

import SmallModal from "../../../../../modals/small-modal/SmallModal";
import ProductComponent from "../../../../../components/shared/product-component/ProductComponent";
import CollectionModal from "../../../../../modals/collection-modal/CollectionModal";
import CollectionHeaderComponent from "./CollectionHeaderComponent";
import RuleModal from "../../../../../modals/rule-modal/RuleModal";
import AddProductComponent from "../add-product-component/AddProductComponent";

const CollectionComponent = ({ collection, update }) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [ruleModal, setRuleModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const { errorToast, successToast } = useToasty();
  const { deleteApi } = useApi();
  const profile = useSelector(selectCurrentProfile);

  const clickOnDeleteCollection = async () => {
    setLoading(true);
    let result = await deleteApi(deleteCollection(collection._id));
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
        <CollectionHeaderComponent
          title={collection.title}
          collectionId={collection._id}
          editOnclick={openEditModal}
          deleteOnclick={openDeleteModal}
          openRuleModal={openRuleModal}
        />
        <ProductsWrapper>
          {!collection.products || collection.products.length == 0 ? (
            <Box w={{ base: "50%", lg: "25%" }}>
              <AddProductComponent />
            </Box>
          ) : (
            <>
              {collection?.products
                ?.filter((product, i) => {
                  if (i < 4) return product;
                })
                .map((product, i) => {
                  if (product.type == "SHOPIFY") {
                    return (
                      <Box key={i} w={{ base: "50%", lg: "25%" }} p="3px">
                        <ProductComponent
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
                        <ProductComponent
                          shopname={profile.shopName}
                          title={product.title}
                          id={product._id}
                          imageUrl={product?.media[0]?.url}
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

      {deleteModal && (
        <SmallModal
          text={`Are you sure you want to  delete this collection?`}
          show={deleteModal}
          hide={() => setDeleteModal(false)}
          click={clickOnDeleteCollection}
          loading={loading}
          buttonText={"Delete"}
        />
      )}

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

export default CollectionComponent;
