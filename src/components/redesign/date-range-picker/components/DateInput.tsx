import { Flex } from "@chakra-ui/react";
import AppIcons from "assets/icon/Appicons";
import AppTypography from "components/common/typography/AppTypography";
import React from "react";
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface Props {
  selectedDate: Value;
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
    <Flex
      px="14px" py="10px"
      border="1px solid" borderRadius="8px" borderColor="neutral.gray.800"
      gap="6px" alignItems="center"
      userSelect="none" cursor="pointer"
      width={"100%"}
      onClick={onClick}
    >
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
