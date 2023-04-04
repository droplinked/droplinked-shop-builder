import { chakra } from "@chakra-ui/react";

export const PageWrapper = chakra("div", {
  baseStyle: {
    w: "100%",
    bg: "mainLayer",
    borderRadius: "8px",
    p: "36px 48px",
  },
});



export const NoRuleText = chakra("p", {
  baseStyle: {
    w: "100%",
    textAlign:'center',
    fontSize:'24px' ,
    fontWeight:'600',
    color:'#fff'
  },
});