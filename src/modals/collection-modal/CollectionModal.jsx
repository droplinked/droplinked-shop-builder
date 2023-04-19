import { useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";

import { useToasty } from "../../context/toastify/ToastContext";
//import { updateCollection ,addCollection } from "../../api-service/collections/collectionApiService";
import { useApi } from "../../hooks/useApi/useApi";
import {
  postCreateCollection,
  putUpdateCollection,
} from "../../apis/collectionApiService";

import ModalWrapper from "../modal-wrapper/ModalWrapper";
import InputFieldComponent from "../../components/shared/input-field-component/InputFieldComponent";
import BasicButton from "../../components/shared/BasicButton/BasicButton";

const CollectionModal = ({ show, collection, close, update }) => {
  const [collectionName, setCollectionName] = useState(() => {
    return collection === undefined ? "" : collection.title;
  });
  const [loading, setLoading] = useState(false);

  const { errorToast, successToast } = useToasty();
  const [error, setError] = useState(false);
  const { putApi, postApi } = useApi();

  const isNewCollection = collection === undefined ? true : false;

  const changeName = (e) => setCollectionName(e.target.value);

  const submitForm = async () => {
    if (collectionName === "") {
      setError(true);
      return;
    }

    setLoading(true);

    let result;
    if (isNewCollection)
      result = await postApi(postCreateCollection(collectionName));
    else
      result = await putApi(
        putUpdateCollection(collection._id, collectionName)
      );

    if (result) {
      if (isNewCollection) successToast("New collection added successfully");
      else successToast("Collection updated successfully");
      update();
    }

    close();
    setLoading(false);
  };

  return (
    <ModalWrapper show={show} close={close}>
      <Text
        color="white"
        fontWeight="600"
        fontSize={{ base: "30px", md: "40px" }}
        textAlign="center"
      >
        Collection
      </Text>
      <Flex flexDir="column" w="100%" margin="0px auto">
        {/* content */}
        <Box mt="20px"></Box>
        <InputFieldComponent
          isRequired
          showError={error}
          name="Collection name"
          label={"Collection name"}
          value={collectionName}
          change={changeName}
          placeholder={"Collection name"}
        />

        {/* content */}
        {/* footer */}
        <Flex justifyContent="space-between" mt="20px" w="100%">
          <Box w="40%">
            <BasicButton
              width="100%"
              click={close}
              loading={loading}
              cancelType={true}
            >
              Cancel
            </BasicButton>
          </Box>
          <Box w="40%">
            <BasicButton width="100%" click={submitForm} loading={loading}>
              Submit
            </BasicButton>
          </Box>
        </Flex>
        {/* footer */}
      </Flex>
    </ModalWrapper>
  );
};

export default CollectionModal;
