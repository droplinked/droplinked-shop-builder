import { chakra } from "@chakra-ui/react";

export const SelectInputComponentWrapper = chakra("input", {
  baseStyle: {
    w:'100%',
    fontWeight: "500",
    fontSize: "16px",
    color: "#fff",
    bgColor: "subLayer",
    borderRadius: "8px",
    padding:"8px 24px" ,
    outline: "none",
    h: "auto",
    cursor: "pointer",
    _placeholder:{
      color:'#808080'
    }
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
