//import "./Collection-page-style.scss";

import Loading from "../../../components/shared/loading/Loading";
import BasicButton from "../../../components/shared/BasicButton/BasicButton";
import ProducerCollection from "../../../components/shared/ProducerCollection/Producre-collection";
import AddProduct from "../../../components/shared/AddProduct/Add-product-component";
import CollectionModal from "../../../modals/collection/CollectionModal";

import { useNavigate  } from "react-router-dom";
//import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { selectCurrentShop } from "../../../store/shop/shop.selector";
//import { getCollectionsWithProduct } from "../../../api-service/collections/collectionApiService";
import { getUsersCollections ,getCollectionPublicByShopname } from "../../../apis/collectionApiService"
//import { getCollectionsByShopname } from "../../../api-service/collections/collectionApiService";
import { useApi } from "../../../hooks/useApi/useApi";
import {
  CollectionPageWrapper,
  ButtonWrapper,
  AddproductWrapper,
} from "./Collection-page-style";
import { useSelector } from "react-redux";


export default function CollectionMainPage() {
  const [Modal, setModal] = useState(false);
  const [collections, setCollections] = useState(null);

  const navigate = useNavigate();
  const shop = useSelector(selectCurrentShop)
  const { getApi } = useApi();

  const token = JSON.parse(localStorage.getItem("token"));

  if (token == null) navigate("/");

  const updateCollections = async () => {
    let result = await getApi(getCollectionPublicByShopname(shop.name));
    if (result) setCollections(result);
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
