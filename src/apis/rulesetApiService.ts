import { createApiReq } from "./api-utils";

export const postCreateRuleset = (body: any) => {
  return createApiReq(`rule-set`, true, body);
};

export const getRulesets = () => {
  return createApiReq(`rule-set`, true, null);
};

export const getRulesetById = (ruleId: number) => {
  return createApiReq(`rule-set/${ruleId}`, true, null);
};

export const putUpdateRuleset = (ruleId: number, body: any) => {
  return createApiReq(`rule-set/${ruleId}`, true, body);
};

export const deleteRulesetById = (ruleId: number) => {
  return createApiReq(`rule-set/${ruleId}`, true, null);
};

export const getRuleSetPublicById = (ruleId: number) => {
  return createApiReq(`rule-set/${ruleId}`, false, null);
};
