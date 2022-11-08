import { chakra } from "@chakra-ui/react";

export const ProducerCollectionWrapper = chakra("div", {
  baseStyle: {
    width: "100%",
    borderRadius: "8px",
    // padding: { base: "15px 10px 10px 10px", md: "25px 20px 15px 20px" },
    transition: "0.8s",
    bg: "subLayer",
    padding: { base: "25px 20px", sm: "30px 40px", md:'20px 30px' ,lg:'30px 40px' ,xl: "50px 60px" },
  },
});

export const ShopNameText = chakra("div", {
  baseStyle: {
    color: "#fff",
    fontWeight: "500",
    fontSize: { base: "18px", sm: "24px", md: "28px" ,lg:'32px' ,xl:'36px' },
    pt: { base: "3px", md: "0px" },
    overflow: "hidden",
    whiteSpace: "nowrap",
    cursor:'pointer',
  },
});


export const ProductsWrapper = chakra("div", {
  baseStyle: {
      d:'grid' ,
      gap:'10px 10px',
      gridTemplateColumns:{ base:'1fr 1fr', md:'1fr 1fr 1fr 1fr'}
  },
});

export const MenuItem = chakra("button", {
  baseStyle: {
    color: "#fff",
    fontWeight: "600",
    fontSize: { base: "18px", md: "24px" },
  },
});

export const menuItemStyle = {
  color: "white",
  px: "4",
  py: "2",
  bgColor: "#222",
  _hover: { bg: "#333" },
  _focus: { bg: "#333" },
  fontSize: { base: "16px", md: "20px" },
};

export const menuButtonStyle = {
  color: "white",
  bg: "mainLayer",
  px: 4,
  py: 1,
  fontSize: { base: "16px", md: "20px" },
  transition: "all 0.2s",
  borderRadius: "md",
};
export const HeaderIcon = chakra("img", {
  baseStyle: {
    w: { base: "20px", sm: "28px", md: "30px" ,lg:'30px'},
    h: { base: "20px", sm: "28px", md: "30px" ,lg:'30px' },
    cursor:'pointer'
  },
});
