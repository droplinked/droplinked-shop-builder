import {
  RuleModalWrapper,
  RuleModalCotent,
  ModalHeader,
  AddRuleButton,
  TypeSelect,
} from "./rule-modal-style";
import { Box, Flex } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { convertArrayToAddress } from "./rule-utils";
import {
  addRuleset,
  getRuleById,
  updateRule,
} from "../../../api/producer/Ruleset-api";
import { useToasty } from "../../../context/toastify/ToastContext";
import { RuleTypes } from "./rule-type";

// import deleteIcon from "../../../assest/icon/delete-icon.svg";
import RuleItem from "./rule-item";
import FillInput from "../../shared/FillInput/FillInput";
import BasicButton from "../../shared/BasicButton/BasicButton";
import AddRuleComponent from "./rule-component";
import Loading from "../../shared/loading/Loading";

// this modal use for add new rule or edit exsiting rule
const Rule = ({ collectionId, update, close, ruleId }) => {
  // ............
  const { errorToast, successToast } = useToasty();
  // this state for list of rules
  const [Rulelist, setRulelist] = useState([]);
  // this state used for web url address
  const [webUrl, setWebUrl] = useState("");
  //this state used for  rule type
  const [ruleType, setRuleType] = useState(RuleTypes.DISCOUNT);
  //this state used add new rule
  const [addNewRule, setAddNewRule] = useState(false);

  const [loading, setLoading] = useState(false);

  const changeWebUrl = (e) => setWebUrl(e.target.value);

  const chnageRuleType = (e) => setRuleType(e.target.value);

  const toggleRuleModal = () => setAddNewRule((p) => !p);

  useEffect(() => {
    if (ruleId != undefined) {
      getRuleData();
    }
  }, []);

  const getRuleData = async () => {
    setLoading(true);
    let result = await getRuleById(ruleId);
    setLoading(false);
    if (result.status == "success") initializeRule(result.data.ruleSet);
  };

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
    let result;
    if (ruleId != undefined)
      result = await updateRule(
        ruleId,
        collectionId,
        rulesArray,
        webUrl,
        gated
      );
    else result = await addRuleset(collectionId, rulesArray, webUrl, gated);
    update();
    close();
  };

  return (
    <RuleModalWrapper>
      <RuleModalCotent>
        {loading ? (
          <Loading />
        ) : (
          <>
            <ModalHeader>Ruleset</ModalHeader>

            <FillInput
              preText={"https://"}
              value={webUrl}
              label="Weburl"
              change={changeWebUrl}
              placeholder={"Your website"}
            />

            <Box mb="20px"></Box>

            <TypeSelect
              value={ruleType}
              onChange={chnageRuleType}
              disabled={Rulelist.length > 0}
            >
              <option value={RuleTypes.GATED}>Gating</option>
              <option value={RuleTypes.DISCOUNT}>Discount</option>
            </TypeSelect>

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
      </RuleModalCotent>
    </RuleModalWrapper>
  );
};

export default Rule;
