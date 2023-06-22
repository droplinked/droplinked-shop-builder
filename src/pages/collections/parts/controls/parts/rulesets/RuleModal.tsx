import React, { useEffect, useState } from "react";
import { Box, HStack, VStack } from "@chakra-ui/react";
import BasicButton from 'components/common/BasicButton/BasicButton';
import LoadingComponent from 'components/common/loading-component/LoadingComponent';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import AppModal from 'components/common/modal/AppModal';
import AppTextarea from 'components/common/form/textarea/AppTextarea';
import ruleModelContext from "./context";
import TextboxRule from "./parts/textbox/TextboxRule";
import SelectRule from "./parts/select/SelectRule";
import { useMutation } from "react-query";
import { createRuleService, getRuleService, updateRuleService } from "lib/apis/rule/ruleServices";
import useAppToast from "functions/hooks/toast/useToast";
import { RuleTypes } from "./RuleModel";
import { IcreateRuleService, IgetRuleService, IupdateRuleService } from "lib/apis/rule/interfaces";
import AppTypography from 'components/common/typography/AppTypography';
import { ChainTypes } from "lib/utils/statics/chainTypes";
import RulesetAddress from "./parts/address/RulesetAddress";
import FieldLabel from "components/common/form/fieldLabel/FieldLabel";
import RulesetType from "./parts/type/RulesetType";

// this modal use for add new rule or edit exsiting rule
const RuleModal = ({ show, collectionId, update, close, ruleId }) => {
  const [State, setState] = useState(null)
  const getRule = useMutation((params: IgetRuleService) => getRuleService(params))
  const createRule = useMutation((params: IcreateRuleService) => createRuleService(params))
  const updateRule = useMutation((params: IupdateRuleService) => updateRuleService(params))
  const { showToast } = useAppToast()

  useEffect(() => {
    if (ruleId) getRule.mutate({ ruleID: ruleId })
  }, [ruleId])

  useEffect(() => {
    if (getRule.data) setState(getRule.data.data.data)
  }, [getRule])

  const submit = async (data) => {
    const { tag, weburl, chain, rule, discount, address, requirement } = data
    try {
      const requestBody: IcreateRuleService = {
        collectionID: collectionId,
        gated: rule === RuleTypes.GATED,
        rules: [
          {
            addresses: address,
            discountPercentage: +discount,
            nftsCount: +requirement,
            type: chain,
            description: tag,
          },
        ],
        type: chain,
        webUrl: weburl,
        redeemedNFTs: [],
      };
      if (ruleId) {
        await updateRule.mutateAsync({ ruleID: ruleId, data: requestBody })
      } else {
        await createRule.mutateAsync(requestBody)
      }
      update();
      close();
      showToast(`Rule ${ruleId ? "update" : "created"}`, "success")
    } catch (error) {
      showToast("Oops! Something went wrong", "error")
    }
  };

  const formSchema = Yup.object().shape({
    tag: Yup.string().required('Required'),
    weburl: Yup.string().required('Required'),
    chain: Yup.string().required('Required'),
    rule: Yup.string().required('Required'),
    discount: Yup.number().typeError("Please correct value").required('Required'),
    address: Yup.array().min(1, "Required").required("Required"),
    requirement: Yup.number().min(1).max(99).typeError("Please correct value").required('Required'),
  });

  if (!show) return null;

  return (
    <AppModal open={show} isCentered={false} close={close} title="Create Ruleset" size="2xl">
      {false ? (
        <LoadingComponent />
      ) : (
        <Formik
          initialValues={{
            tag: State ? State?.rules ? State?.rules[0].description : '' : '',
            weburl: State ? State?.webUrl : '',
            chain: State ? State?.type : 'ETH',
            rule: State ? State?.gated ? RuleTypes.GATED : RuleTypes.DISCOUNT : true,
            discount: State ? State?.rules ? State?.rules[0].discountPercentage : 0 : 0,
            address: State ? State?.rules ? State?.rules[0].addresses : [] : [],
            requirement: State ? State?.rules ? State?.rules[0].nftsCount : '' : ''
          }}
          enableReinitialize
          validateOnChange={false}
          validationSchema={formSchema}
          onSubmit={submit}
        >

          {({ errors, values, setFieldValue, submitForm }) => (
            <ruleModelContext.Provider value={{ errors, values, setFieldValue, loading: ruleId ? !getRule.isLoading : true }}>
              <VStack width={"100%"} align="stretch" spacing={8}>
                <VStack align="stretch" spacing={1}>
                  <VStack align="stretch" spacing={1}>
                    <FieldLabel label="NFT Gating Message" isRequired />
                    <AppTypography size="12px" color="#9C9C9C">Enter a message for the NFT holders that will be shown in the gating modal.</AppTypography>
                  </VStack>
                  <TextboxRule element={"tag"} placeholder="e.g., Exclusive offer unlocked by the ownership of specific NFT" />
                </VStack>
                <Box><RulesetType /></Box>
                <VStack align="stretch" spacing={1}>
                  <VStack align="stretch" spacing={1}>
                    <FieldLabel label="NFT Info URL" isRequired />
                    <AppTypography size="12px" color="#9C9C9C">Add the link to provide more information about the NFT or marketplace.</AppTypography>
                  </VStack>
                  <TextboxRule element={"weburl"} placeholder="e.g., https://www.opensea.com" />
                </VStack>
                <VStack align="stretch" spacing={1}>
                  <VStack align="stretch" spacing={1}>
                    <FieldLabel label="Blockchain Network" isRequired />
                    <AppTypography size="12px" color="#9C9C9C">Select a blockchain network to validate the ownership of the Required NFTs.</AppTypography>
                  </VStack>
                  <SelectRule
                    element={"chain"}
                    placeholder="Select chain"
                    loading={!getRule.isLoading}
                    items={Object.keys(ChainTypes).map((el) => {
                      return {
                        value: el,
                        caption: el
                      }
                    })}
                  />
                </VStack>
                <Box>
                  <RulesetAddress />
                </Box>
                <VStack align="stretch" spacing={1}>
                  <VStack align="stretch" spacing={1}>
                    <FieldLabel label='Minimum NFT Required' isRequired />
                    <AppTypography size="12px" color="#9C9C9C">Specify the minimum amount of NFTs required to pass the ruleset.</AppTypography>
                  </VStack>
                  <TextboxRule element={"requirement"} placeholder="e.g, 5" />
                </VStack>
                <HStack justifyContent={"space-between"}>
                  <Box width={"35%"}><BasicButton width={"100%"} onClick={close} variant="outline">Cancel</BasicButton></Box>
                  <Box width={"35%"}>
                    <BasicButton
                      width={"100%"}
                      isLoading={createRule.isLoading || getRule.isLoading || updateRule.isLoading}
                      type="submit"
                      onClick={submitForm}
                    >
                      Save
                    </BasicButton>
                  </Box>
                </HStack>
              </VStack>
            </ruleModelContext.Provider>
          )}
        </Formik>
      )}
    </AppModal>
  );
};

export default RuleModal;
