import { chakra } from "@chakra-ui/react";

export const SidebarWrapper = chakra("div", {
  baseStyle: {},
});


export const IconWrapper= chakra("div", {
  baseStyle: {
   w:'100%' ,
   p:'12px 24px' ,
   display:'flex',
   justifyContent:'center',
   alignItems:'center'
  },
});


export const IconComponent = chakra("img", {
  baseStyle: {
    w: "16px",
    h: "16px",
    cursor:'pointer'
  },
});
