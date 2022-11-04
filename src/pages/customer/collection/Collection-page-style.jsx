import { chakra } from "@chakra-ui/react";

export const CollectionPageWrapper = chakra("div", {
  baseStyle: {
    width: "100%",
    margin: " 0px auto",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },
});

export const HeaderTitle = chakra("p", {
  baseStyle: {
    fontSize: { base: "30px", md: "40px" },
    color: "white",
    fontWeight: "600 ",
    textAlign: "center",
  },
});
