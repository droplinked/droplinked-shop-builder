import { ModalHeader, AddRuleButton, TypeSelect } from "./RuleModal-style";
import { Box, Flex } from "@chakra-ui/react";
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
import RuleItem from "./RuleItem";
import FillInputComponent from "./components/FillInputComponent";
import BasicButton from "../../components/shared/BasicButton/BasicButton";
import AddRuleComponent from "./AddRuleComponent";
import Loading from "../../components/shared/loading/Loading";
import ModalWrapper from "../modal-wrapper/ModalWrapper";
import { ChainTypes } from "./chain-type";

// this modal use for add new rule or edit exsiting rule
const RuleModal = ({ show, collectionId, update, close, ruleId }) => {
  //
  const { errorToast, successToast } = useToasty();
  const { getApi, postApi, putApi } = useApi();
  // this state for list of rules
  const [Rulelist, setRulelist] = useState([]);
  // this state used for web url address
  const [webUrl, setWebUrl] = useState("");
  //this state used for  rule type
  const [ruleType, setRuleType] = useState(RuleTypes.DISCOUNT);
  //this state used for  chain type
  const [chainType, setChainType] = useState(ChainTypes.ETH);
  //this state used add new rule
  const [addNewRule, setAddNewRule] = useState(false);

  const [loading, setLoading] = useState(false);

  const changeWebUrl = (e) => setWebUrl(e.target.value);

  const changeRuleType = (e) => setRuleType(e.target.value);
  const changeChainType = (e) => setChainType(e.target.value);

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
    setRulelist(initialRuleList);
  };

  const deleteRule = (index) => {
    let newArray = Array.from(Rulelist);
    newArray = newArray.filter((rule, i) => {
      return i != index;
    });
    setRulelist(newArray);
  };

  const addToRules = (newRule) => {
    let currentRuleArray = Array.from(Rulelist);
    currentRuleArray.push(newRule);
    setRulelist(currentRuleArray);
  };

  const editRule = (newRule, index) => {
    let currentRuleArray = Array.from(Rulelist);
    currentRuleArray = currentRuleArray.map((rule, i) => {
      if (index == i) {
        return { ...newRule };
      } else {
        return { ...rule };
      }
    });
    setRulelist(currentRuleArray);
  };

  const submit = async () => {
    const gated = ruleType == RuleTypes.DISCOUNT ? false : true;
    let rulesArray = [];
    rulesArray = Rulelist.map((rule) => {
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
      type: chainType,
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
      {loading ? (
        <Loading />
      ) : (
        <>
          <ModalHeader>Ruleset</ModalHeader>

          <FillInputComponent
            preText={"https://"}
            value={webUrl}
            label="Weburl"
            change={changeWebUrl}
            placeholder={"Your website"}
          />

          <Box mb="20px"></Box>

          <Flex gap={3}>
            <TypeSelect
              value={ruleType}
              onChange={changeRuleType}
              disabled={Rulelist.length > 0}
            >
              <option value={RuleTypes.GATED}>Gating</option>
              <option value={RuleTypes.DISCOUNT}>Discount</option>
            </TypeSelect>
            <TypeSelect
              value={chainType}
              onChange={changeChainType}
              disabled={ChainTypes.length}
            >
              <option value={ChainTypes.ETH}>ETH</option>
              <option value={ChainTypes.CASPER}>CASPER</option>
            </TypeSelect>
          </Flex>
          <Box mb="40px"></Box>

          {Rulelist.length > 0 &&
            Rulelist.map((rule, i) => {
              return (
                <RuleItem
                  rule={rule}
                  deleteFunc={() => {
                    deleteRule(i);
                  }}
                  isGated={ruleType == RuleTypes.GATED}
                  editRule={(newRule) => editRule(newRule, i)}
                />
              );
            })}

          {addNewRule ? (
            <AddRuleComponent
              close={toggleRuleModal}
              isGated={ruleType == RuleTypes.GATED}
              addToRules={addToRules}
            />
          ) : (
            <AddRuleButton onClick={toggleRuleModal}>
              Add new rule
            </AddRuleButton>
          )}

          <Box mb="40px"></Box>
          <Flex w="100%" justifyContent="space-between">
            <Box w="200px">
              <BasicButton click={close}>Cancel</BasicButton>
            </Box>
            <Box w="200px">
              <BasicButton click={submit}>Add</BasicButton>
            </Box>
          </Flex>
        </>
      )}
    </ModalWrapper>
  );
};

export default RuleModal;
