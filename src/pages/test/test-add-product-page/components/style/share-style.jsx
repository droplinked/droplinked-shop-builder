import { chakra } from "@chakra-ui/react";

export const SectionWrapper = chakra("div", {
  baseStyle: {
    w: "100%",
    bg: "mainLayer",
    p: "50px 60px",
    borderRadius: "8px",
  },
});

export const SectionTitle = chakra("p", {
  baseStyle: {
    fontWeight: "500",
    fontSize: "24px",
    color: "white",
  },
});


export const Margin48px = chakra("div", {
    baseStyle: {
      mb:'48px'
    },
  });

  export const Margin40px = chakra("div", {
    baseStyle: {
      mb:'40px'
    },
  });