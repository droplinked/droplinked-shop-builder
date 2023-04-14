import { useState, useEffect, useCallback } from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
//
import {
  Text16px,
  CollectionContainer,
  CollectionItem,
} from "../../AddProductPage-style";
import { useApi } from "hooks/useApi/useApi";
import { getUsersCollections } from "apis/collectionApiService";
//
import NewCollectionModal from "modals/new-collection-modal/NewCollectionModal";

const CollectionComponent = ({ TechnicalData, dispatchTechnical }) => {
  const { getApi } = useApi();

  const [collectionList, setCollectionList] = useState([]);
  const [shouldUpdateList, setShouldUpdateList] = useState(false);
  //
  const [showModal, setShowModal] = useState(false);
  const toggleNewCollectionModal = () => {
    setShowModal((prev) => !prev);
  };
  //
  const selectCollection = useCallback(
    (collectionId) =>
      dispatchTechnical({ type: "updateCollectionId", payload: collectionId }),
    []
  );

  useEffect(() => {
    async function fetchData() {
      let result = await getApi(getUsersCollections());
      if (result) {
        setCollectionList(result);
        selectCollection(result[0]._id);
      }
    }
    fetchData();
  }, [shouldUpdateList]);

  const isSelected = (collection) => {
    return TechnicalData.productCollectionID &&
      collection._id == TechnicalData.productCollectionID
      ? true
      : false;
  };

  return (
    <>
      <NewCollectionModal
        show={showModal}
        close={toggleNewCollectionModal}
        update={() => setShouldUpdateList((prev) => !prev)}
      />
      <Flex align="center" justify="space-between">
        <Text16px>Collection</Text16px>
        <Button
          variant="outline"
          colorScheme="whiteAlpha"
          borderColor="line"
          onClick={toggleNewCollectionModal}
        >
          New Collection
        </Button>
      </Flex>
      <Box mb="16px" />
      <CollectionContainer>
        {collectionList.map((collection) => {
          return (
            <CollectionItem
              onClick={() => {
                selectCollection(collection._id);
              }}
              key={collection._id}
              value={collection._id}
              bg={isSelected(collection) ? "primary" : "mainLayer"}
              color={isSelected(collection) ? "primaryDark" : "darkGray"}
            >
              {collection.title}
            </CollectionItem>
          );
        })}
      </CollectionContainer>
    </>
  );
};

export default CollectionComponent;
