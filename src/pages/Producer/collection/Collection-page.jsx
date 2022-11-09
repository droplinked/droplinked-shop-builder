//import "./Collection-page-style.scss";

import Loading from "../../../components/shared/loading/Loading";
import BasicButton from "../../../components/shared/BasicButton/BasicButton";
import ProducerCollection from "../../../components/shared/ProducerCollection/Producre-collection";
import AddProduct from "../../../components/shared/AddProduct/Add-product-component";
import CollectionModal from "../../../components/Modal/Collection/Collection-modal";

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCollections } from "../../../api/producer/Collection-api";
import {
  CollectionPageWrapper,
  HeaderTitle,
  ListedNumber,
  ButtonWrapper,
  AddproductWrapper,
} from "./Collection-page-style";

export default function CollectionMainPage() {
  const [Modal, setModal] = useState(false);
  const [collectins, setCollections] = useState(null);

  const navigate = useNavigate();

  const token = JSON.parse(localStorage.getItem("token"));

  if (token == null) navigate("/");

  const updateCollections = async () => {
    let collections = await getCollections();
    if (collections != null) setCollections(collections);
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

      {collectins ? (
        <>
          {collectins.length <= 0 ? (
            <AddproductWrapper>
              <AddProduct />
            </AddproductWrapper>
          ) : (
            <>
              {collectins.map((collection, i) => {
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
      {Modal && (
        <CollectionModal
          close={closeNewCollectionModal}
          update={updateCollections}
        />
      )}
    </CollectionPageWrapper>
  );
}
