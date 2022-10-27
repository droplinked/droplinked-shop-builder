import { chakra } from "@chakra-ui/react";

export const Title = chakra("p", {
  baseStyle: {
    fontWeight: "600",
    fontSize: { base: "20px", md: "28px" },
    textAlign: "center",
    color: "white",
  },
});

export const BottomText = chakra("p", {
  baseStyle: {
    fontWeight: "400",
    fontSize: { base: "12px", md: "14px" },
    textAlign: "center",
    color: "white",
    cursor:'pointer',
    _hover: {
      color: "#b3b3b3",
    },
  },
});
