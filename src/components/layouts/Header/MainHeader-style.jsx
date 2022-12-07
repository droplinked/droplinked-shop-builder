import { chakra } from "@chakra-ui/react";

export const HeaderWrapper = chakra("div", {
  baseStyle: {
    d: "flex",
    w: "100%",
    bgColor: "bG",
    justifyContent: "space-between",
    alignItems: "center",
    padding: { base: "12px 20px", md: "36px 40px", lg: "26px 36px" },
   // h: { base: "60px", md: "124px" },
    borderBottom:"1px solid" ,
    borderColor:'line'
  },
});

export const HeaderTitle = chakra("p", {
  baseStyle: {
    color: "white",
    fontSize: { base: "24px", md: "28px" },
    fontWeight: "600",
    letterSpacing: "0.2em",
    pt: { base: "3px", md: "0px" },
    cursor: "pointer",
  },
});

export const BurgerIcon = chakra("img", {
  baseStyle: {
    w: "24px",
    h: "24px",
    mr: "24px",
    cursor: "pointer",
  },
});
