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
    discountPercentage: Yup.number().min(0).optional(),
    address: Yup.array()
        .min(1, "Required")
        .of(Yup.string().required("Address cannot be empty"))
        .required("Required"),
    minimumNftRequired: Yup.number().min(1).max(99).typeError("Please correct value").required("Required"),
});

export const makeInitialValues = (state: IcreateRuleService) => {
    return {
        description: state?.description || "",
        nftPurchaseLink: state?.nftPurchaseLink || "",
        chain: state?.network || "ETH",
        blockchainType: state?.blockchainType || "NFT",
        type: state?.type || "GATING",
        discountPercentage: state?.discountPercentage || 0,
        address: state?.nftContractAddresses || [""],
        minimumNftRequired: state?.minimumNftRequired || ""
    }
}