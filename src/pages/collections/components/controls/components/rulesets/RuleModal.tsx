import { Box, HStack, VStack } from "@chakra-ui/react";
import LoadingComponent from "components/common/loading-component/LoadingComponent";
import AppTypography from "components/common/typography/AppTypography";
import Button from "components/redesign/button/Button";
import FieldLabel from "./components/labels/fieldLabel/FieldLabel";
import { Formik } from "formik";
import useAppToast from "functions/hooks/toast/useToast";
import { IcreateRuleService, IupdateRuleService } from "lib/apis/rule/interfaces";
import { createRuleService, getRuleService, rulesetChainsService, updateRuleService } from "lib/apis/rule/ruleServices";
import { useCheckPermission } from "lib/stores/app/appStore";
import AppErrors from "lib/utils/statics/errors/errors";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import RulesetAddress from "./components/address/RulesetAddress";
import ModalWrapper from "./components/ModalWrapper";
import TextboxRule from "./components/textbox/TextboxRule";
import RulesetType from "./components/type/RulesetType";
import ruleModelContext from "./context";
import { IFormData, makeInitialValues, ruleModalFormConfig } from "./formConfig";
import Select from "components/redesign/select/AppSelect";
import AppSkeleton from "components/common/skeleton/AppSkeleton";

// This modal is used to add a new rule or edit an existing rule
const RuleModal = ({ show, collectionId, close, ruleId }) => {
    const queryClient = useQueryClient()
    const checkPermissionAndShowToast = useCheckPermission()
    const getRule = useQuery({
        queryKey: ["getRule", ruleId],
        queryFn: () => getRuleService({ ruleID: ruleId }),
        enabled: !!ruleId,
    });
    const createRule = useMutation((params: IcreateRuleService) => createRuleService(params));
    const updateRule = useMutation((params: IupdateRuleService) => updateRuleService(params));
    const chains = useQuery({
        queryKey: "chains_query",
        queryFn: rulesetChainsService,
        cacheTime: 60 * 60 * 1000,
    });
    const { showToast } = useAppToast();
    const submit = async (data: IFormData) => {
        const { description, nftPurchaseLink, chain, blockchainType, type, discountPercentage, address, minimumNftRequired } = data;
        try {
            const requestBody: IcreateRuleService = {
                collectionID: collectionId,
                type: type,
                discountPercentage: +discountPercentage,
                blockchainType: blockchainType,
                description: description,
                minimumNftRequired: +minimumNftRequired,
                nftContractAddresses: address,
                nftPurchaseLink: nftPurchaseLink,
                network: chain,
            };
            if (ruleId) {
                await updateRule.mutateAsync({ ruleID: ruleId, data: requestBody });
            } else {
                if (!checkPermissionAndShowToast("rulesets")) return
                await createRule.mutateAsync(requestBody)
            }
            queryClient.invalidateQueries({ queryKey: ['collectionList'] })
            close();
            showToast({ message: AppErrors.collection[ruleId ? "ruleset_update" : "ruleset_create"], type: "success" });
        } catch (error) {
            showToast({ message: "Oops! Something went wrong", type: "error" });
        }
    };


    if (!show) return null;

    return (
        <ModalWrapper isOpen={show} onClose={close} ruleId={ruleId}>
            {
                getRule.isLoading ?
                    <LoadingComponent />
                    :
                    <Formik
                        initialValues={makeInitialValues(getRule?.data?.data?.data)}
                        enableReinitialize
                        validateOnChange={false}
                        validationSchema={ruleModalFormConfig}
                        onSubmit={submit}
                    >
                        {({ errors, values, setFieldValue, submitForm }) => (
                            <ruleModelContext.Provider value={{ errors, values, setFieldValue, loading: !getRule.isLoading }}>
                                <VStack background={"#1E1E1E"} py={"2rem"} px={{ lg: "48px !important", md: "32px !important", base: "16px !important" }} width={"100%"} align="stretch" spacing={8}>
                                    <BlockchainNetworkSelect chains={chains} values={values} errors={errors} setFieldValue={setFieldValue} getRule={getRule} />
                                    <RulesetAddress />
                                    <GatingMessageInput />
                                    <MinimumAssetsRequiredInput />
                                    <NftUrlInput />
                                    <Box>
                                        <RulesetType />
                                    </Box>
                                    <HStack borderTop={"1px solid #292929"} py={"2rem"} justifyContent={"space-between"}>
                                        <Button fontSize={"14px"} width={"79px"} onClick={close} variant="outline">
                                            Cancel
                                        </Button>
                                        <Button fontSize={"14px"} width={"79px"} isLoading={createRule.isLoading || getRule.isLoading || updateRule.isLoading} type="submit" onClick={submitForm}>
                                            Save
                                        </Button>
                                    </HStack>
                                </VStack>
                            </ruleModelContext.Provider>
                        )}
                    </Formik>
            }
        </ModalWrapper>

    )
}

export default RuleModal

const BlockchainNetworkSelect = ({ chains, values, errors, setFieldValue, getRule }) => (
    <VStack align="stretch" spacing={"16px"}>
        <VStack align="stretch" spacing={"4px"}>
            <FieldLabel label="Blockchain Network" isRequired />
            <AppTypography fontSize="14px" color="#7b7b7b">
                Choose a blockchain to verify possession or ownership of a required digital asset/NFT.
            </AppTypography>
        </VStack>
        <AppSkeleton isLoaded={!getRule.isLoading && !chains.isLoading}>
            <Select
                selectProps={{
                    name: "chain",
                    placeholder: "Select chain",
                    onChange: (e) => {
                        setFieldValue("chain", e.target.value)
                    },
                    isRequired: true,
                    value: values["chain"]
                }}
                items={
                    chains?.data
                        ? chains?.data?.data?.data?.networks?.map((el) => {
                            return {
                                value: el.chain,
                                caption: el.name,
                            };
                        })
                        : []
                }
                valueAccessor="value"
                labelAccessor="caption"
                error={typeof errors["chain"] === "string" ? errors["chain"] : null}
            />
        </AppSkeleton>
    </VStack>
);

const GatingMessageInput = () => (
    <TextboxRule isRequired={true} label="Gating Message" description="Provide the text to display to visitors that will appear inside the access modal." element={"description"} placeholder="e.g., StreamWave" />
);

const MinimumAssetsRequiredInput = () => (
    <HStack align="stretch" spacing={2} width={"100%"}>
        <VStack align="stretch" spacing={1} width={"100%"}>
            <FieldLabel label="Minimum Assets Required" isRequired />
            <AppTypography fontSize="14px" color="#7b7b7b">
                Set the minimum number of digital assets/NFTs a user must hold to meet this ruleset minimumNftRequired.
            </AppTypography>
        </VStack>
        <Box width={"20%"} ml={"0.5rem"}>
            <TextboxRule isRequired={true} element={"minimumNftRequired"} placeholder="e.g., 5" />
        </Box>
    </HStack>
);

const NftUrlInput = () => (
    <TextboxRule label={"NFT URL"} description="Choose this option to display the marketplace listing page to visitors where the collection is officially being traded." isRequired={false} element={"nftPurchaseLink"} placeholder="Paste link to your NFT page or marketplace here" />
);