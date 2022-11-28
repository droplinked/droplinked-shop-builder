import { chakra } from "@chakra-ui/react";

export const ModalContainerWrapper = chakra("div", {
  baseStyle: {
    d: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    bg: "mainLayer",
    borderRadius: "8px",
    p:{base:'30px 20px',sm:'40px 30px' , md:'40px 60px' , lg:'40px 100px'  }
  },
});

export const TitleText = chakra("p", {
  baseStyle: {
    color: "white",
    fontWeight: "600",
    fontSize: { base: "26px", md: "30px" },
    mb: "40px",
  },
});

export const TypeSelect = chakra("select", {
  baseStyle: {
    fontWeight: "600",
    fontSize: { base: "10px", sm: "12px", md: "16px" },
    color: "white",
    border: "none",
    bgColor: "subLayer",
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

