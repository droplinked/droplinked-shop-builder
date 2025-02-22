import { chakra } from "@chakra-ui/react";

export const SideText = chakra("div", {
  baseStyle: {
    fontFamily: "Avenir Next",
    fontWeight: "400",
    fontSize: "14px",
    mb: "16px",
  },
});

export const TextLabelBold = chakra("div", {
  baseStyle: {
    fontWeight: "bold",
    fontSize: "14px",
    color: "#FFFFFF",
  },
});
