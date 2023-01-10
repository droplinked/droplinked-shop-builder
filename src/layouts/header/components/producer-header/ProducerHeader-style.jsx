import { chakra } from "@chakra-ui/react";

export const ShopnameText = chakra("p", {
    baseStyle: {
      color: "white",
      fontSize: { base: "16px", md: "24px" },
      fontWeight: "500",
      mr: { base: "8px", md: "16px" },
    },
  });
  
  export const ProfileIconWrapper = chakra("div", {
    baseStyle: {
      d:'flex',
      w: { base: "36px", md: "46px" },
      h: { base: "36px", md: "46px" },
      borderRadius: "50%",
      bg: "mainLayer",
      justifyContent: "center",
      alignItems: "center",
    },
  });
  
  export const ProfileChar = chakra("p", {
    baseStyle: {
      color: "white",
      fontSize: { base: "20px", md: "28px" },
      fontWeight: "600",
    },
  });

  export const BurgerIcon = chakra("img", {
    baseStyle: {
      w:'25px',
      h:'25px',
      pt:'3px',
      d:{base:'block' , sm:'none'}
    },
  });
  
  