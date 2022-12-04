import { chakra } from "@chakra-ui/react";


export const VariantComponentWrapper = chakra("div", {
  baseStyle: {
    d: "flex",
    w:'100%',
    p:'16px 4px',
    borderBottom:'3px solid',
    borderColor:'line' ,
    justifyContent:'space-between'
  },
});


export const DetailWrapper = chakra("div", {
    baseStyle: {
      d: "flex",
      w:'75%',
      justifyContent:'space-between'
    },
  });

  export const DetailText = chakra("p", {
    baseStyle: {
      color:"white" ,
      fontSize:"18px"
    },
  });

  export const Line = chakra("div", {
    baseStyle: {
      w:'3px' ,
      bg:'line' ,
      border:'1px solid' ,
      borderColor:'line'
    },
  });

  
