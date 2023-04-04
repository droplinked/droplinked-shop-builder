import { chakra } from "@chakra-ui/react";

export const OrderWrapper = chakra("div", {
  baseStyle: {
    border: "3px solid #d4d4d486",
    borderRadius: "30px",
    p: "15px 20px",
    cursor: "pointer",
    mb: "40px",
    transition: "0.8s",
    _hover: {
      border: "3px solid primary",
    },
  },
});

export const DateText = chakra("p", {
  baseStyle: {
    color: "#fff",
    fontSize: { base: "12px", md: "14px" },
    fontWeight: "600",
    mb: { base: "10px", md: "10px" },
  },
});

export const OrderId = chakra("p", {
  baseStyle: {
    color: "#fff",
    fontSize: { base: "12px", md: "14px" },
    fontWeight: "600",
    maxW: "50%",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
});

export const QuantityText = chakra("p", {
  baseStyle: {
    color: "#fff",
    fontSize: { base: "12px", md: "14px" },
    fontWeight: "600",
  },
});

export const ProductImage = chakra("img", {
  baseStyle: {
    w: { base: "60px", md: "90px" },
    h: { base: "60px", md: "90px" },
    borderRadius: "8px",
    mr: "20px",
  },
});

export const OrderStatus = chakra("p", {
  baseStyle: {
    color: "#fff",
    fontSize: { base: "12px", md: "18px" },
    fontWeight: "600",
    my: "auto",
    h: "100%",
    cursor: "pointer",
  },
});
