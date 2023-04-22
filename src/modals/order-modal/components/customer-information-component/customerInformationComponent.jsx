import {
  Box,
  Text,
  TableContainer,
  Table,
  Tbody,
  Tr,
  Td,
} from "@chakra-ui/react";
import { useMemo } from "react";

import { convertCustomerInformation } from "./utils";

const CustomerInformationComponent = ({ order }) => {
  console.log("order ", order);

  const data_array = useMemo(() => convertCustomerInformation(order), [order]);

  if (data_array === null) return <></>;

  console.log("data_array ", data_array);

  return (
    <Box w="100%">
      <Text
        fontFamily="Avenir Next"
        fontWeight="700"
        fontSize="18px"
        color="lightGray"
        w="100%"
        textAlign="center"
        mb="36px"
      >
        Customer info
      </Text>

      <TableContainer>
        <Table size="sm">
          <Tbody>
            {data_array.map((item, i) => {
              return (
                <Tr>
                  <Td>
                    <Text
                      fontFamily="Avenir Next"
                      fontWeight="400"
                      fontSize="12px"
                      color="#C2C2C2"
                    >
                      {item.name}
                    </Text>
                  </Td>
                  <Td>
                    <Text
                      fontFamily="Avenir Next"
                      fontWeight="400"
                      fontSize="12px"
                      color="#C2C2C2"
                    >
                      {item.data}
                    </Text>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};
export default CustomerInformationComponent;
