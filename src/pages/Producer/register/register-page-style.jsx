import { chakra } from "@chakra-ui/react";

export const RegisterPageWrapper = chakra("div", {
  baseStyle: {
    d: "flex",
    w: "100%",
    flexDir: "column",
    justifyContent: "center",
    px: { base: "20px", md: "80px" },
  },
});

export const RegisterContainer = chakra("div", {
  baseStyle: {
    d:'flex',
    flexDir:'column',
    w: "100%",
    p: { base: "40px 24px", md: "50px" },
    maxW: "800px",
    bg: "subLayer",
    borderRadius: "16px",
    mx: "auto",
    alignItems:'center'
  },
});

export const ShopInputWrapper = chakra("div", {
  baseStyle: {
    d: "flex",
    border: "none",
    bg: "dark",
    borderRadius: "8px",
    px: "16px",
    py: { base: "8px", md: "12px" },
  },
});

export const ShopnameInput = chakra("input", {
  baseStyle: {
    fontWeight: "600",
    fontSize: { base: "14px", md: "20px" },
    color: "#fff",
    p: "0px",
    w: "100%",
    bg: "dark",
    //  bg: "transparent",
    outline: "none",
    border: "none",
    _focus: {
      borderColor: "none",
      outline: "none",
    },
    h: "auto",
  },
});

export const CounterText = chakra("p", {
  baseStyle: {
    fontSize: { base: "14px", md: "20px" },
    fontWeight: "600",
  },
});

export const AddressButton = chakra("button", {
  baseStyle: {
    border: "2px solid subLayer",
    _hover: {
    //  bgColor: "transparent",
     // borderColor: "#fff",
    },
  //  bg:'primary',
    textAlign: "center",
    color: "#ffffff",
    fontSize: { base: "16px", md: "20px" },
    fontWeight: "600",
    padding: "13px 50px",
    borderRadius: "10px",
    bgColor: "dark",
  },
});
