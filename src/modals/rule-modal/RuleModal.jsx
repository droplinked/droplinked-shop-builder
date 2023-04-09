import {
  ModalHeader,
  SelectComponent,
  OptionComponent,
} from "./RuleModal-style";
import { Box, Checkbox, Flex, Stack } from "@chakra-ui/react";
import { useState, useEffect } from "react";

// import {
//   addRuleset,
//   getRuleById,
//   updateRule,
// } from "../../api/producer/Ruleset-api";
import {
  postCreateRuleset,
  getRulesetById,
  putUpdateRuleset,
} from "../../apis/rulesetApiService";
//import { getRulesById } from "../../api-service/rules/rulesApiService";
import { useToasty } from "../../context/toastify/ToastContext";
import { RuleTypes } from "./rule-type";
import { useApi } from "../../hooks/useApi/useApi";
// import deleteIcon from "../../../assest/icon/delete-icon.svg";
// import RuleItem from "./RuleItem";
import BasicButton from "../../components/shared/BasicButton/BasicButton";
// import AddRuleComponent from "./AddRuleComponent";
// import Loading from "../../components/shared/loading/Loading";
import ModalWrapper from "../modal-wrapper/ModalWrapper";
// import discountIcon from "../../assest/icon/discount-active-icon.svg";
// import gatedIcon from "../../assest/icon/gated-active-icon.svg";

import InputFieldComponent from "../../components/shared/input-field-component/InputFieldComponent";

// this modal use for add new rule or edit exsiting rule
const RuleModal = ({ show, collectionId, update, close, ruleId }) => {
  // ............
  const { errorToast, successToast } = useToasty();
  const { getApi, postApi, putApi } = useApi();
  // this state for list of rules
  const [RuleList, setRuleList] = useState([]);
  // this state used for web url address
  const [webUrl, setWebUrl] = useState("");
  //this state used for  rule type
  const [ruleType, setRuleType] = useState(RuleTypes.DISCOUNT);
  //this state used add new rule
  const [addNewRule, setAddNewRule] = useState(false);

  const [loading, setLoading] = useState(false);

  const changeWebUrl = (e) => setWebUrl(e.target.value);

  const changeRuleType = (e) => setRuleType(e.target.value);

  const toggleRuleModal = () => setAddNewRule((p) => !p);

  useEffect(() => {
    if (ruleId != undefined) {
      getRuleData();
    }
  }, []);

  const getRuleData = async () => {
    setLoading(true);
    let result = await getApi(getRulesetById(ruleId));

    if (result) initializeRule(result);
    setLoading(false);
  };
  //
  const initializeRule = (rule) => {
    setWebUrl(rule.webUrl);
    if (rule.gated) setRuleType(RuleTypes.GATED);
    let initialRuleList = rule.rules.map((currentRule) => {
      return {
        addresses: currentRule.addresses,
        type: currentRule.type,
        counter: currentRule.nftsCount ? currentRule.nftsCount : "",
        discount: currentRule.discountPercentage,
        des: currentRule.description,
      };
    });
    setRuleList(initialRuleList);
  };

  const deleteRule = (index) => {
    let newArray = Array.from(RuleList);
    newArray = newArray.filter((rule, i) => {
      return i != index;
    });
    setRuleList(newArray);
  };

  const addToRules = (newRule) => {
    let currentRuleArray = Array.from(RuleList);
    currentRuleArray.push(newRule);
    setRuleList(currentRuleArray);
  };

  const editRule = (newRule, index) => {
    let currentRuleArray = Array.from(RuleList);
    currentRuleArray = currentRuleArray.map((rule, i) => {
      if (index == i) {
        return { ...newRule };
      } else {
        return { ...rule };
      }
    });
    setRuleList(currentRuleArray);
  };

  const submit = async () => {
    const gated = ruleType == RuleTypes.DISCOUNT ? false : true;
    let rulesArray = [];
    rulesArray = RuleList.map((rule) => {
      return {
        addresses: rule.addresses,
        type: "NFT",
        nftsCount: rule.counter,
        discountPercentage: rule.discount ? rule.discount : "",
        description: rule.des,
      };
    });

    const requestBody = {
      collectionID: collectionId,
      gated: gated,
      rules: rulesArray,
      webUrl: webUrl,
      type: "ETH",
      redeemedNFTs: [],
    };
    if (ruleId != undefined) {
      await putApi(putUpdateRuleset(ruleId, requestBody));
    } else {
      await postApi(postCreateRuleset(requestBody));
    }
    // let result;
    // if (ruleId != undefined)
    //   result =
    // else result =
    update();
    close();
  };

  if (!show) return null;

  return (
    <ModalWrapper show={show} close={close}>
      <ModalHeader>Make Ruleset</ModalHeader>
      <Stack spacing={6}>
        <InputFieldComponent
          label="Tag Name"
          placeholder="Ruleset 1"
          description="description"
        />
        <InputFieldComponent
          label="NFT source domain"
          placeholder="https://www.opensea.com"
          description="description"
        />
        <Flex gap={2}>
          <Box width="100%">
            <Box color="white">Rule type</Box>

            <SelectComponent
              width="100%"
              mt={2}
              value={ruleType}
              onChange={changeRuleType}
              disabled={RuleList.length > 0}
            >
              <OptionComponent value={RuleTypes.GATED}>
                {/* <Image src={discountIcon} w="16px" h="16px" /> */}
                Gating
              </OptionComponent>
              <OptionComponent value={RuleTypes.DISCOUNT}>
                {/* <Image src={gatedIcon} w="16px" h="16px" /> */}
                Discount
              </OptionComponent>
            </SelectComponent>
          </Box>
          <InputFieldComponent
            label="Offer"
            placeholder="%20"
            description="description"
          />
        </Flex>
        <InputFieldComponent
          textArea
          label="NFT asset identifiers"
          placeholder="you can separate nft links with ,"
        />

        <InputFieldComponent
          label="Minimum Requirement"
          placeholder="4"
          description="description"
        />

        <Checkbox colorScheme="white" color="white">
          Save this ruleset
        </Checkbox>

        <Flex w="100%" justifyContent="space-between">
          <Box w="200px">
            <BasicButton cancelType click={close}>
              Cancel
            </BasicButton>
          </Box>
          <Box w="200px">
            <BasicButton click={submit}>Save</BasicButton>
          </Box>
        </Flex>
      </Stack>
    </ModalWrapper>
  );
};

export default RuleModal;
