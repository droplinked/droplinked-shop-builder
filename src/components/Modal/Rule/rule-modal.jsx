import {
  RuleModalWrapper,
  RuleModalCotent,
  ModalHeader,
  InputComponent,
  TextareaInput,
  AddRuleButton,
  DeleteIconComponent,
} from "./rule-modal-style";
import { Box, Flex, Checkbox } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { convertRuleArray } from "./rule-utils";
import { addRuleset } from "../../../api/producer/Ruleset-api";

import deleteIcon from "../../../assest/icon/delete-icon.svg";
import FormInput from "../../shared/FormInput/FormInput";
import FillInput from "../../shared/FillInput/FillInput";
import BasicButton from "../../shared/BasicButton/BasicButton";

const TYPES = {
  addresses: "addresses",
  nftsCount: "nftsCount",
  discountPercentage: "discountPercentage",
  description: "description",
};

const Rule = ({ collectionId, update, close }) => {
  const [Rulelist, setRulelist] = useState(null);
  const [webUrl, setWebUrl] = useState("");
  const [gated, setGated] = useState(false);

  const changeWebUrl = (e) => setWebUrl(e.target.value);

  useEffect(() => {
    if (Rulelist == null) {
      let ruleObj = [
        {
          addresses: "",
          nftsCount:'',
          discountPercentage: '',
          description: ".",
        },
      ];
      setRulelist(ruleObj);
    }
  }, []);

  const changeRuleproperty = (value, type, index) => {
    let newRuleList = Rulelist.map((rule, i) => {
      if (index != i) {
        return { ...rule };
      } else {
        return { ...rule, [type]: value };
      }
    });
    setRulelist(newRuleList);
  };

  const changeGated = () => setGated(p => !p)

  const addnewRule = () => {
    let newRuleList = Array.from(Rulelist);
    newRuleList.push({
      addresses: "",
      nftsCount: '',
      discountPercentage: '',
      description: ".",
    });
    setRulelist(newRuleList);
  };

  const deleteRule = (index) => {
    if (Rulelist.length == 1) return;
    let newRuleList = Array.from(Rulelist);
    newRuleList = newRuleList.filter((rule, i) => {
      return i != index;
    });
    setRulelist(newRuleList);
  };

  const submit = async () => {
    let rules = convertRuleArray(Rulelist);
    let result = await addRuleset(collectionId, rules, webUrl ,gated);
    console.log(result);
    update();
  };

  return (
    <RuleModalWrapper>
      <RuleModalCotent>
        <ModalHeader>Ruleset</ModalHeader>

        <FillInput
          preText={"https://"}
          value={webUrl}
          change={changeWebUrl}
          placeholder={"Your website"}
        />
<Box mb="20px"></Box>
        <Checkbox
          size="md"
          color="primary"
          colorScheme="green"
          isChecked={gated}
          onChange={changeGated}
        >
          Gated
        </Checkbox>

        <Box mb="40px"></Box>
        {Rulelist != null && (
          <>
            (
            {Rulelist.map((rule, index) => {
              return (
                <Box mb="100px" pos="relative">
                  <DeleteIconComponent
                    src={deleteIcon}
                    onClick={() => {
                      deleteRule(index);
                    }}
                  />
                  <TextareaInput
                    value={rule.addresses}
                    onChange={(e) => {
                      changeRuleproperty(e.target.value, "addresses", index);
                    }}
                    placeholder={"NFT Identify"}
                  />
                  <Box mb="10px"></Box>
                  <Flex
                    justifyContent="space-between"
                    alignItems="center"
                    w="100%"
                  >
                    <Box w="200px">
                      <InputComponent
                        type="number"
                        placeholder="counter"
                        value={rule.nftsCount}
                        onChange={(e) => {
                          changeRuleproperty(
                            e.target.value,
                            "nftsCount",
                            index
                          );
                        }}
                        disabled={gated}
                      />
                    </Box>
                    <Box w="200px">
                      <InputComponent
                        type="number"
                        placeholder="discount"
                        value={rule.discountPercentage}
                        onChange={(e) => {
                          changeRuleproperty(
                            e.target.value,
                            "discountPercentage",
                            index
                          );
                        }}
                      />
                    </Box>
                  </Flex>
                  <Box mb="10px"></Box>

                  <Box w="100%">
                    <InputComponent
                      placeholder="desciption"
                      value={rule.description}
                      onChange={(e) => {
                        changeRuleproperty(
                          e.target.value,
                          "description",
                          index
                        );
                      }}
                    />
                  </Box>
                </Box>
              );
            })}
            )
          </>
        )}

        <AddRuleButton onClick={addnewRule}>Add new rule</AddRuleButton>
        <Box mb="40px"></Box>
        <Flex w="100%" justifyContent="space-between">
          <Box w="200px">
            <BasicButton click={close}>Cancel</BasicButton>
          </Box>
          <Box w="200px">
            <BasicButton click={submit}>Add</BasicButton>
          </Box>
        </Flex>
      </RuleModalCotent>
    </RuleModalWrapper>
  );
};

export default Rule;
