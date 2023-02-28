import { chakra } from "@chakra-ui/react";

export const UserHeaderWrapper = chakra("div", {
    baseStyle: {
      d: "flex",
      px: { base: "8px", md: "12px" },
      py: "5px",
      borderRadius: "0px",
      borderLeft: "3px solid button",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
      _hover: {
        bg: "button",
        borderRadius: "8px",
      },
    },
  });
  
  export const WalletAddressText = chakra("p", {
    baseStyle: {
      fontSize: { base: "12px", md: "16px" },
      fontWeight: "600",
      color: "white",
      d: { base: "none", md: "block" },
    },
  });