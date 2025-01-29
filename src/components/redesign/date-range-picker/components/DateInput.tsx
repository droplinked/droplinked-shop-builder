import { Flex } from "@chakra-ui/react";
import AppIcons from "assest/icon/Appicons";
import AppTypography from "components/common/typography/AppTypography";
import React from "react";

interface Props {
  selectedDate: Date[];
  onClick: () => void;
}

const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export default function DateInput({ selectedDate, onClick }: Props) {
  return (
    <Flex px="14px" py="10px" border="1px solid #292929" borderRadius="8px" gap="6px" alignItems="center" userSelect="none" cursor="pointer" onClick={onClick}>
      <AppIcons.Calendar color="#fff" />
      <Flex ml={2} gap={2}>
        {selectedDate?.[0] && (
          <AppTypography fontSize={14} fontWeight={500} color={"#fff"}>
            {formatDate(selectedDate[0])}
          </AppTypography>
        )}
        {selectedDate?.[0] && selectedDate?.[1] && (
          <AppTypography fontSize={14} fontWeight={500} color={"#fff"}>
            -
          </AppTypography>
        )}
        {selectedDate?.[1] && (
          <AppTypography fontSize={14} fontWeight={500} color={"#fff"}>
            {formatDate(selectedDate[1])}
          </AppTypography>
        )}
      </Flex>
    </Flex>
  );
}
