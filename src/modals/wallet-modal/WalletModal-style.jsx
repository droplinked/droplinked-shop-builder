import { chakra } from "@chakra-ui/react";

export const Title = chakra("p", {
  baseStyle: {
    fontWeight: "700",
    fontSize: "18px",
    textAlign: "center",
    color: "lightGray",
  },
});

export const WalletContainerBox = chakra("div", {
  baseStyle: {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    borderRadius: "8px",
    py: "16px",
    px: "18px",
    backgroundColor: "subLayer",
  },
});

export const Icon = chakra("img", {
  baseStyle: {
    w: "24px",
    h: "24px",
    mr: "14px",
  },
});
