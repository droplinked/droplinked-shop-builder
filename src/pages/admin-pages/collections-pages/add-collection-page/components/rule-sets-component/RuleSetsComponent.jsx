import React, { useState } from "react";
import {
  Box,
  Tbody,
  Table,
  Thead,
  Tr,
  Th,
  TableContainer,
  Flex,
  Text,
  Button,
} from "@chakra-ui/react";
//
import RuleComponent from "../rule-component/RuleComponent";
import RuleModal from "modals/rule-modal/RuleModal";

function RuleSetsComponent() {
  const [ruleSets, setRuleSets] = useState([]);

  const [ruleModal, setRuleModal] = useState(false);

  const toggleModal = () => setRuleModal((prev) => !prev);
  //

  // const { getApi } = useApi();

  // const getAllProducts = async () => {
  //   let result = await getApi(getProduct());
  //   if (result) setRuleSets(result);
  //   else setRuleSets([]);
  // };

  // useEffect(() => {
  //   getRuleSets();
  // }, []);
  //
  return (
    <>
      <Box mt={10}>
        <Flex alignItems="center" justify="space-between" mb={5}>
          <Text color="white">Rulesets</Text>
          <Button
            onClick={toggleModal}
            variant="outline"
            colorScheme="whiteAlpha"
            borderColor="line"
            rounded="lg"
          >
            Make Ruleset
          </Button>
        </Flex>
        <TableContainer mb="36px">
          <Table>
            <Thead borderY="1px solid" borderColor="line">
              <Tr>
                {[
                  {
                    label: "select",
                  },
                  {
                    label: "Rule type",
                  },
                  {
                    label: "Offer",
                  },
                  {
                    label: "Identifiers",
                  },
                  {
                    label: "minimum",
                  },
                ].map((item) => (
                  <Th
                    py={4}
                    fontSize="12px"
                    key={item.label}
                    color="white"
                    border="none"
                  >
                    {item.label}
                  </Th>
                ))}
              </Tr>
            </Thead>
            {ruleSets.length > 0 && (
              <Tbody>
                {ruleSets.map((item, i) => (
                  <RuleComponent
                    key={i}
                    rule={item}
                    // update={getAllProducts}
                  />
                ))}
              </Tbody>
            )}
          </Table>
        </TableContainer>
      </Box>

      <RuleModal
        show={ruleModal}
        close={toggleModal}
        // collectionId={collection._id}
        // update={update}
        // ruleId={collection.ruleSetID || undefined}
      />
    </>
  );
}

export default RuleSetsComponent;
