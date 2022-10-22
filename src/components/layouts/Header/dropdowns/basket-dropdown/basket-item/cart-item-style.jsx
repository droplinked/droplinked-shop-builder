import { chakra } from "@chakra-ui/react";

export const CartItemWrapper = chakra("div", {
  baseStyle: {
    w: "100%",
    h: "80px",
    py: "10px",
    borderBottom: "1px",
    borderColor: "white",
    display: "flex",
    pos: "relative",
  },
});

export const ItemImage = chakra("img", {
  baseStyle: {
    w: "25%",
    h: "100%",
    // mr: "10px",
    alt: "Merch",
    cursor: "pointer",
  },
});

export const ItemDetail = chakra("div", {
  baseStyle: {
    w: "75%",
    h: "100%",
    pl: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
});

export const ItemTitle = chakra("p", {
  baseStyle: {
    textAlign: "start",
    fontSize: "14px",
    color: "white",
    fontWeight: "600",
    cursor: "pointer",
    overflow: "hidden",
    whiteSpace: "nowrap",
    maxW: "60%",
    textOverflow: "ellipsis",
  },
});

export const ItemPrice = chakra("p", {
  baseStyle: {
    w: "auto",
    textAlign: "center",
    fontSize: "18px",
    color: "white",
    fontWeight: "500",
  },
});

export const ItemQuantity = chakra("p", {
  baseStyle: {
    textAlign: "center",
    fontSize: "12px",
    color: "#ccc",
    fontWeight: "500",
  },
});

export const RowWrapper = chakra("div", {
  baseStyle: {
    w: "100%",
    maxW: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
