import { chakra } from "@chakra-ui/react";

export const TopText = chakra("div", {
  baseStyle: {
    fontFamily: "Avenir Next",
    fontWeight: "700",
    fontSize: "18px",
    color:'lightGray'
  },
});


export const SaveButton = chakra("button", {
    baseStyle: {
      bg: "primary",
      borderRadius: "8px",
      padding: " 12px 16px",
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      fontFamily: "Avenir Next",
      fontWeight: "500",
      fontSize: "18px",
      color: "#084836",
      border:'1px solid' ,
      borderColor:'primary' ,
      _hover:{
        bg:'mainLayer',
        color: "primary",
      }
    },
  });
  