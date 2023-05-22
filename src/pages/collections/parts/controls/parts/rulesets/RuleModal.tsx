import React, { useEffect, useState } from "react";
import { Box, HStack, VStack } from "@chakra-ui/react";
import BasicButton from "common/BasicButton/BasicButton";
import LoadingComponent from "common/loading-component/LoadingComponent";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import AppModal from "common/modal/AppModal";
import AppTextarea from "common/form/textarea/AppTextarea";
import ruleModelContext from "./context";
import TextboxRule from "./parts/textbox/TextboxRule";
import SelectRule from "./parts/select/SelectRule";
import { useMutation } from "react-query";
import { createRuleService, getRuleService, updateRuleService } from "lib/apis/rule/ruleServices";
import useAppToast from "hooks/toast/useToast";
import { RuleTypes } from "./RuleModel";
import { IcreateRuleService, IgetRuleService, IupdateRuleService } from "lib/apis/rule/interfaces";
import AppTypography from "common/typography/AppTypography";
import { ChainTypes } from "lib/utils/statics/chainTypes";

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
        gated: rule === RuleTypes.DISCOUNT,
        rules: [
          {
            addresses: address?.split(","),
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
    address: Yup.string().required('Required'),
    requirement: Yup.number().min(1).max(99).typeError("Please correct value").required('Required'),
  });

  if (!show) return null;

  return (
    <AppModal
      open={show}
      close={close}
      contentProps={{ maxWidth: "700px", width: "95%", padding: "40px" }}
    >
      <AppTypography size="18px" weight="bolder">Make Rule</AppTypography>
      {false ? (
        <LoadingComponent />
      ) : (
        <Formik
          initialValues={{
            tag: State ? State?.rules ? State?.rules[0].description : '' : '',
            weburl: State ? State?.webUrl : '',
            chain: State ? State?.type : 'ETH',
            rule: State ? State?.gated ? RuleTypes.DISCOUNT : RuleTypes.GATED : true,
            discount: State ? State?.rules ? State?.rules[0].discountPercentage : 0 : 0,
            address: State ? State?.rules ? State?.rules[0].addresses[0] : '' : '',
            requirement: State ? State?.rules ? State?.rules[0].nftsCount : '' : ''
          }}
          enableReinitialize
          validateOnChange={false}
          validationSchema={formSchema}
          onSubmit={submit}
        >

          {({ errors, values, setFieldValue }) => (
            <ruleModelContext.Provider value={{ errors, values, setFieldValue, loading: ruleId ? !getRule.isLoading : true }}>
              <Form>
                <VStack width={"100%"} align="stretch" spacing={8}>
                  <Box>
                    <TextboxRule element={"tag"} placeholder="tag" label={"Tag name"} />
                  </Box>
                  <Box>
                    <TextboxRule element={"weburl"} placeholder="url ..." label={"NFT source domain"} />
                  </Box>
                  <Box>
                    <SelectRule
                      element={"chain"}
                      placeholder="Select chain"
                      label={"Chain Type"}
                      loading={!getRule.isLoading}
                      items={Object.keys(ChainTypes).map((el) => {
                        return {
                          value: el,
                          caption: el
                        }
                      })}
                    />
                  </Box>
                  <HStack alignItems={"baseline"}>
                    <Box width={"100%"}>
                      <SelectRule
                        element={"rule"}
                        placeholder="Select rule"
                        label={"Rule Type"}
                        loading={!getRule.isLoading}
                        items={Object.keys(RuleTypes).map((el) => {
                          return {
                            value: el,
                            caption: el
                          }
                        })}
                      />
                    </Box>
                    {values.rule === RuleTypes.DISCOUNT && (
                      <Box width={"100%"}>
                        <TextboxRule element={"discount"} placeholder="%20" label={"Offer"} />
                      </Box>
                    )}
                  </HStack>
                  <Box>
                    <AppTextarea
                      name="address"
                      placeholder="you can separate nft links with ,"
                      label="NFT asset identifiers"
                      onChange={(e) => setFieldValue("address", e.target.value)}
                      value={values.address}
                      loading={!getRule.isLoading}
                      error={errors.address ? errors.address.toString() : ""}
                      isRequired
                    />
                  </Box>
                  <Box width={"100%"}>
                    <TextboxRule element={"requirement"} placeholder="number ..." label={"Minimum Requirement"} />
                  </Box>
                  <HStack justifyContent={"space-between"}>
                    <Box width={"35%"}><BasicButton width={"100%"} onClick={close} variant="outline">Cancel</BasicButton></Box>
                    <Box width={"35%"}>
                      <BasicButton
                        width={"100%"}
                        isLoading={createRule.isLoading || getRule.isLoading || updateRule.isLoading}
                        type="submit">
                        Save
                      </BasicButton>
                    </Box>
                  </HStack>
                </VStack>
              </Form>
            </ruleModelContext.Provider>
          )}
        </Formik>
      )}
    </AppModal>
  );
};

export default RuleModal;
