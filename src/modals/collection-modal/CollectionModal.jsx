import { useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useToasty } from "../../context/toastify/ToastContext";
import { useApi } from "../../hooks/useApi/useApi";
import { postCreateCollection, putUpdateCollection } from "lib/apis/collectionApiService";
import ModalWrapper from "../modal-wrapper/ModalWrapper";
import InputFieldComponent from "../../components/shared/input-field-component/InputFieldComponent";
import BasicButton from "../../components/shared/BasicButton/BasicButton";
import AppInput from "components/shared/form/textbox/AppInput";
import AppErrors from "lib/utils/statics/errors/errors";

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
      setError(false)
      setCollectionName(null)
      if (isNewCollection) successToast("New collection added successfully");
      else successToast(AppErrors.collection.update_Collection_name);
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
        <AppInput
          name="name"
          value={collectionName}
          onChange={changeName}
          isRequired
          label={"Collection name"}
          placeholder={"Collection name"}
          error={error && AppErrors.collection.collection_name_doesnt_fill_out}
        />

        {/* content */}
        {/* footer */}
        <Flex justifyContent="space-between" mt="20px" w="100%">
          <Box w="40%">
            <BasicButton
              width="100%"
              onClick={close}
              isDisabled={loading}
              variant={"outline"}
            >
              Cancel
            </BasicButton>
          </Box>
          <Box w="40%">
            <BasicButton width="100%" onClick={submitForm} isLoading={loading}>
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
