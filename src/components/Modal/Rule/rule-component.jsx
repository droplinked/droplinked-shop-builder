import { LableInput, InputComponent  ,TextareaInput} from "./rule-modal-style";
import { Box, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { convertAddressToArray } from "./rule-utils";
import BasicButton from "../../shared/BasicButton/BasicButton";

const AddRuleComponent = ({ rule, addToRules, close }) => {
  const [addressList, setAddressList] = useState("");
  const [description, setDescription] = useState("");
  const [discount, setDiscount] = useState("");
  const [counter, setCounter] = useState("");

  const changeAddressList = (e) => setAddressList(e.target.value);
  const changeDescription = (e) => setDescription(e.target.value);
  const changeDiscount = (e) => setDiscount(e.target.value);
  const changeCounter = (e) => setCounter(e.target.value);

  const submitForm = () => {
    let ruleAddressList = convertAddressToArray(addressList);

    const ruleObj = {
      address: ruleAddressList,
      discount: discount,
      des: description,
      counter: counter,
    };
    addToRules(ruleObj);
    close();
  };

  return (
    <Box w="100%" mb="40px">
      <LableInput>NFT Identify</LableInput>
      <TextareaInput
        placeholder="NFT Identify"
        value={addressList}
        onChange={changeAddressList}
      />
      <Box mb="20px"></Box>
      <LableInput>Description</LableInput>
      <InputComponent
        placeholder="Description"
        value={description}
        onChange={changeDescription}
      />
      <Box mb="20px"></Box>
      <Flex w="100%" alignItems="center" mb="20px">
        <Box w="40%" mr="30px">
          <LableInput>Discount</LableInput>
          <InputComponent
            placeholder="Discount"
            value={discount}
            onChange={changeDiscount}
          />
        </Box>
        <Box w="40%">
          <LableInput>Counter</LableInput>
          <InputComponent
            placeholder="Counter"
            value={counter}
            onChange={changeCounter}
          />
        </Box>
      </Flex>
      <Flex justifyContent="space-between">
        <Box w="40%">
          <BasicButton click={close} cancelType={true}>
            close
          </BasicButton>
        </Box>
        <Box w="40%">
          <BasicButton click={submitForm}>submit</BasicButton>
        </Box>
      </Flex>
    </Box>
  );
};

export default AddRuleComponent;
