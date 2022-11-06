import ModalContainer from "../../Modal/modal-container/modal-container";
import FormInput from "../../shared/FormInput/FormInput";
import BasicButton from "../../shared/BasicButton/BasicButton";

import { useState } from "react";
import { useToasty } from "../../../context/toastify/ToastContext";
import { updateCollection } from "../../../api/producer/Collection-api";
import { Box, Flex, Text } from "@chakra-ui/react";

const CollectionModal = ({ collection, close, update }) => {
  const [collectionName, setCollectionName] = useState(collection.title);
  const [loading, setLoading] = useState(false);

  const { errorToast, successToast } = useToasty();

  const changeName = (e) => setCollectionName(e.target.value);

  const submitForm = async () => {
    if (collectionName == "") {
      errorToast("Collection name required");
      return;
    }

    setLoading(true);
    let result = await updateCollection(collection._id, collectionName);
    if (result == true) {
      successToast("Collection updated successfully");
      update();
    } else {
      errorToast(result);
    }
    close();
    setLoading(false);
  };

  return (
    <ModalContainer close={close}>
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
        <FormInput
          label={"Collection name"}
          value={collectionName}
          changeValue={changeName}
        />

        {/* content */}
        {/* footer */}
        <Flex justifyContent="space-between" mt="20px" w="100%">
          <Box w="40%">
            <BasicButton click={close} loading={loading} cancelType={true}>
              Cancel
            </BasicButton>
          </Box>
          <Box w="40%">
            <BasicButton click={submitForm} loading={loading}>
              Submit
            </BasicButton>
          </Box>
        </Flex>
        {/* footer */}
      </Flex>
    </ModalContainer>
  );
};

export default CollectionModal;
