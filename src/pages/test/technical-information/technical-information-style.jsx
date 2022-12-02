import { chakra } from "@chakra-ui/react";

export const SelectComponent = chakra("select", {
  baseStyle: {
    w: "100%",
    d: "flex",
    backgroundColor: "subLayer",
    borderRadius: "8px",
    color: "darkGray",
    p: "18px 18px",
    fontSize:"20px" ,
    fontWeight:'500',
    outline: "none",
    _focus: {
      border: "none",
      outline: "none",
    },
  },
});

export const OptionComponent = chakra("option", {
  baseStyle: {
    w: "100%",
    bg: "subLayer",
    color: "darkGray",
    p: "18px 18px",
  },
});

export const InputComponent = chakra("input", {
    baseStyle: {
      w: "100%",
      d: "flex",
      color: "darkGray",
      bg: "subLayer",
      p: "18px 18px",
      fontSize:"20px" ,
      fontWeight:'500',
      border:'none', 
      outline:'none',
      borderRadius:'8px',
      _placeholder:{
        color: "darkGray",
      }
    },
  });
  
