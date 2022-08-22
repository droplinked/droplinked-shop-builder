import { chakra } from "@chakra-ui/react";

export const ItemContainer = chakra("div", {
  baseStyle: {
    display: "flex",
    w: "100%",
    h: "70px",
    p: "10px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export const IconWrapper = chakra("div", {
  baseStyle: {
    display: "flex",
    w: "50px",
    h: "50px",
    minW:'50px',
    minH:'50px',
    bgColor: "black",
    borderRadius: "10px",
    justifyContent: "space-between",
    alignItems: "center",
    overflow:'hidden'
  },
});
