import { Text, VStack } from "@chakra-ui/react";
import React from "react";
import { formatDateToLongStyle, formattedTime } from "utils/helpers";

export const OrderHeader = ({ order }: { order: any }) => {
  const date = new Date(order?.date);
  const dateString = formatDateToLongStyle(date);
  const timeString = formattedTime(date);

  return (
    <VStack align="st" justify="space-between" w="full">
      <Text fontSize="base" fontWeight="medium" color="white">
        Order #{order.orderId}
      </Text>
      <Text fontSize="sm" fontWeight="medium" color="#b1b1b1">
        {dateString} - {timeString}
      </Text>
    </VStack>
  );
};
