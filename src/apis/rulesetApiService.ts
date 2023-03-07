export const postCreateRuleset = (body: any) => {
  const token = JSON.parse(localStorage.getItem("token") || "");
  let apiObj = {
    url: `rule-set`,
    body: body,
    token: token,
  };
  return { ...apiObj };
};

export const getRulesets = () => {
  const token = JSON.parse(localStorage.getItem("token") || "");
  let apiObj = {
    url: `rule-set`,
    token: token,
  };
  return { ...apiObj };
};

export const getRulesetById = (ruleId: number) => {
  const token = JSON.parse(localStorage.getItem("token") || "");
  let apiObj = {
    url: `rule-set/${ruleId}`,
    token: token,
  };
  return { ...apiObj };
};

export const putUpdateRuleset = (ruleId: number, body: any) => {
  const token = JSON.parse(localStorage.getItem("token") || "");
  let apiObj = {
    url: `rule-set/${ruleId}`,
    body: body,
    token: token,
  };
  return { ...apiObj };
};

export const deleteRulesetById = (ruleId: number) => {
  const token = JSON.parse(localStorage.getItem("token") || "");
  let apiObj = {
    url: `rule-set/${ruleId}`,
    token: token,
  };
  return { ...apiObj };
};

export const getRuleSetPublicById = (ruleId: number) => {
  let apiObj = {
    url: `rule-set/${ruleId}`,
  };
  return { ...apiObj };
};
