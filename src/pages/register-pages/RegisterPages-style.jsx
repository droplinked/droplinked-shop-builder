import { chakra } from "@chakra-ui/react";

export const SideText = chakra("div", {
  baseStyle: {
    fontFamily: "Avenir Next",
    fontWeight: "400",
    fontSize: "14px",
    mb: "16px",
  },
});




export const PageContent = chakra("div", {
    baseStyle: {
      w:'100%' ,
      maxW:'800px',
      h:'auto' ,
    },
  });



  export const PageInformationComponent = chakra("div", {
    baseStyle: {
      w:'100%' ,
      bg:'mainLayer' ,
      borderRadius:'8px' ,
      padding:'24px 60px' ,
      mb:'50px',
      fontSize:'16px' ,
      fontWeight:'500',
      color:'#fff'
    },
  });
  
  export const PageContentWrapper = chakra("div", {
    baseStyle: {
      w:'100%' ,
      bg:'mainLayer' ,
      borderRadius:'8px' ,
      padding:'50px 60px' ,
    },
  });
  
  
