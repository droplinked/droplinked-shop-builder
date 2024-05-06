import { Box, HStack, VStack } from "@chakra-ui/react";
import BasicButton from "components/common/BasicButton/BasicButton";
import FieldLabel from "components/common/form/fieldLabel/FieldLabel";
import LoadingComponent from "components/common/loading-component/LoadingComponent";
import AppModal from "components/common/modal/AppModal";
import AppTypography from "components/common/typography/AppTypography";
import { Formik } from "formik";
import useAppToast from "functions/hooks/toast/useToast";
import { IcreateRuleService, IgetRuleService, IgetRuleTypeService, IupdateRuleService } from "lib/apis/rule/interfaces";
import { createRuleService, getRuleService, rulesetChainsService, rulesetTypeService, updateRuleService } from "lib/apis/rule/ruleServices";
import { capitalizeFirstLetter } from "lib/utils/heper/helpers";
import AppErrors from "lib/utils/statics/errors/errors";
import React, { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "react-query";
import * as Yup from "yup";
import ruleModelContext from "./context";
import RulesetAddress from "./parts/address/RulesetAddress";
import SelectRule from "./parts/select/SelectRule";
import TextboxRule from "./parts/textbox/TextboxRule";
import RulesetType from "./parts/type/RulesetType";
import { RuleTypes } from "./RuleModel";
import SelectType from "./parts/select/selectType";
import AppSelectBox from "components/common/form/select/AppSelectBox";

// this modal use for add new rule or edit exsiting rule
const RuleModal = ({ show, collectionId, update, close, ruleId }) => {
    const [State, setState] = useState(null);
    const getRule = useMutation((params: IgetRuleService) => getRuleService(params));
    const createRule = useMutation((params: IcreateRuleService) => createRuleService(params));
    const updateRule = useMutation((params: IupdateRuleService) => updateRuleService(params));
    const availableRuleTypes = useMutation((params: IgetRuleTypeService) => rulesetTypeService(params));
    const chains = useQuery({
        queryKey: "chains_query",
        queryFn: rulesetChainsService,
        cacheTime: 60 * 60 * 1000,
        refetchOnWindowFocus: false,
    });

    const { showToast } = useAppToast();

    useEffect(() => {
        if (ruleId) getRule.mutate({ ruleID: ruleId });
    }, [ruleId]);

    useEffect(() => {
        if (getRule.data) {
            setState(getRule.data.data.data);
            if(getRule?.data?.data?.data?.type) availableRuleTypes.mutate({chain: getRule?.data?.data?.data?.type})
        }else if(!ruleId){
            availableRuleTypes.mutate({chain: "ETH"})
    }
    }, [getRule.data]);

    const submit = async (data) => {
        const { tag, weburl, chain, ruleType, rule, discount, address, requirement } = data;
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
                ruleType: ruleType,
                redeemedNFTs: [],
            };
            if (ruleId) {
                await updateRule.mutateAsync({ ruleID: ruleId, data: requestBody });
            } else {
                await createRule.mutateAsync(requestBody);
            }
            update();
            close();
            showToast({ message: AppErrors.collection[ruleId ? "ruleset_update" : "ruleset_create"], type: "success" });
        } catch (error) {
            showToast({ message: "Oops! Something went wrong", type: "error" });
        }
    };

    const formSchema = Yup.object().shape({
        tag: Yup.string().required("Required"),
        weburl: Yup.string().required("Required"),
        chain: Yup.string().required("Required"),
        rule: Yup.string().required("Required"),
        discount: Yup.number().min(0).typeError("Please correct value").required("Required"),
        address: Yup.array().min(1, "Required").required("Required"),
        requirement: Yup.number().min(1).max(99).typeError("Please correct value").required("Required"),
    });

    if (!show) return null;

    return (
        <AppModal open={show} isCentered={false} close={close} title="Create Ruleset" size="2xl">
            {false ? (
                <LoadingComponent />
            ) : (
                <Formik
                    initialValues={{
                        tag: State ? (State?.rules ? State?.rules[0].description : "") : "",
                        weburl: State ? State?.webUrl : "",
                        chain: State ? State?.type : "ETH",
                        ruleType: State ? State?.ruleType : "NFT",
                        rule: State ? (State?.gated ? RuleTypes.GATED : RuleTypes.DISCOUNT) : RuleTypes.GATED,
                        discount: State ? (State?.rules ? State?.rules[0].discountPercentage : 0) : 0,
                        address: State ? (State?.rules ? State?.rules[0].addresses : []) : [],
                        requirement: State ? (State?.rules ? State?.rules[0].nftsCount : "") : "",
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
                                        <AppTypography fontSize="12px" color="#9C9C9C">
                                            Enter a message for the NFT holders that will be shown in the gating modal.
                                        </AppTypography>
                                    </VStack>
                                    <TextboxRule element={"tag"} placeholder="e.g., Exclusive offer unlocked by the ownership of specific NFT" />
                                </VStack>
                                <Box>
                                    <RulesetType />
                                </Box>
                                <VStack align="stretch" spacing={1}>
                                    <VStack align="stretch" spacing={1}>
                                        <FieldLabel label="NFT Info URL" isRequired />
                                        <AppTypography fontSize="12px" color="#9C9C9C">
                                            Add the link to provide more information about the NFT or marketplace.
                                        </AppTypography>
                                    </VStack>
                                    <TextboxRule element={"weburl"} placeholder="e.g., https://www.opensea.com" />
                                </VStack>
                                <VStack align="stretch" spacing={1}>
                                    <VStack align="stretch" spacing={1}>
                                        <FieldLabel label="Blockchain Network" isRequired />
                                        <AppTypography fontSize="12px" color="#9C9C9C">
                                            Select a blockchain network to validate the ownership of the Required NFTs.
                                        </AppTypography>
                                    </VStack>
                                    <AppSelectBox
                                        name={"chain"}
                                        placeholder="Select chain"
                                        onChange={(e) => {
                                          setFieldValue("chain", e.target.value)
                                          availableRuleTypes.mutate({chain: e.target.value})
                                        }}
                                        items={
                                            chains.data
                                                ? chains.data?.data?.data.map((el) => {
                                                      return {
                                                          value: el,
                                                          caption: capitalizeFirstLetter(el),
                                                      };
                                                  })
                                                : []
                                        }
                                        value={values["chain"]}
                                        error={typeof errors["chain"] === "string" ? errors["chain"] : null}
                                        loading={!getRule.isLoading && !chains.isLoading}
                                        isRequired
                                    />
                                </VStack>
                                <VStack align="stretch" spacing={1}>
                                    <VStack align="stretch" spacing={1}>
                                        <FieldLabel label="Ruleset Type" isRequired />
                                        <AppTypography fontSize="12px" color="#9C9C9C">
                                            Select a Ruleset type to validate the rules over them.
                                        </AppTypography>
                                    </VStack>
                                    <AppSelectBox
                                        name={"ruleType"}
                                        placeholder="Select Rule Type"
                                        onChange={(e) => setFieldValue("ruleType", e.target.value)}
                                        items={
                                            availableRuleTypes.data
                                                ? availableRuleTypes.data?.data?.data.map((el) => {
                                                      return {
                                                          value: el,
                                                          caption: capitalizeFirstLetter(el),
                                                      };
                                                  })
                                                : []
                                        }
                                        value={values["ruleType"]}
                                        error={typeof errors["ruleType"] === "string" ? errors["ruleType"] : null}
                                        loading={!getRule.isLoading && !chains.isLoading && !availableRuleTypes.isLoading}
                                        isRequired
                                    />
                                </VStack>
                                <Box>
                                    <RulesetAddress />
                                </Box>
                                <VStack align="stretch" spacing={1}>
                                    <VStack align="stretch" spacing={1}>
                                        <FieldLabel label="Minimum NFT Required" isRequired />
                                        <AppTypography fontSize="12px" color="#9C9C9C">
                                            Specify the minimum amount of NFTs required to pass the ruleset.
                                        </AppTypography>
                                    </VStack>
                                    <TextboxRule element={"requirement"} placeholder="e.g., 5" />
                                </VStack>
                                <HStack justifyContent={"space-between"}>
                                    <Box width={"35%"}>
                                        <BasicButton width={"100%"} onClick={close} variant="outline">
                                            Cancel
                                        </BasicButton>
                                    </Box>
                                    <Box width={"35%"}>
                                        <BasicButton width={"100%"} isLoading={createRule.isLoading || getRule.isLoading || updateRule.isLoading} type="submit" onClick={submitForm}>
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
