import { IcreateRuleService, RuleTypes } from "lib/apis/rule/interfaces";
import * as Yup from "yup";

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

export const ruleModalFormConfig = Yup.object().shape({
    description: Yup.string().required("Required"),
    nftPurchaseLink: Yup.string().optional(),
    chain: Yup.string().required("Required"),
    type: Yup.string().required("Required"),
    discountPercentage: Yup.number().nullable().optional()
        .when("type", {
            is: (value: string) => value === "DISCOUNT",
            then: schema => schema.min(1, "Min 1").max(100, "Max 100").required("Required").typeError("Please Enter a number"),
            otherwise: schema => schema
        }),
    address: Yup.array()
        .of(Yup.string().trim().required("Address cannot be an empty string"))
        .min(1, "At least one address is required")
        .required("Address is required"),
    minimumNftRequired: Yup.number().min(1).max(99).typeError("Please correct value").required("Required"),
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