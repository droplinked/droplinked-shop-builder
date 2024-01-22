import { Flex } from "@chakra-ui/react";
import AppTypography from 'components/common/typography/AppTypography';
import orderModalContext from "../context";
import React, { useContext } from "react";

const CustomerInformation = () => {
  const { order } = useContext(orderModalContext)
  const information = [
    { label: "Name", value: "Behdad Mansouri" },
    { label: "Email", value: "Bedimns@gmail.com" },
    { label: "Address", value: "229 Black Stallion Road, Fort Wayne, IN, Indiana, United State - 46805 ggrg ntkjn tkjrn tjrknrtjknrtk" },
  ]

  return (
    <Flex direction={"column"} gap={"16px"}>
      <AppTypography fontSize={"16px"} fontWeight={500} color={"#FFFFFF"}>Customer Information</AppTypography>
      <Flex direction={"column"} gap={"12px"} as="dl">
        {information.map((row, index) =>
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