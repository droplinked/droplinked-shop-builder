import axiosInstance from "../axiosConfig"
import { IcreateRuleService, IgetRuleService, IupdateRuleService } from "./interfaces"

export const getRuleService = ({ ruleID }: IgetRuleService) => {
    return axiosInstance.get(`rule-set/${ruleID}`)
}

export const createRuleService = (params: IcreateRuleService) => {
    return axiosInstance.post(`rule-set`, params)
}

export const updateRuleService = ({ data, ruleID }: IupdateRuleService) => {
    return axiosInstance.put(`rule-set/${ruleID}`, data)
}