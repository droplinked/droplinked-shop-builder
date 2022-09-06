import { chakra } from "@chakra-ui/react";

export const CardInput = chakra("input", {
  baseStyle: {
    bgColor: "transparent",
    border: "1px solid #ddd",
    color: "#ddd",
    _hover: {
      color: "#fff",
      bgColor: "transparent",
    },
    _focus: {
        color: "#fff",
        bgColor: "transparent",
      },
  },
});
