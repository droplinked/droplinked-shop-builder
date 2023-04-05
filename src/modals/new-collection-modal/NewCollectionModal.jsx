import { useState } from "react";
import { Box, Flex, Image, Stack, Text } from "@chakra-ui/react";
import { useToasty } from "../../context/toastify/ToastContext";
import { useApi } from "../../hooks/useApi/useApi";
import { postCreateCollection } from "../../apis/collectionApiService";
import ModalWrapper from "../modal-wrapper/ModalWrapper";
import BasicButton from "../../components/shared/BasicButton/BasicButton";
import InputFieldComponent from "../../components/shared/input-field-component/InputFieldComponent";
import roundedQuestionMark from "../../assest/icon/rounded-question-mark-icon.svg";
//
const NewCollectionModal = ({ show, close, update }) => {
  //
  const [collectionName, setCollectionName] = useState("");
  const [loading, setLoading] = useState(false);

  const { errorToast, successToast } = useToasty();
  const { postApi } = useApi();

  const submitForm = async () => {
    if (collectionName === "") {
      errorToast("Collection name required");
      return;
    }
    setLoading(true);
    let result;

    result = await postApi(postCreateCollection(collectionName));

    if (result) {
      successToast("New collection added successfully");
      update();
      setCollectionName("");
    }
    close();
    setLoading(false);
  };

  return (
    <ModalWrapper show={show} close={close}>
      <Stack spacing={8}>
        <Text
          color="lightGray"
          fontWeight="700"
          fontSize="18px"
          textAlign="center"
        >
          Make Collection
        </Text>
        <InputFieldComponent
          label="Name"
          placeholder="default collection"
          description="description"
          value={collectionName}
          change={(e) => setCollectionName(e.target.value)}
        />
        <Flex gap={2}>
          <Image src={roundedQuestionMark} />
          <Text color="#808080">
            complete the details about your collection on the collections page
          </Text>
        </Flex>
        <Flex justifyContent="space-between" w="100%">
          <Box w="40%">
            <BasicButton click={close} cancelType={true}>
              Cancel
            </BasicButton>
          </Box>
          <Box w="40%">
            <BasicButton click={submitForm} loading={loading}>
              Save
            </BasicButton>
          </Box>
        </Flex>
      </Stack>
    </ModalWrapper>
  );
};

export default NewCollectionModal;
