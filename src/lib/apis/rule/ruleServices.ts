import axiosInstance from "../axiosConfig"
import { IgetRuleService } from "./interfaces"

export const getRuleService = ({ruleID}: IgetRuleService) => {
    return axiosInstance.get(`rule-set/${ruleID}`)
}