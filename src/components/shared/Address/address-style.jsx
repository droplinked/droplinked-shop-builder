import { chakra } from "@chakra-ui/react";

export const AddressComponentWrapper = chakra("div", {
  baseStyle: {
    h: "auto",
    mb: "4",
    border: "3px solid",
    borderRadius: "8px",
    p: "24px 40px 24px 40px",
    bgColor: "button",
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
    borderRadius:'8px',
    fontSize: { base: "12px", md: "16px" },
    _hover: { borderColor: "#4d4d4d", color: "#222" },
  },
});
