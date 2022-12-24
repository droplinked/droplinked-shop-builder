import { chakra } from "@chakra-ui/react";

export const SelectComponent = chakra("select", {
  baseStyle: {
    w: "100%",
    d: "flex",
   // backgroundColor: "mainLayer",
    borderRadius: "8px",
    color: "darkGray",
    p:'8px 18px'
  },
});

export const OptionComponent = chakra("option", {
    baseStyle: {
     // w: "100%",
     // bg: "mainLayer",
      color: "darkGray",
      p:'8px 18px'
    },
  });
  
