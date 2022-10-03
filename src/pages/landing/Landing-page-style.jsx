import { chakra } from "@chakra-ui/react";

export const LandingPageWrapper = chakra("div", {
  baseStyle: {
    display: "flex",
    h: "auto",
    flexDirection: { base: "column", md: "row" },
    pl: { base: "20px", md: "120px" },
    w: "100%",
  },
});

export const InputContainrt = chakra("div", {
  baseStyle: {
    display: "flex",
    w: { base: "100%", md: "50%" },
    pr: { base: "20px", md: "0px" },
    mb: { base: "70px", md: "0px" },
  },
});

export const TextUp = chakra("p", {
  baseStyle: {
    fontWeight: "600",
    color: "#fff",
    fontSize: { base: "40px", md: "4.7vw" },
    lineHeight: { base: "52px", md: "5.5vw" },
  },
});

export const Text2 = chakra("p", {
  baseStyle: {
    mt: { base: "25px", md: "1.8vw" },
    fontWeight: "400",
    fontSize: { base: "17px", md: "1.95vw" },
    lineHeight: { base: "22px", md: "33px" },
    color: "#f6f6f6",
  },
});

export const TextContainer = chakra("div", {
  baseStyle: {
    w: "100%",
    flexDir: "column",
    mt: "4.5vw",
  },
});
