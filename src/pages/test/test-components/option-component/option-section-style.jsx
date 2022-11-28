import { chakra } from "@chakra-ui/react";

export const SelectTag = chakra("select", {
  baseStyle: {
    w: "100%",
    d: "flex",
    justifyContent: "space-between",
    p: "18px",
    bg: "mainLayer",
    border: "none",
    outline: "none",
    borderRadius: "8px",
    color: "darkGray",
    fontSize: "20px",
  },
});

export const OptionTag = chakra("option", {
  baseStyle: {
    bg: "subLayer",
    color: "darkGray",
    fontSize: "20px",
  },
});

export const ValueInput = chakra("input", {
  baseStyle: {
    w: "100%",
    bg: "mainLayer",
    color: "darkGray",
    fontSize: "20px",
    p: "18px",
    borderRadius: "8px",
    border: "none",
    outline: "none",
    _placeholder: {
      color: "darkGray",
    },
  },
});
