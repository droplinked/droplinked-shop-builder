import { chakra } from "@chakra-ui/react";

export const CollectionWrapper = chakra("div", {
  baseStyle: {
    d: "flex",
    justifyContent: "center",
    alignItems: "start",
    flexDirection: "column",
    w: "100%",
    mb: { base: "20px", md: "30px" },
    p: {
      base: "10px 10px 0px 10px",
      md: "20px 30px 20px 30px",
      lg: "60px 80px 60px 80px",
    },
    bgColor: "#242424",
    borderRadius: "8px",
  },
});
