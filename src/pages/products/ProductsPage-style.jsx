import { chakra } from "@chakra-ui/react";

export const PageWrapper = chakra("div", {
  baseStyle: {
    w: "100%",
    bg: "mainLayer",
    borderRadius: "8px",
    p: "36px 48px",
  },
});
