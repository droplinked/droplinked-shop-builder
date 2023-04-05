import { useSelector } from "react-redux";
import { useNavigate  } from "react-router-dom";
import { useState, useEffect } from "react";

import { selectCurrentShop } from "../../../store/shop/shop.selector";
import { getCollectionPublicByShopname } from "../../../apis/collectionApiService"
import { useApi } from "../../../hooks/useApi/useApi";
import {
  CollectionPageWrapper,
  ButtonWrapper,
  AddproductWrapper,
} from "./CollectionsPage-style";

import Loading from "../../../components/shared/loading/Loading";
import BasicButton from "../../../components/shared/BasicButton/BasicButton";
import CollectionComponent from "./components/collection-component/CollectionComponent";
import AddProductComponent from "./components/add-product-component/AddProductComponent";
import CollectionModal from "../../../modals/collection-modal/CollectionModal";

export default function CollectionsPage() {
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
              <AddProductComponent />
            </AddproductWrapper>
          ) : (
            <>
              {collections.map((collection, i) => {
                return (
                  <AddproductWrapper key={i}>
                    <CollectionComponent
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
