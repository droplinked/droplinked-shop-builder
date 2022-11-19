import { chakra } from "@chakra-ui/react";

export const CardInput = chakra("input", {
  baseStyle: {
   // bgColor: "transparent",
   // border: "1px solid #ddd",
    //color: "#ddd",
    border:'none',
    color:'#DBDBDB',
    bgColor:'#181818',
    borderRadius:'8px',
    px:"16px",
    py:{ base: "8px", md: "12px" },
    
    _hover: {
      color: '#DBDBDB',
      bgColor: "#181818",
    },
    _focus: {
        color: '#DBDBDB',
        bgColor: "#181818",
      },
  },
});
