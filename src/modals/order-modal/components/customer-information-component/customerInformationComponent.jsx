import {
  Box,
  Text,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { useContext, useMemo } from "react";

import { convertCustomerInformation } from "./utils";
import orderModalContext from "modals/order-modal/context";

const CustomerInformationComponent = () => {
  const { order } = useContext(orderModalContext)
  const data_array = useMemo(() => convertCustomerInformation(order), [order]);
console.log('order ' , order);
  return (
    <>
      {data_array ? (
        <VStack align={"stretch"}>
          <Box textAlign={"center"}>
            <Text
              fontFamily="Avenir Next"
              fontWeight="700"
              fontSize="18px"
              color="lightGray"
              mb="36px"
            >
              Customer info
            </Text>
          </Box>

          <VStack align={"stretch"}>
            {data_array.map((item, key) => (
              <HStack key={key} color={"lightGray"}>
                <Box width={{ base: "40%", sm: "20%" }}><Text fontSize={{ base: "sm", sm: "md" }}>{item.name}</Text></Box>
                <Box width={{ base: "60%", sm: "80%" }}><Text fontSize={{ base: "sm", sm: "md" }}>{item.data}</Text></Box>
              </HStack>
            ))}
          </VStack>

        </VStack>
      ) : null}
    </>
  );
};
export default CustomerInformationComponent;
