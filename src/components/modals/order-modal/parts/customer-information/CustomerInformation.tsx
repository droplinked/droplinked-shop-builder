import { Flex } from "@chakra-ui/react";
import AppTypography from 'components/common/typography/AppTypography';
import React, { useContext } from "react";
import orderModalContext from "../context";

const CustomerInformation = () => {
  const { order } = useContext(orderModalContext)
  const information = [
    { label: "Name", value: order?.customer.name },
    { label: "Email", value: order?.customer.email },
    { label: "Address", value: order?.customer.address }
  ]

  return (
    <Flex direction={"column"} gap={"16px"}>
      <AppTypography fontSize={"16px"} fontWeight={500} color={"#FFFFFF"}>Customer Information</AppTypography>
      <Flex direction={"column"} gap={"12px"} as="dl">
        {information.filter(row => row.value).map((row, index) =>
          <Flex key={index} alignItems={"start"}>
            <AppTypography flexShrink={0} width={"200px"} fontSize={"14px"} color={"#C2C2C2"} as="dt">{row.label}</AppTypography>
            <AppTypography fontSize={"14px"} fontWeight={500} color={"#FFFFFF"} as="dd">{row.value}</AppTypography>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};
export default CustomerInformation;