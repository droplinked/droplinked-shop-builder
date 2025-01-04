import { Text, VStack } from "@chakra-ui/react";
import React from "react";

export const OrderHeader = ({ order }: { order: any }) => {
    const formattedDate = new Date(order?.date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const formattedTime = new Date(order?.date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  
    return (
      <VStack align="st" justify="space-between" w="full">
        <Text fontSize="base" fontWeight="medium" color="white">
          Order #{order.orderId}
        </Text>
        <Text fontSize="sm" fontWeight="medium" color="#b1b1b1">
          {formattedDate} - {formattedTime}
        </Text>
      </VStack>
    );
  };
  