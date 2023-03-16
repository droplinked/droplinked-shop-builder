import {
  Box,
  Flex,
  TableContainer,
  Tbody,
  Table,
  Thead,
  Tr,
  Th,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

import { PageWrapper, NoRuleText } from "./RulesPage-style";
import { useApi } from "../../hooks/useApi/useApi";
import { getRulesets } from "../../apis/rulesetApiService";

import SearchComponent from "./components/search-component/SearchComponent";
import AddRuleComponent from "./components/add-rule-component/AddRuleComponent";
import RuleComponent from "./components/rule-component/RuleComponent";
import HeaderComponent from "./components/header-component/HeaderComponent";
import Loading from "../../components/shared/loading/Loading";

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
        <PageWrapper>
          <Loading />
        </PageWrapper>
      </Box>
    );
  }

  return (
    <Box w="100%" h="auto" p="0px 40px">
      <PageWrapper>
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
                return  <RuleComponent rule={rule} />;
                })}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </PageWrapper>
    </Box>
  );
};

export default RulePage;
