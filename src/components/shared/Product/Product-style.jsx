import { chakra } from "@chakra-ui/react";

export const ProductContent = chakra("div", {
  baseStyle: {
    w: "100%",
    h: "auto",
    overflow: "hidden",
    borderRadius: "12px",
    cursor: "pointer",
    pos: "relative",
    p: "0px",
    m: "0px",
  },
});

export const ProductImage = chakra("img", {
  baseStyle: {
    w: "100%",
    h: "100%",
    // _hover: {
    //   opacity: "0.6",
    //   transform: "scale(1.2)",
    //   transition: "all 2s ease-out",
    // },
  },
});

export const ProductTitle = chakra("p", {
  baseStyle: {
    fontWeight: "500",
    fontSize: { base: "12px", sm: "14px", md: "16px" },
    color: "#fff",
    mt: "12px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
});
