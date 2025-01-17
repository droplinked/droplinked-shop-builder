import { HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";

export const CustomerInfo = ({ customer }: { customer: any }) => (
    <VStack spacing="4" w="full" align="start">
      {["name", "email"].map((field, idx) => (
        <HStack key={idx} justify="space-between" w="full">
          <Text fontSize="sm" fontWeight="normal" color="#7b7b7b">
            {field === "name" ? "Full Name" : "Email Address"}
          </Text>
          <Text fontSize="sm" fontWeight="medium" color="white">
            {customer?.[field] || "----"}
          </Text>
        </HStack>
      ))}
    </VStack>
  );
  