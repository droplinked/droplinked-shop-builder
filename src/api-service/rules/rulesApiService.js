

export const getRulesById = (rulesetId) => {
    const token = JSON.parse(localStorage.getItem("token"));
    let apiObj = {
      url: `rule-set/${rulesetId}`,
      token: token,
    };
    return { ...apiObj };
  };