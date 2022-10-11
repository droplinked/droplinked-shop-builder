import { chakra } from "@chakra-ui/react";

export const SelectInputComponent = chakra("input", {
  baseStyle: {
    w:'100%',
    fontWeight: "600",
    fontSize: { base: "14px", md: "20px" },
    color: "#DBDBDB",
    bgColor: "#181818",
   // border: "1px solid #b3b3b3",
    borderRadius: "8px",
    px: "16px",
    py: { base: "8px", md: "12px" },
    outline: "none",
    _focus: { borderColor: "#8053ff" },
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
    bgColor:'#181818',
    w:'100%'
  },
});

export const DropDownItem = chakra("div", {
  baseStyle: {
    cursor: "pointer",
    fontWeight: "600",
    fontSize: { base: "14px", md: "20px" },
    color: "#DBDBDB",
    px: "16px",
    py: "4px",
    outline: "none",
    h: "auto",
    _hover: {
      bgColor: "#242424",
    },
  },
});
