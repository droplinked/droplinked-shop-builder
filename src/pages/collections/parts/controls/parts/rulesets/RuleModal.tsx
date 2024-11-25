import { Box, HStack, VStack } from "@chakra-ui/react";
import BasicButton from "components/redesign/BasicButton/BasicButton";
import FieldLabel from "components/redesign/form/fieldLabel/FieldLabel";
import AppSelectBox from "components/redesign/form/select/AppSelectBox";
import LoadingComponent from "components/common/loading-component/LoadingComponent";
import AppModal from "components/redesign/modal/AppModal";
import AppTypography from "components/common/typography/AppTypography";
import { Formik } from "formik";
import useAppToast from "functions/hooks/toast/useToast";
import { IcreateRuleService, IgetRuleService, IgetRuleTypeService, IupdateRuleService } from "lib/apis/rule/interfaces";
import { createRuleService, getRuleService, rulesetChainsService, rulesetTypeService, updateRuleService } from "lib/apis/rule/ruleServices";
import { useCheckPermission } from "lib/stores/app/appStore";
import { capitalizeFirstLetter } from "lib/utils/helpers/helpers";
import AppErrors from "lib/utils/statics/errors/errors";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import * as Yup from "yup";
import { RuleTypes } from "./RuleModel";
import ruleModelContext from "./context";
import RulesetAddress from "./parts/address/RulesetAddress";
import TextboxRule from "./parts/textbox/TextboxRule";
import RulesetType from "./parts/type/RulesetType";
import ModalHeaderData from "components/redesign/modal/ModalHeaderData";
import AppIcons from "assest/icon/Appicons";

// This modal is used to add a new rule or edit an existing rule
const RuleModal = ({ show, collectionId, close, ruleId }) => {
    const queryClient = useQueryClient()
    const checkPermissionAndShowToast = useCheckPermission()
    const [State, setState] = useState(null);
    const getRule = useMutation((params: IgetRuleService) => getRuleService(params));
    const createRule = useMutation((params: IcreateRuleService) => createRuleService(params));
    const updateRule = useMutation((params: IupdateRuleService) => updateRuleService(params));
    const chains = useQuery({
        queryKey: "chains_query",
        queryFn: rulesetChainsService,
        cacheTime: 60 * 60 * 1000,
    });
    const { showToast } = useAppToast();

    useEffect(() => {
        if (ruleId) getRule.mutate({ ruleID: ruleId });
    }, [ruleId]);

    useEffect(() => {
        if (getRule.data) {
            setState(getRule.data.data.data);
            console.log(getRule.data.data.data)
        }
    }, [getRule.data]);

    const submit = async (data) => {
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
    const formSchema = Yup.object().shape({
        description: Yup.string().required("Required"),
        nftPurchaseLink: Yup.string().optional(),
        chain: Yup.string().required("Required"),
        type: Yup.string().required("Required"),
        discountPercentage: Yup.number().min(0).optional(),
        address: Yup.array().min(1, "Required").required("Required"),
        minimumNftRequired: Yup.number().min(1).max(99).typeError("Please correct value").required("Required"),
    });

    if (!show) return null;

    return (
        <AppModal modalRootProps={{ isOpen: show, onClose: close, isCentered: false, size: "2xl" }} modalContentProps={{ background: "#141414", px: "0px", sx: { paddingInline: "0px", paddingBlock: "0px", paddingTop: "48px" } }}>
            <ModalHeaderData icon={<AppIcons.RulesetModalIcon />}
                backgroundColor='#141414'
                modalHeaderProps={{ px: { lg: "48px !important", md: "32px !important", base: "16px !important" }, padding: "0px", paddingBlock: "0px" }}
                title={`${ruleId ? "Edit" : "Create"} Ruleset`}
                description={ruleId ? 'Edit the details of your ruleset.' : 'Create a new ruleset by providing the necessary details.'}
            />
            {
                false ?
                    <LoadingComponent />
                    :
                    <Formik
                        initialValues={{
                            description: State?.description || "",
                            nftPurchaseLink: State?.nftPurchaseLink || "",
                            chain: State?.network || "ETH",
                            blockchainType: State?.blockchainType || "NFT",
                            type: State?.type || "GATING",
                            discountPercentage: State?.discountPercentage || 0,
                            address: State?.nftContractAddresses || [""],
                            minimumNftRequired: State?.minimumNftRequired || ""
                        }}
                        enableReinitialize
                        validateOnChange={false}
                        validationSchema={formSchema}
                        onSubmit={submit}
                    >
                        {({ errors, values, setFieldValue, submitForm }) => (
                            <ruleModelContext.Provider value={{ errors, values, setFieldValue, loading: ruleId ? !getRule.isLoading : true }}>
                                <VStack background={"#1E1E1E"} py={"2rem"} px={{ lg: "48px !important", md: "32px !important", base: "16px !important" }} width={"100%"} align="stretch" spacing={8}>
                                    <VStack align="stretch" spacing={"16px"}>
                                        <VStack align="stretch" spacing={"4px"}>
                                            <FieldLabel label="Blockchain Network" isRequired />
                                            <AppTypography fontSize="14px" color="#7b7b7b">
                                                Choose a blockchain to verify possession or ownership of a required digital asset/NFT.
                                            </AppTypography>
                                        </VStack>
                                        <AppSelectBox
                                            name={"chain"}
                                            placeholder="Select chain"
                                            onChange={(data) => {
                                                setFieldValue("chain", data?.value)
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
                                            value={values["chain"]}
                                            error={typeof errors["chain"] === "string" ? errors["chain"] : null}
                                            loading={!getRule.isLoading && !chains.isLoading}
                                            isRequired
                                        />
                                    </VStack>
                                    <RulesetAddress />
                                    <VStack align="stretch" spacing={1}>
                                        <VStack align="stretch" spacing={1}>
                                            <FieldLabel label="Gating Message" isRequired />
                                            <AppTypography fontSize="14px" color="#7b7b7b">
                                                Provide the text to display to visitors that will appear inside the access modal.
                                            </AppTypography>
                                        </VStack>
                                        <TextboxRule isRequired={true} element={"description"} placeholder="e.g., StreamWave" />
                                    </VStack>
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
                                    <VStack align="stretch" spacing={1}>
                                        <VStack align="stretch" spacing={1}>
                                            <FieldLabel label="NFT URL" />
                                            <AppTypography fontSize="14px" color="#7b7b7b">
                                                Choose this option to display the marketplace listing page to visitors where the collection is officially being traded.
                                            </AppTypography>
                                        </VStack>
                                        <TextboxRule isRequired={false} element={"nftPurchaseLink"} placeholder="Paste link to your NFT page or marketplace here" />
                                    </VStack>
                                    <Box>
                                        <RulesetType />
                                    </Box>
                                    <HStack borderTop={"1px solid #292929"} py={"2rem"} justifyContent={"space-between"}>

                                        <BasicButton width={"79px"} onClick={close} variant="outline">
                                            Cancel
                                        </BasicButton>
                                        <BasicButton width={"79px"} isLoading={createRule.isLoading || getRule.isLoading || updateRule.isLoading} type="submit" onClick={submitForm}>
                                            Save
                                        </BasicButton>
                                    </HStack>
                                </VStack>
                            </ruleModelContext.Provider>
                        )}
                    </Formik>
            }
        </AppModal>
    )
}

export default RuleModal