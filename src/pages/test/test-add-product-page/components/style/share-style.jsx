import { chakra } from "@chakra-ui/react";

export const SectionWrapper = chakra("div", {
  baseStyle: {
    w: "100%",
    bg: "mainLayer",
    p: "50px 60px",
    borderRadius: "8px",
  },
});

export const SectionTitle = chakra("p", {
  baseStyle: {
    fontWeight: "500",
    fontSize: "24px",
    color: "white",
  },
});

export const AddProductLabel = chakra("p", {
  baseStyle: {
    fontWeight: "500",
    fontSize: "20px",
    color: "white",
  },
});



export const Margin48px = chakra("div", {
    baseStyle: {
      mb:'48px'
    },
  });

  export const Margin40px = chakra("div", {
    baseStyle: {
      mb:'40px'
    },
  });

  export const SelectComponent = chakra("select", {
    baseStyle: {
      w: "100%",
      d: "flex",
      backgroundColor: "mainLayer",
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
      borderRadius: "8px",
      color: "darkGray",
      p: "18px 18px",
      _disabled:{
        bg: "mainLayer",
      }
    },
  });