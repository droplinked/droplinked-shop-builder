import "./Edit-collection-modal-style.scss";

import ModalContainer from "../../Modal/modal-container/modal-container";
import FormInput from "../../shared/FormInput/FormInput";
import BasicButton from "../../shared/BasicButton/BasicButton";

import { useState  } from "react";
//import { EditCollectionWrapper } from "./Edit-collection-modal-style";
//import { getRules } from "../../../api/producer/Ruleset-api";
import { useToasty } from "../../../context/toastify/ToastContext";
import { updateCollection } from "../../../api/producer/Collection-api";
import { Box, Flex } from "@chakra-ui/react";

const EditCollectionModal = ({ collection, close, update }) => {
  // const [selectedRule, setSelectedRule] = useState(() => {
  //   return collection.ruleSetID ? collection.ruleSetID : "";
  // });
  const [collectionName, setCollectionName] = useState(collection.title);
  //const [Rules, setRules] = useState(null);
  const [loading, setLoading] = useState(false);

  const { errorToast, successToast } = useToasty();

  // useEffect(() => {
  //   getRulesData();
  // }, []);

  // const getRulesData = async () => {
  //   let result = await getRules(() => {});
  //   setRules(result);
  // };

  const changeName = (e) => setCollectionName(e.target.value);

  // const changeRule = (e) => setSelectedRule(e.target.value);

  const submitForm = async () => {
    if (collectionName == "") {
      errorToast("Collection name required");
      return;
    }

    // let RuleInfo = {
    //   title: collectionName,
    //   image: "",
    //   nftImages: [],
    //   type: selectedRule == "" ? "PUBLIC" : "HOLDER",
    // };

    // if (selectedRule != "") RuleInfo = { ...RuleInfo, ruleSetID: selectedRule };

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
      <Flex flexDir='column' w='100%' margin='0px auto'>
        {/* content */}
        <Box mt="20px"></Box>
        <FormInput
          label={"Collection name"}
          value={collectionName}
          changeValue={changeName}
        />

        {/* content */}
        {/* footer */}
        <Flex justifyContent="space-between" mt="20px" w='100%'>
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

export default EditCollectionModal;
