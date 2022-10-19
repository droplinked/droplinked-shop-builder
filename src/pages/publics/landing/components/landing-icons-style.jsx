import { chakra } from "@chakra-ui/react";

export const Iconwrapper = chakra("div", {
  baseStyle: {
    maxW: { base: "200px", md: "230px" },
    w: { base: "50%", md: "33%" },
    d: "flex",
    flexDir: "column",
    justifyContent: "center",
    alignItems: "center",
    mb: {base:'50px',md:"70px"}
  },
});

export const RowWrapper = chakra("div", {
  baseStyle: {
    d: "flex",
    justifyContent: "space-between",
    maxW: "800px",
    mx: "auto",
    mb: "70px",
  },
});

export const IconImage = chakra("img", {
  baseStyle: {
    maxWidth: "100% ",
    height: "auto ",
  },
});

export const ImageWrapper = chakra("div", {
  baseStyle: {
    d: "flex",
    justifyContent: "center",
    alignItems: "center",
    w: { base: "60px", md: "80px" },
    h: { base: "60px", md: "80px" },
    mb: { base: "20px", md: "40px" },
  },
});

export const IconText = chakra("p", {
  baseStyle: {
    color: "lightGray",
    fontSize: { base: "14px", sm: "16", md: "22px" },
    fontWeight: "500",
  },
});
