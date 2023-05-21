import {
  Box,
  Text,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { useContext, useMemo } from "react";

import { convertCustomerInformation } from "./utils";
import orderModalContext from "modals/order-modal/context";
import AppTypography from "common/typography/AppTypography";

const CustomerInformationComponent = () => {
  const { order } = useContext(orderModalContext)
  const data_array = useMemo(() => convertCustomerInformation(order), [order]);

  return (
    <>
      {data_array ? (
        <VStack align={"stretch"}>
          <Box textAlign={"center"} marginBottom={7}>
            <AppTypography size="18px" color={"#FFF"} weight="bolder">Customer info</AppTypography>
          </Box>

          <VStack align={"stretch"} spacing={4}>
            {data_array.map((item, key) => (
              <HStack key={key} color={"lightGray"}>
                <Box width={{ base: "40%", sm: "20%" }}><AppTypography size="12px">{item.name}</AppTypography></Box>
                <Box width={{ base: "60%", sm: "80%" }}><AppTypography size="12px">{item.data}</AppTypography></Box>
              </HStack>
            ))}
          </VStack>

        </VStack>
      ) : null
      }
    </>
  );
};
export default CustomerInformationComponent;
