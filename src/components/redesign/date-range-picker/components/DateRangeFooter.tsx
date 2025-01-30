import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import AppTypography from "components/common/typography/AppTypography";
import AppIcons from "assest/icon/Appicons";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function DateRangeFooter({ value }: { value: Value }) {
  const formatDate = (date: Date | null) => {
    if (!date) return "";
    const formatted = date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
    return formatted.replace(/\//g, ' / ');
  };

  return (
    <Flex p={4} justify="start" align="center" gap={2} borderTop="1px solid #292929">
      <Box width={{ base: "100%", md: "max-content" }} px={3} py={2} border="1px solid #292929" borderRadius={4}>
        <AppTypography fontSize="14px" color="#fff">
          {formatDate(value[0])}
        </AppTypography>
      </Box>
      <AppIcons.BackArrow style={{ rotate: "180deg", opacity: "0.3" }} />
      <Box width={{ base: "100%", md: "max-content" }} px={3} py={2} border="1px solid #292929" borderRadius={4}>
        <AppTypography fontSize="14px" color="#fff">
          {formatDate(value[1])}
        </AppTypography>
      </Box>
    </Flex>
  );
}
