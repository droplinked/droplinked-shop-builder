import { chakra } from "@chakra-ui/react";

export const SelectInputComponent = chakra("input", {
  baseStyle: {
    w:'100%',
    fontWeight: "600",
    fontSize: { base: "14px", md: "20px" },
    color: "#DBDBDB",
    bgColor: "subLayer",
   // border: "1px solid #b3b3b3",
    borderRadius: "8px",
    px: "16px",
    py: { base: "8px", md: "12px" },
    outline: "none",
    _focus: { borderColor: "primary" },
    h: "auto",
    cursor: "pointer",
  },
});

export const DropDownWrapper = chakra("div", {
  baseStyle: {
    border: "2px solid #363636",
    borderRadius: "8px",
    maxH:'300px',
    pos:'absolute',
    overflowY:'scroll',
    zIndex:'150',
    bgColor:'subLayer',
    w:'100%'
  },
});

export const DropDownItem = chakra("div", {
  baseStyle: {
    cursor: "pointer",
    fontWeight: "600",
    fontSize: { base: "12px", md: "16px" },
    color: "#DBDBDB",
    px: "16px",
    py: "4px",
    borderTop:'2px solid #242424',
    borderBottom:'2px solid #242424',
    outline: "none",
    h: "auto",
    _hover: {
      bgColor: "#242424",
    },
  },
});
