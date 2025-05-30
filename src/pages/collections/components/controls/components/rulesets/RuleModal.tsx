import { Box, HStack, VStack } from "@chakra-ui/react";
import LoadingSpinner from "components/common/loading-spinner/LoadingSpinner";
import AppSkeleton from "components/common/skeleton/AppSkeleton";
import AppTypography from "components/common/typography/AppTypography";
import AppButton from "components/redesign/button/AppButton";
import AppSelect from "components/redesign/select/AppSelect";
import { Formik } from "formik";
import useAppToast from "hooks/toast/useToast";
import { IcreateRuleService, IupdateRuleService } from "services/rule/interfaces";
import { createRuleService, getRuleService, rulesetChainsService, updateRuleService } from "services/rule/ruleServices";
import { useCheckPermission } from "stores/app/appStore";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import RulesetAddress from "./components/address/RulesetAddress";
import FieldLabel from "./components/labels/fieldLabel/FieldLabel";
import ModalWrapper from "./components/ModalWrapper";
import TextboxRule from "./components/textbox/TextboxRule";
import RulesetType from "./components/type/RulesetType";
import ruleModelContext from "./context";
import { IFormData, getRuleModalFormConfig, makeInitialValues } from "./formConfig";
import useLocaleResources from "hooks/useLocaleResources/useLocaleResources";

// This modal is used to add a new rule or edit an existing rule
const RuleModal = ({ show, collectionId, close, ruleId }) => {
    const { t } = useLocaleResources("collections");
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
            showToast({ message: ruleId ? t("ruleset.updateSuccess") : t("ruleset.createSuccess"), type: "success" });
        } catch (error) {
            showToast({ message: t("genericErrorMessage"), type: "error" });
        }
    };


    if (!show) return null;

    return (
        <ModalWrapper isOpen={show} onClose={close} ruleId={ruleId}>
            {
                getRule.isLoading ?
                    <LoadingSpinner />
                    :
                    <Formik
                        initialValues={makeInitialValues(getRule?.data?.data?.data)}
                        enableReinitialize
                        validateOnChange={false}
                        validationSchema={getRuleModalFormConfig(t)}
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
                                    <HStack borderTop={"1px solid"} borderColor="neutral.gray.800" py={"2rem"} justifyContent={"space-between"}>
                                        <AppButton width={"79px"} onClick={close} variant="outlined">
                                            {t("ruleset.cancel")}
                                        </AppButton>
                                        <AppButton width={"79px"} isLoading={createRule.isLoading || getRule.isLoading || updateRule.isLoading} type="submit" onClick={submitForm}>
                                            {t("ruleset.save")}
                                        </AppButton>
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

const BlockchainNetworkSelect = ({ chains, values, errors, setFieldValue, getRule }) => {
    const { t } = useLocaleResources("collections");
    return (
        <VStack align="stretch" spacing={"16px"}>
            <VStack align="stretch" spacing={"4px"}>
                <FieldLabel label={t("ruleset.blockchainNetwork")} isRequired />
                <AppTypography fontSize="14px" color="#7b7b7b">
                    {t("ruleset.blockchainNetworkDescription")}
                </AppTypography>
            </VStack>
            <AppSkeleton isLoaded={!getRule.isLoading && !chains.isLoading}>
                <AppSelect
                    selectProps={{
                        name: "chain",
                        placeholder: t("ruleset.selectChain"),
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
    )
};

const GatingMessageInput = () => {
    const { t } = useLocaleResources("collections");
    return (
        <TextboxRule
            isRequired={true}
            label={t("ruleset.gatingMessage")}
            description={t("ruleset.gatingMessageDescription")}
            element={"description"}
            placeholder={t("ruleset.gatingMessagePlaceholder")}
        />
    )
};

const MinimumAssetsRequiredInput = () => {
    const { t } = useLocaleResources("collections");
    return (
        <HStack align="stretch" spacing={2} width={"100%"}>
            <VStack align="stretch" spacing={1} width={"100%"}>
                <FieldLabel label={t("ruleset.minimumAssets")} isRequired />
                <AppTypography fontSize="14px" color="#7b7b7b">
                    {t("ruleset.minimumAssetsDescription")}
                </AppTypography>
            </VStack>
            <Box width={"20%"} ml={"0.5rem"}>
                <TextboxRule isRequired={true} element={"minimumNftRequired"} placeholder={t("ruleset.minimumAssetsPlaceholder")} />
            </Box>
        </HStack>
    )
};

const NftUrlInput = () => {
    const { t } = useLocaleResources("collections");
    return (
        <TextboxRule
            label={t("ruleset.nftUrl")}
            description={t("ruleset.nftUrlDescription")}
            isRequired={false}
            element={"nftPurchaseLink"}
            placeholder={t("ruleset.nftUrlPlaceholder")}
        />
    )
};