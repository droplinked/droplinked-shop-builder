import { chakra } from "@chakra-ui/react";

export const WalletOptionItem = chakra("div", {
  baseStyle: {
    W: "100%",
    p: "15px",
    borderRadius: "10px",
    bg: "subLayer",
    cursor: "pointer",
    display: "flex",
  },
});

export const WalletOptionIcon = chakra("img", {
  baseStyle: {
    w: "24px",
    h: "24px",
    mr: "12px",
  },
});

export const WalletOptionName = chakra("p", {
  baseStyle: {
    fontSize: "16px",
    fontWeight: "500",
    color:'lightGray'
  },
});

export const Title = chakra("p", {
    baseStyle: {
      width: "100%",
      color: "white",
      fontSize: { base: "20px", md: "28px" },
      textAlign: "center",
      fontWeight: "600",
    },
  });
