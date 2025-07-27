import { IcreateRuleService, RuleTypes } from "services/rule/interfaces";
import * as Yup from "yup";
import { TFunction } from "i18next";

export interface IFormData {
    description: string;
    nftPurchaseLink: string;
    chain: string;
    type: RuleTypes;
    discountPercentage: number;
    address: string[];
    minimumNftRequired: number;
    blockchainType: string;
}

export const getRuleModalFormConfig = (t: TFunction) => Yup.object().shape({
    description: Yup.string().required(t("common:required")),
    nftPurchaseLink: Yup.string().optional(),
    chain: Yup.string().required(t("common:required")),
    type: Yup.string().required(t("common:required")),
    discountPercentage: Yup.number().nullable().optional()
        .when("type", {
            is: (value: string) => value === "DISCOUNT",
            then: schema => schema.min(1, t("RuleModal.validation.min", { value: 1 }))
                .max(100, t("RuleModal.validation.max", { value: 100 }))
                .required(t("common:required"))
                .typeError(t("RuleModal.validation.enterNumber")),
            otherwise: schema => schema
        }),
    address: Yup.array()
        .of(Yup.string().trim().required(t("RuleModal.validation.addressEmpty")))
        .min(1, t("RuleModal.validation.addressMinimum"))
        .required(t("RuleModal.validation.addressRequired")),
    minimumNftRequired: Yup.number()
        .min(1, t("RuleModal.validation.min", { value: 1 }))
        .max(99, t("RuleModal.validation.max", { value: 99 }))
        .typeError(t("RuleModal.validation.correctValue"))
        .required(t("common:required")),
});

export const makeInitialValues = (state: IcreateRuleService) => {
    return {
        description: state?.description || "",
        nftPurchaseLink: state?.nftPurchaseLink || "",
        chain: state?.network || null,
        blockchainType: state?.blockchainType || "NFT",
        type: state?.type || "GATING",
        discountPercentage: state?.discountPercentage || 0,
        address: state?.nftContractAddresses || [""],
        minimumNftRequired: state?.minimumNftRequired || ""
    }
}