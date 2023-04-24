import {
  Box,
  TableContainer,
  Tbody,
  Table,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
//
import { NoRuleText } from "./RulesPage-style";
import { useApi } from "hooks/useApi/useApi";
//
import SearchComponent from "./components/search-component/SearchComponent";
import RuleComponent from "./components/rule-component/RuleComponent";
import HeaderComponent from "./components/header-component/HeaderComponent";
import LoadingComponent from "components/shared/loading-component/LoadingComponent";
import AppCard from "components/shared/card/AppCard";
import { getRulesets } from "lib/apis/rulesetApiService";

const RulePage = () => {
  const [rules, setRules] = useState(null);

  const { getApi } = useApi();

  const updateRules = async () => {
    const result = await getApi(getRulesets());
    if (result) setRules(result);
  };

  useEffect(() => {
    updateRules();
  }, []);

  if (!rules) {
    return (
      <Box w="100%" h="auto" p="0px 40px">
        <AppCard>
          <LoadingComponent />
        </AppCard>
      </Box>
    );
  }

  return (
    <AppCard>
      <SearchComponent />
      <Box mb="36px" />
      {rules.length <= 0 ? (
        <NoRuleText>No ruleset</NoRuleText>
      ) : (
        <TableContainer mb="36px">
          <Table>
            <HeaderComponent />

            <Tbody>
              {rules.map((rule) => {
                return <RuleComponent rule={rule} />;
              })}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </AppCard>
  );
};

export default RulePage;
