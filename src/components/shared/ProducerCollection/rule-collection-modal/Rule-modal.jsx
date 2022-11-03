import {
  RuleModalWrapper,
  RuleModalCotent,
  ModalHeader,
  RulesetText,
  RuleSelect,
  AddRuleButton,
  RuleAddressInput,
  DiscoutPecentage,
} from "./Rule-modal-style";
import { Flex, Box, Input } from "@chakra-ui/react";
import { TiDelete } from "react-icons/ti";
import { useState, useEffect } from "react";
import {
  addRuleset,
  getRuleById,
  updateRule,
} from "../../../../api/producer/Ruleset-api";
import { useToasty } from "../../../../context/toastify/ToastContext";

import BasicButton from "../../BasicButton/BasicButton";
import FormInput from "../../FormInput/FormInput";

const RuleModal = ({ open, close, collectionId, ruleId }) => {
  const [ruleList, setRuleList] = useState(() => {
    return ruleId == undefined
      ? [
          {
            address: "",
            type: "NFT",
            discountPercentage: "",
            description: "",
            index: 1,
          },
        ]
      : null;
  });
  const [webUrl, setWebUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const { successToast, errorToast } = useToasty();

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
      if (result.data.ruleSet.webUrl) setWebUrl(result.data.ruleSet.webUrl);
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
    arrNew.push({
      address: "",
      type: "NFT",
      discountPercentage: "",
      description: "",
      index: arrNew.length + 1,
    });
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

  const changeWebUrl = (e) => setWebUrl(e.target.value);

  // check inputs value
  const checkValidation = () => {
    let checkSwitch = true;
    if (webUrl == "") {
      errorToast("WebUrl is required.");
      return false;
    }

    ruleList.forEach((rule) => {
      if (rule.address == "") {
        errorToast("NFT / Contract address is required.");
        checkSwitch = false;
      } else if (rule.discountPercentage == "") {
        errorToast("Discount percentage is required.");
        checkSwitch = false;
      } else if (rule.description == "") {
        errorToast("description is required.");
        checkSwitch = false;
      }
    });

    return checkSwitch;

    // let find = ruleList.find((rule) => rule.address == "");

    // if (find != undefined) {
    //   errorToast("NFT / Contract address is required.");
    //   return false;
    // } else return true;
  };

  //
  const changeDiscount = (e, index) => {
    let arrNew = Array.from(ruleList);
    arrNew = arrNew.map((rule, i) => {
      if (i == index) return { ...rule, discountPercentage: e.target.value };
      else return { ...rule };
    });
    setRuleList(arrNew);
  };
  //
  const changeDescription = (e, index) => {
    let arrNew = Array.from(ruleList);
    arrNew = arrNew.map((rule, i) => {
      if (i == index) return { ...rule, description: e.target.value };
      else return { ...rule };
    });
    setRuleList(arrNew);
  };

  const submitRuleSet = async () => {
    // check condition
    let condition = checkValidation();
    if (condition == false) return;

    // build ruleset array for pass to api
    let rules = ruleList.map((rule) => {
      return { ...rule };
    });

    setLoading(true);
    let result;
    if (ruleId == undefined) {
      result = await addRuleset(collectionId, rules, webUrl);
    } else {
      result = await updateRule(ruleId, rules, webUrl);
    }

    if (result != true) errorToast(result);

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

              <FormInput
                value={webUrl}
                changeValue={changeWebUrl}
                label={"NFT store"}
                placeholder={"NFT store"}
              />

              <Box mb="40px"></Box>

              {ruleList != null &&
                ruleList.map((rule, index) => {
                  return (
                    <Box w="100%" mb="40px" key={index}>
                      <Flex
                        w="100%"
                        mb="10px"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Flex w="40%">
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
                            onChange={(e) =>
                              changeRuleType(e.target.value, index)
                            }
                          >
                            <option value="NFT">NFT</option>
                            <option value="CONTRACT">CONTRACT</option>
                          </RuleSelect>
                        </Flex>
                        <DiscoutPecentage
                          type="number"
                          w="50%"
                          placeholder="% Percent"
                          value={rule.discountPercentage}
                          onChange={(e) => changeDiscount(e, index)}
                        />
                      </Flex>

                      <RuleAddressInput
                        value={rule.address}
                        onChange={(e) =>
                          changeRuleAddress(e.target.value, index)
                        }
                        placeholder={
                          rule.type == "NFT"
                            ? "Contract address :: Contract name . NFT name"
                            : "Contract address :: Contract name"
                        }
                      />

                      <Box mb="20px"></Box>

                      <DiscoutPecentage
                        value={rule.description}
                        type="text"
                        w="100%"
                        placeholder="Description"
                        onChange={(e) => changeDescription(e, index)}
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
