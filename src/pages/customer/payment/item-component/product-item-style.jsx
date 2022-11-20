import { chakra } from "@chakra-ui/react";

export const ProductWrapper = chakra("div", {
  baseStyle: {
    w: "100%",
    mb: "16px",
    borderBottom: "1px solid #757575",
    pb: "16px",
  },
});

export const ProductTitle = chakra("p", {
  baseStyle: {
    color: "#fff",
    fontWeight: "500",
    fontSize: { base: "18px", md: "24px" },
    mb: "7px",
    w: "100%",
  },
});

export const VariantText = chakra("p", {
  baseStyle: {
    color: "#fff",
    fontWeight: "400",
    fontSize: { base: "16px", md: "20px" },
  },
});
