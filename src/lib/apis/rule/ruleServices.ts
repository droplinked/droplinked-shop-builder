import axiosInstance from '../axiosConfig';
import {
    IcreateRuleService,
    IgetRuleService,
    IgetRuleTypeService,
    IupdateRuleService,
} from './interfaces';

export const ruleService = () => {
    return axiosInstance.get(`rule-set`);
};

export const getRuleService = ({ ruleID }: IgetRuleService) => {
    return axiosInstance.get(`rule-set/${ruleID}`);
};

export const createRuleService = (params: IcreateRuleService) => {
    return axiosInstance.post(`rule-set`, params);
};

export const updateRuleService = ({ data, ruleID }: IupdateRuleService) => {
    return axiosInstance.put(`rule-set/${ruleID}`, data);
};

export const rulesetChainsService = () => {
    return axiosInstance.get(`rule-set/available-chains`);
};

export const rulesetTypeService = ({ chain }: IgetRuleTypeService) => {
    return axiosInstance.get(`rule-set/available-types/${chain}`);
};
