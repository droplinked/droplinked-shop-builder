import { chakra } from "@chakra-ui/react";

export const ShopWrapperStyle = chakra("div", {
  baseStyle: {
    display: "flex",
    w: "100%",
    px: {base:'20px',md:"80px"},
    justifyContent: "space-between",
    flexDir: { base: "column", md: "row" },
  },
});

export const ShopDetailWrapper = chakra("div", {
  baseStyle: {
    justifyContent: "center",
    borderRadius:'8px',
    bgColor:'#242424',
    w: {base:'100%' ,md:"250px"},
    mr: "30px",
  },
});
