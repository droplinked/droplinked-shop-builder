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
