import { chakra } from "@chakra-ui/react";

export const SelectComponent = chakra("select", {
  baseStyle: {
    w: "100%",
    d: "flex",
    backgroundColor: "subLayer",
    borderRadius: "8px",
    color: "darkGray",
    p: "18px 18px",
    fontSize: "20px",
    fontWeight: "500",
    outline: "none",
    _focus: {
      border: "none",
      outline: "none",
    },
  },
});

export const OptionComponent = chakra("option", {
  baseStyle: {
    w: "100%",
    bg: "subLayer",
    color: "darkGray",
    p: "18px 18px",
  },
});

export const InputComponent = chakra("input", {
  baseStyle: {
    w: "100%",
    d: "flex",
    color: "darkGray",
    bg: "subLayer",
    p: "18px 18px",
    fontSize: "20px",
    fontWeight: "500",
    border: "none",
    outline: "none",
    borderRadius: "8px",
    _placeholder: {
      color: "darkGray",
    },
  },
});

export const CollectionContainer = chakra("div", {
  baseStyle: {
    d: "flex",
    w: "100%",
    borderRadius: "8px",
    bg: "subLayer",
    p: "18px 18px",
    flexWrap: "wrap",
    pb: "100px",
  },
});

export const CollectionItem = chakra("div", {
  baseStyle: {
    cursor:"pointer" ,
    p: "8px 16px",
    mr: "20px",
    maxH: "auto",
    fontSize: "20px",
    borderRadius: "28px",
    mb: "16px",
  },
});


