import { chakra } from "@chakra-ui/react";

export const AddressComponentWrapper = chakra("div", {
  baseStyle: {
    w: "100%",
    display: "flex",
    padding: "24px 4px",
    borderBottom: "2px solid",
    borderColor: "line",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export const AddressText = chakra("p", {
  baseStyle: {
    fontSize: { base: "16px", md: "18px" },
    fontWeight: "600",
    color: "white",
    mb: "5px",
  },
});

export const AddressLineText = chakra("p", {
  baseStyle: {
    fontSize: { base: "14px", md: "16px" },
    fontWeight: "500",
    color: "#ddd",
    mb: "0px",
  },
});

export const ButtonsWrapper = chakra("div", {
  baseStyle: {
    d: "flex",
    alignItems: "center",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    w: { base: "45%", md: "40%" },
  },
});

export const ButtonComponent = chakra("button", {
  baseStyle: {
    color: "white",
    w: "45%",
    h: "35px",
    borderRadius: "8px",
    fontSize: { base: "12px", md: "16px" },
    _hover: { borderColor: "#4d4d4d", color: "#222" },
  },
});

export const Text14 = chakra("p", {
  baseStyle: {
    fontFamily: "Avenir Next",
    fontWeight: "400",
    fontSize: "14px",
    color: "#fff",
  },
});

export const LineComponent = chakra("div", {
  baseStyle: {
    w: "1px",
    h: "20px",
    border: "2px solid #262626",
  },
});

export const IconComponent = chakra("img", {
  baseStyle: {
    w: "16px",
    h: "16px",
    cursor: "pointer",
  },
});
