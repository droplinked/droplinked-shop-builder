//import "./Collection-page-style.scss";

import Loading from "../../../components/shared/loading/Loading";
import BasicButton from "../../../components/shared/BasicButton/BasicButton";
import ProducerCollection from "../../../components/shared/ProducerCollection/Producre-collection";
import AddProduct from "../../../components/shared/AddProduct/Add-product-component";
import CollectionModal from "../../../modals/collection/CollectionModal";

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCollectionsWithProduct } from "../../../api-service/collections/collectionApiService";
import { useApi } from "../../../hooks/useApi/useApi";
import {
  CollectionPageWrapper,
  ButtonWrapper,
  AddproductWrapper,
} from "./Collection-page-style";

export default function CollectionMainPage() {
  const [Modal, setModal] = useState(false);
  const [collections, setCollections] = useState(null);

  const navigate = useNavigate();
  const { getApi } = useApi();

  const token = JSON.parse(localStorage.getItem("token"));

  if (token == null) navigate("/");

  const updateCollections = async () => {
    let result = await getApi(getCollectionsWithProduct());
    if (result) setCollections(result.collections);
  };

  useEffect(() => {
    updateCollections();
  }, [Modal]);

  const ToggleModal = () => setModal((p) => !p);

  const closeNewCollectionModal = () => setModal(false);

  return (
    <CollectionPageWrapper>
      {/* <HeaderTitle>Collections</HeaderTitle>
      <ListedNumber>{collectins && collectins.length} Listed</ListedNumber> */}
      <ButtonWrapper>
        <BasicButton click={ToggleModal}>Add collection</BasicButton>
      </ButtonWrapper>

      {collections ? (
        <>
          {collections.length <= 0 ? (
            <AddproductWrapper>
              <AddProduct />
            </AddproductWrapper>
          ) : (
            <>
              {collections.map((collection, i) => {
                return (
                  <AddproductWrapper key={i}>
                    <ProducerCollection
                      collection={collection}
                      update={updateCollections}
                    />
                  </AddproductWrapper>
                );
              })}
            </>
          )}
        </>
      ) : (
        <Loading />
      )}

      <CollectionModal
        show={Modal}
        close={closeNewCollectionModal}
        update={updateCollections}
      />
    </CollectionPageWrapper>
  );
}
