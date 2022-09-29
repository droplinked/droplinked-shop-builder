import { chakra } from "@chakra-ui/react";

export const AddressComponentWrapper = chakra("div", {
  baseStyle: {
    h: "auto",
    mb: "4",
    border: "3px solid",
    borderRadius: "8px",
    p: "24px 40px 24px 40px",
    bgColor:'#353535'
  },
});

export const AddressText = chakra("p", {
  baseStyle: {
    fontSize: { base: "16px", md: "18px" },
    fontWeight: "600",
    color: "#fff",
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
