import {
  RuleModalWrapper,
  RuleModalCotent,
  ModalHeader,
  RulesetText,
  RuleSelect,
  AddRuleButton,
  RuleAddressInput,
} from "./Rule-modal-style";
import { Flex, Box } from "@chakra-ui/react";
import { TiDelete } from "react-icons/ti";
import { useState, useEffect } from "react";
import {
  addRuleset,
  getRuleById,
  updateRule,
} from "../../../../api/producer/Ruleset-api";

import BasicButton from "../../BasicButton/BasicButton";

const RuleModal = ({ open, close, collectionId, ruleId }) => {
  const [ruleList, setRuleList] = useState(() => {
    return ruleId == undefined
      ? [{ address: "", type: "NFT", index: 1 }]
      : null;
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (ruleId != undefined) getRuleData();
  }, []);

  const getRuleData = async () => {
    let result = await getRuleById(ruleId);
    if (result.status == "success") {
      let newRuleArray = result.data.ruleSet.rules;
      newRuleArray = newRuleArray.map((rule, i) => {
        return { ...rule, index: i + 1 };
      });
      setRuleList(newRuleArray);
    }
  };

  const handleChildClick = (event) => {
    event.stopPropagation();
  };

  const changeRuleType = (value, index) => {
    let arrNew = Array.from(ruleList);
    arrNew = arrNew.map((rule, i) => {
      if (i == index) return { ...rule, type: value };
      else return { ...rule };
    });
    setRuleList(arrNew);
  };

  const changeRuleAddress = (value, index) => {
    let arrNew = Array.from(ruleList);
    arrNew = arrNew.map((rule, i) => {
      if (i == index) return { ...rule, address: value };
      else return { ...rule };
    });
    setRuleList(arrNew);
  };

  const addNewRule = () => {
    let arrNew = Array.from(ruleList);
    arrNew.push({ address: "", type: "NFT", index: arrNew.length + 1 });
    setRuleList(arrNew);
  };

  const deleteRule = (index) => {
    let arrNew = [];
    ruleList.forEach((item) => arrNew.push(item));

    arrNew = arrNew.filter((rule, i) => {
      if (i != index) return rule;
    });
    arrNew = arrNew.map((rule, i) => {
      return { ...rule, index: i + 1 };
    });
    setRuleList(arrNew);
  };

  const submitRuleSet = async () => {
    let rules = ruleList.map((rule) => {
      return { address: rule.address, type: rule.type };
    });
    setLoading(true);
    let result;
    if (ruleId == undefined) {
      result = await addRuleset(collectionId, rules);
    } else {
      result = await updateRule(ruleId, rules);
    }
    console.log(result);
    setLoading(false);
    close();
  };

  return (
    <>
      {open && (
        <RuleModalWrapper onMouseDown={close}>
          <RuleModalCotent onMouseDown={handleChildClick}>
            <Flex w="100%" flexDir="column" alignItems="center">
              <ModalHeader>Ruleset</ModalHeader>
              <RulesetText>
                The customer must meet at least one of the rules listed below
                (OR)
              </RulesetText>

              {ruleList.map((rule, index) => {
                return (
                  <Box w="100%" mb="40px" key={index}>
                    <Flex w="100%" mb="10px" alignItems="center">
                      <TiDelete
                        color="red"
                        size="30px"
                        cursor="pointer"
                        onClick={() => {
                          deleteRule(index);
                        }}
                      />
                      <RuleSelect
                        value={rule.type}
                        onChange={(e) => changeRuleType(e.target.value, index)}
                      >
                        <option value="NFT">NFT</option>
                        <option value="CONTRACT">CONTRACT</option>
                      </RuleSelect>
                    </Flex>
                    <RuleAddressInput
                      value={rule.address}
                      onChange={(e) => changeRuleAddress(e.target.value, index)}
                      placeholder={
                        rule.type == "NFT"
                          ? "Contract address :: Contract name . NFT name"
                          : "Contract address :: Contract name"
                      }
                    />
                  </Box>
                );
              })}

              <AddRuleButton onClick={addNewRule}>Add rule</AddRuleButton>
              <Flex mt="40px" w="100%" justifyContent="space-between">
                <Box w="40%">
                  <BasicButton
                    cancelType={true}
                    click={close}
                    loading={loading}
                  >
                    Cancel
                  </BasicButton>
                </Box>
                <Box w="40%">
                  <BasicButton click={submitRuleSet} loading={loading}>
                    Submit
                  </BasicButton>
                </Box>
              </Flex>
            </Flex>
          </RuleModalCotent>
        </RuleModalWrapper>
      )}
    </>
  );
};

export default RuleModal;
