import axiosInstance from '../axiosConfig';
import {
    IcreateRuleService,
    IgetRuleService,
    IupdateRuleService,
} from './interfaces';

export const getRuleService = ({ ruleID }: IgetRuleService) => {
    return axiosInstance.get(`rule-set/v2/${ruleID}`);
};

export const createRuleService = (params: IcreateRuleService) => {
    return axiosInstance.post(`rule-set/v2`, params);
};

export const updateRuleService = ({ data, ruleID }: IupdateRuleService) => {
    return axiosInstance.patch(`rule-set/v2/${ruleID}`, data);
};

export const rulesetChainsService = () => {
    return axiosInstance.get(`rule-set/v2/public/available`);
};
