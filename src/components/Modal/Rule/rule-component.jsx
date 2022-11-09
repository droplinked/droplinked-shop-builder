import { LableInput, InputComponent, TextareaInput } from "./rule-modal-style";
import { Box, Flex } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { convertAddressToArray, convertArrayToAddress } from "./rule-utils";

import BasicButton from "../../shared/BasicButton/BasicButton";

const AddRuleComponent = ({ rule, addToRules, isGated, close }) => {
  const [addressList, setAddressList] = useState("");
  const [description, setDescription] = useState("");
  const [discount, setDiscount] = useState("");
  const [counter, setCounter] = useState("");

  useEffect(() => {
    if (rule) {
      setAddressList(convertArrayToAddress(rule.addresses));
      setDescription(rule.des);
      if (rule.discount) setDiscount(rule.discount);
      setCounter(rule.counter);
    }
  }, []);

  const changeAddressList = (e) => setAddressList(e.target.value);
  const changeDescription = (e) => setDescription(e.target.value);
  const changeDiscount = (e) => setDiscount(e.target.value);
  const changeCounter = (e) => setCounter(e.target.value);

  const submitForm = () => {
    let ruleAddressList = convertAddressToArray(addressList);

    const ruleObj = {
      addresses: ruleAddressList,
      discount: discount,
      des: description,
      counter: counter,
    };
    addToRules(ruleObj);
    close();
  };

  return (
    <Box
      w="100%"
      mb="40px"
      borderRadius="8px"
      bg="mainLayer"
      p={{ base: "10px", md: "20px", lg: "30px" }}
    >
      <Flex
        justifyContent="space-between"
        flexDir={{ base: "column", lg: "row" }}
      >
        <Box w={{ base: "100%", lg: "60%" }}>
          <LableInput>NFT asset identifier</LableInput>
          <TextareaInput
            placeholder="NFT asset identifier"
            value={addressList}
            onChange={changeAddressList}
          />
        </Box>
        <Box w={{ base: "100%", lg: "30%" }}>
          {!isGated && (
            <Flex alignItems="center">
              <LableInput mr="16px">Discount</LableInput>
              <InputComponent
                placeholder="Discount"
                value={discount}
                onChange={changeDiscount}
                type="number"
              />
            </Flex>
          )}
          <Box mb="20px"></Box>
          <Flex alignItems="center">
            <LableInput mr="16px">Counter</LableInput>
            <InputComponent
              placeholder="Counter"
              value={counter}
              onChange={changeCounter}
              type="number"
            />
          </Flex>
        </Box>
      </Flex>

      <Box mb="40px"></Box>
      <LableInput>Tagline</LableInput>
      <InputComponent
        placeholder="Tagline"
        value={description}
        onChange={changeDescription}
      />
      <Box mb="40px"></Box>
      <Flex justifyContent="space-between">
        <Box w={{ base: "100px", md: "200px" }}>
          <BasicButton click={close} cancelType={true}>
            Cancel
          </BasicButton>
        </Box>
        <Box w={{ base: "100px", md: "200px" }}>
          <BasicButton click={submitForm}>Save</BasicButton>
        </Box>
      </Flex>
    </Box>
  );
};

export default AddRuleComponent;
