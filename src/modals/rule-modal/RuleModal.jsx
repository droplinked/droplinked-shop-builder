import { useApi } from "hooks/useApi/useApi";
import { useEffect, useState } from "react";
import { RuleTypes } from "./rule-type";
import {
  getRulesetById,
  postCreateRuleset,
  putUpdateRuleset,
} from "apis/rulesetApiService";
import ModalWrapper from "modals/modal-wrapper/ModalWrapper";
import {
  ModalHeader,
  OptionComponent,
  SelectComponent,
} from "./RuleModal-style";
import { Box, Flex, Stack } from "@chakra-ui/react";
import InputFieldComponent from "components/shared/input-field-component/InputFieldComponent";
import BasicButton from "components/shared/BasicButton/BasicButton";
import LoadingComponent from "components/shared/loading-component/LoadingComponent";
import { ChainTypes } from "./chain-type";

// this modal use for add new rule or edit exsiting rule
const RuleModal = ({ show, collectionId, update, close, ruleId }) => {
  const { getApi, postApi, putApi } = useApi();
  const [webUrl, setWebUrl] = useState("");
  const [discount, setDiscount] = useState("");
  const [chainType, setChainType] = useState("");
  const [tagName, setTagName] = useState("");
  const [counter, setCounter] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [ruleType, setRuleType] = useState(RuleTypes.DISCOUNT);
  const [loading, setLoading] = useState(false);
  //
  const changeWebUrl = (e) => setWebUrl(e.target.value);
  const changeRuleType = (e) => setRuleType(e.target.value);
  const changeDiscount = (e) => setDiscount(e.target.value);
  const changeChainType = (e) => setChainType(e.target.value);
  const changeTagName = (e) => setTagName(e.target.value);
  const changeCounter = (e) => setCounter(e.target.value);
  const changeAddresses = (e) => setAddresses(e.target.value);
  //
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

  const initializeRule = (rule) => {
    if (rule.gated) setRuleType(RuleTypes.GATED);
    setWebUrl(rule.webUrl);
    setDiscount(rule.rules?.[0]?.discountPercentage);
    setChainType(rule.rules?.[0]?.type);
    setTagName(rule.rules?.[0]?.description);
    setCounter(rule.rules?.[0]?.nftsCount ? rule.rules?.[0]?.nftsCount : "");
    setAddresses(rule.rules?.[0]?.addresses.join(","));
  };

  const submit = async () => {
    const gated = ruleType == RuleTypes.DISCOUNT ? false : true;
    const requestBody = {
      collectionID: collectionId,
      gated: gated,
      rules: {
        addresses: addresses?.split(","),
        type: chainType,
        discountPercentage: +discount,
        nftsCount: +counter,
        description: tagName,
      },
      webUrl: webUrl,
      redeemedNFTs: [],
    };

    if (ruleId) {
      await putApi(putUpdateRuleset(ruleId, requestBody));
    } else {
      await postApi(postCreateRuleset(requestBody));
    }
    update();
    close();
  };

  if (!show) return null;

  return (
    <ModalWrapper show={show} close={close}>
      <ModalHeader>Make Rule</ModalHeader>
      {loading ? (
        <LoadingComponent />
      ) : (
        <Stack spacing={6}>
          <InputFieldComponent
            label="Tag Name"
            placeholder="Ruleset 1"
            description="description"
            value={tagName}
            change={changeTagName}
          />
          <InputFieldComponent
            label="NFT source domain"
            placeholder="https://www.opensea.com"
            description="description"
            value={webUrl}
            change={changeWebUrl}
          />
          <Box width="100%">
            <Box color="white">Chain Type</Box>
            <SelectComponent
              width="100%"
              mt={2}
              value={chainType}
              onChange={changeChainType}
              // disabled={RuleList.length > 0}
            >
              <OptionComponent value={ChainTypes.ETH}>
                {/* <Image src={discountIcon} w="16px" h="16px" /> */}
                ETH
              </OptionComponent>
              <OptionComponent value={ChainTypes.CASPER}>
                {/* <Image src={gatedIcon} w="16px" h="16px" /> */}
                CASPER
              </OptionComponent>
            </SelectComponent>
          </Box>
          <Flex gap={2}>
            <Box width="100%">
              <Box color="white">Rule type</Box>
              <SelectComponent
                width="100%"
                mt={2}
                value={ruleType}
                onChange={changeRuleType}
                // disabled={RuleList.length > 0}
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
            {ruleType === "DISCOUNT" && (
              <InputFieldComponent
                label="Offer"
                placeholder="%20"
                value={discount}
                change={changeDiscount}
                description="description"
              />
            )}
          </Flex>
          <InputFieldComponent
            textArea
            label="NFT asset identifiers"
            placeholder="you can separate nft links with ,"
            value={addresses}
            change={changeAddresses}
          />

          <InputFieldComponent
            label="Minimum Requirement"
            placeholder="4"
            description="description"
            value={counter}
            change={changeCounter}
          />

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
      )}
    </ModalWrapper>
  );
};

export default RuleModal;
