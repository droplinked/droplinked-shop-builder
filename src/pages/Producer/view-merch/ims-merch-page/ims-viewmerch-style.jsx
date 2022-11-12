import { chakra } from "@chakra-ui/react";

export const DeleteButtonWrapper = chakra("div", {
  baseStyle: {
    w:{base:'100%' , md:'50%'},
    mb:'20px'
  },
});


export const TypeSelect = chakra("select", {
  baseStyle: {
    fontWeight: "600",
    fontSize: { base: "10px", sm: "12px", md: "16px" },
    color: "white",
    border: "none",
    bgColor: "mainLayer",
    borderRadius: "8px",
    w: "300px",
    px: "16px",
    py: { base: "8px", md: "12px" },
    outline: "none",
    _focus: { outline: "none" },
    h: "auto",
    mr: "40px",
    _disabled: {
      color: "button",
    },
  },
});

export const InputComponent = chakra("input", {
  baseStyle: {
    fontWeight: "600",
    fontSize: { base: "10px", sm: "12px", md: "16px" },
    color: "white",
    border: "none",
    bgColor: "dark",
    borderRadius: "8px",
    w: "100%",
    px: "16px",
    py: { base: "8px", md: "12px" },
    outline: "none",
    _focus: { outline: "none" },
    h: "auto",
    _disabled: {
      color: "button",
    },
  },
});


export const LableInput = chakra("div", {
  baseStyle: {
    fontWeight: "600",
    fontSize: { base: "10px", sm: "12px", md: "16px" },
    color: "white",
    marginBottom: "10px",
  },
});