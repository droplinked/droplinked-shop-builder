import {
  ViewCollectionPageWrapper,
  ProductWrapper,
  CollectionTitle,
} from "./View-collection-style";
import { useParams } from "react-router-dom";
import { getCollectionById } from "../../../api/public/Collection-api";
import { useEffect, useState } from "react";
import { USER_TYPE } from "../../../constant/user-types";
import { useProfile } from "../../../context/profile/ProfileContext";
import { Flex } from "@chakra-ui/react";
import { AiFillEdit } from "react-icons/ai";

import Product from "../../../components/shared/Product/Product";
import AddProduct from "../../../components/shared/AddProduct/Add-product-component";
import CollectionModal from "../../../components/Modal/Collection/Collection-modal";
import Loading from "../../../components/shared/loading/Loading";

const ViewCollection = () => {
  const [Collection, setCollection] = useState(null);
  const [editCollectionModal, setEditCollectionModal] = useState(false);

  const { collectionId } = useParams();
  const { profile } = useProfile();

  useEffect(() => {
    getCollections();
  }, []);

  const getCollections = async () => {
    let coll = await getCollectionById(collectionId);
    setCollection(coll);
  };

  const openEditModal = () => setEditCollectionModal(true);
  const closeEditModal = () => setEditCollectionModal(false);

  return (
    <ViewCollectionPageWrapper>
      {Collection ? (
        <>
          <Flex alignItems="center" justifyContent="center" mb="40px">
            <CollectionTitle>{Collection.title}</CollectionTitle>
            <AiFillEdit
              color="primary"
              size="20px"
              cursor="pointer"
              onClick={openEditModal}
            />
          </Flex>

          <ProductWrapper>
            {Collection.products.length > 0 &&
              Collection.products.map((product, i) => {
                return product.type == "SHOPIFY" ? (
                  <div key={i} className="col-6 col-md-3 p-1">
                    <Product
                      title={product.shopifyData.title}
                      imageUrl={product.shopifyData.images[0].src}
                      id={product._id}
                      type={USER_TYPE.PRODUCER}
                    />
                  </div>
                ) : (
                  <div key={i} className="col-6 col-md-3 p-1">
                    <Product
                      title={product.title}
                      imageUrl={product.media[0].url}
                      id={product._id}
                      shopname={profile.shopName}
                      type={USER_TYPE.PRODUCER}
                    />
                  </div>
                );
              })}
            <div className="col-6 col-md-3 p-1">
              <AddProduct />
            </div>
          </ProductWrapper>
        </>
      ) : (
        <Loading />
      )}
      {editCollectionModal && (
        <CollectionModal
          collection={Collection}
          close={closeEditModal}
          update={getCollections}
        />
      )}
    </ViewCollectionPageWrapper>
  );
};

export default ViewCollection;

{
  /*  */
}
