import { chakra } from "@chakra-ui/react";

export const ShopWrapperStyle = chakra("div", {
  baseStyle: {
    display: "flex",
    w: "100%",
    px: "80px",
    justifyContent: "space-between",
    flexDir: { base: "column", md: "row" },
  },
});

export const ShopDetailWrapper = chakra("div", {
  baseStyle: {
    justifyContent: "center",
    borderRadius:'8px',
    bgColor:'#242424',
    w: "200px",
    mr: "50px",
  },
});
