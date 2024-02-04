import { chakra } from "@chakra-ui/react";

export const HeaderWrapper = chakra("div", {
  baseStyle: {
    d: "flex",
    w: "100%",
    //  bgColor: "bG",
    justifyContent: "space-between",
    alignItems: "center",
    padding: { base: "0px 20px", md: "0px 40px", lg: "0px 36px" },
    h: { base: "60px", md: "124px" },
    borderBottom: "1px solid",
    borderColor: "line",
  },
});

export const UserHeaderWrapper = chakra("div", {
  baseStyle: {
    d: "flex",
    w: "100%",
    //  bgColor: "bG",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "29px 30px",
    h: "86px",
    borderBottom: "1px solid",
    borderColor: "line",
  },
});

export const UserHeaderIcon = chakra("img", {
  baseStyle: {
    w: "150px",
    h: "28px",
    cursor: "pointer",
  },
});

export const ShopnameText = chakra("p", {
  baseStyle: {
    color: "lightGray",
    fontSize: "18px",
    fontWeight: "500",
  },
});

export const ShopnIcon = chakra("img", {
  baseStyle: {
    w: "18px",
    h: "18px",
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

export const HeaderButton = chakra("button", {
  baseStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minW: { base: "auto", lg: "200px" },
    h: "auto",
    //  maxH:'max-content',
    color: "white",
    bgColor: "button",
    borderRadius: "8px",
    fontWeight: "600",
    px: { base: "16px", md: "28px" },
    py: { base: "12px", md: "12px" },
    fontSize: { base: "12px", md: "20px" },
    cursor: "pointer",
    _hover: {
      bgColor: "#424242",
    },
  },
});
