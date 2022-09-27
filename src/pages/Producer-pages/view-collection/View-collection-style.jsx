import { chakra } from "@chakra-ui/react";

export const ViewCollectionPageWrapper = chakra("div", {
  baseStyle: {
    w: "100%",
    px: { base: "20px", md: "80px" },
  },
});

export const ProductWrapper = chakra("div", {
  baseStyle: {
    d: "flex",
    flexWrap: "wrap",
    w: "100%",
  },
});

export const CollectionTitle = chakra("p", {
  baseStyle: {
    fontSize: {base:'30px',md:"40px"},
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
    mr:'15px'
  },
});
