import { chakra } from "@chakra-ui/react";

export const ViewMerchWrapper = chakra("div", {
  baseStyle: {
    d:'flex',
    flexDir:'column',
    justifyContent:'center',
    alignItems:'center',
    w:'100%',
    bg:'subLayer',
    borderRadius:"8px",
    margin:'0px auto',
  //  p:'0px 20px',
    p:{base:'30px 20px',sm:'40px 30px' , md:'40px 60px' , lg:'40px 100px'  }
  },
});

