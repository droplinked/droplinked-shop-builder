import {
  RuleModalWrapper,
  RuleModalCotent,
  ModalHeader,
  RulesetText,
  RuleSelect,
  AddRuleButton
} from "./Rule-modal-style";
import { Flex, Box } from "@chakra-ui/react";
import { TiDelete } from "react-icons/ti";
import { useState } from "react";

import RuleAddressComponent from "./Rule-address-component"

const RuleModal = ({ open, close }) => {

  const [ruleList, setRuleList] = useState([{ address: "", type: "NFT", index:'1' }]);

  const changeRuleType = (value , index) => {
    let arrNew =  Array.from(ruleList)
    arrNew = arrNew.map((rule , i ) =>{
        if(i == index) return {...rule , type:value }
        else return {...rule}
    })
    setRuleList(arrNew)
  }

  const changeRuleAddress = (value , index) => {
    let arrNew = Array.from(ruleList)
    arrNew = arrNew.map((rule , i ) =>{
        if(i == index) return {...rule , address:value }
        else return {...rule}
    })
    setRuleList(arrNew)
  }

  const addNewRule = () => {
    let arrNew = Array.from(ruleList)
    
  }

console.log(ruleList);

  return (
    <RuleModalWrapper>
      <RuleModalCotent>
        <Flex w="100%" flexDir="column" alignItems="center">

          <ModalHeader>Ruleset</ModalHeader>
          <RulesetText>
            The customer must meet at least one of the rules listed below (OR)
          </RulesetText>

          {ruleList.map((rule, index) => {
            return (
              <Box w="100%" mb="40px" key={index}>
                <Flex w="100%" mb="10px" alignItems="center">
                  <TiDelete color="red" size="30px" cursor="pointer" />
                  <RuleSelect onChange={(e)=>changeRuleType(e.target.value , index)}>
                    <option value="NFT">NFT</option>
                    <option value="CONTRACT">CONTRACT</option>
                  </RuleSelect>
                </Flex>
                <RuleAddressComponent type={rule.type} index={index} address={rule.address} change={changeRuleAddress} />
              </Box>
            );
          })}

          <AddRuleButton onClick={addNewRule}>Add rule</AddRuleButton>

        </Flex>
      </RuleModalCotent>
    </RuleModalWrapper>
  );
};

export default RuleModal;
