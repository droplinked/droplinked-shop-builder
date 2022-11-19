import { chakra } from "@chakra-ui/react";

export const ImsPaymentWrapper = chakra("div", {
  baseStyle: {
    w: "100%",
    maxW: "1000px",
    mx: "auto",
    px: { base: "20px", md: "80px" },
  },
});

export const ImsPaymentContainer = chakra("div", {
  baseStyle: {
    display: "flex",
    wrap: "wrap",
    rowGap: "10px",
    w: "100%",
    flexDirection: "column",
  },
});

export const ButtonsWrapper = chakra("div", {
  baseStyle: {
    w: "100%",
    display: "flex",
    height: { base: "100px", md: "auto" },
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export const PaymetnButton = chakra("button", {
  baseStyle: {
    w: "40%",
    color: "primary",
    border: "1px",
    borderColor: "primary",
    bgColor: "#222",
    _hover: {
      color: "#222",
      borderColor: "#222",
      bgColor: "primary",
    },
  },
});
