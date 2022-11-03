// get ruleSet obj retur true if it is gated
export const isGated = (ruleSet) => {
  if (ruleSet == undefined) return false;

  if (ruleSet.rules.length <= 0) return false;
  else return true;
};
