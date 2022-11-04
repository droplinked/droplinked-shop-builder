import { chakra } from "@chakra-ui/react";

export const CartIconWrapper = chakra("div", {
  baseStyle: {
    pos: "relative",
    w: { base: "25px", md: "36px" },
    h: { base: "25px", md: "36px" },
    cursor: "pointer",
    mr: { base: "8px", md: "12px" },
  },
});

export const IconImage = chakra("img", {
  baseStyle: {
    h: "100%",
    w: "100%",
    pos: "absolute",
  },
});

export const ItemCounter = chakra("div", {
  baseStyle: {
    w: { base: "15px", md: "20px" },
    h: { base: "15px", md: "20px" },
    color: "#181818",
    fontSize: { base: "8px", md: "12px" },
    pos: "absolute",
    right: "-5px",
    top: "-5px",
    bgColor: "primary",
    borderRadius: "50%",
    fontWeight: "600",
    border: "2px solid primary",
    d: "flex",
    justifyContent: "center",
    justifyItems: "center",
    alignItem: "center",
  },
});
