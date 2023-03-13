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
    w: "100%",
    maxW: "800px",
    h: "auto",
  },
});

export const PageInformationComponent = chakra("div", {
  baseStyle: {
    w: "100%",
    bg: "mainLayer",
    borderRadius: "8px",
    padding: "24px 60px",
    mb: "50px",
    fontSize: "16px",
    fontWeight: "500",
    color: "#fff",
  },
});

export const PageContentWrapper = chakra("div", {
  baseStyle: {
    w: "100%",
    bg: "mainLayer",
    borderRadius: "8px",
    padding: "50px 60px",
  },
});

export const Text18px = chakra("div", {
  baseStyle: {
    fontFamily: "Avenir Next",
    fontWeight: "700",
    fontSize: "18px",
    color: "#FFFFFF",
  },
});

export const AddAddressButton = chakra("button", {
  baseStyle: {
    w: "100%",
    bg: "#292929",
    borderRadius: "8px",
    padding: " 12px 16px",
    fontFamily: "Avenir Next",
    fontWeight: "500",
    fontSize: "16px",
    color: "lightGray",
    border:'1px solid' ,
    borderColor:'#292929' ,
    _hover:{
      bg:'mainLayer'
    }
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

