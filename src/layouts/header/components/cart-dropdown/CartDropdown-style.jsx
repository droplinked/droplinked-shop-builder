import { chakra } from "@chakra-ui/react";

export const CardWrapper = chakra("div", {
  baseStyle: {
    borderRadius: "8px ",
    width: { base: "250px", md: "300px" },
    height: "auto",
    padding: { base: "20px 20px", md: "28px 28px" },
    position: "absolute",
    top: { base: "60px", md: "110px" },
    right: { base: "20px", md: "80px" },
    zIndex: "50",
    backgroundColor: "#353536",
    margin: "0px auto",
  },
});

export const EmptyText = chakra("p", {
  baseStyle: {
    color: "white",
    w: "100%",
    textAlign: "center",
    fontSize: { base: "18px", md: "24px" },
    fontWeight: "600",
    my: { base: "0px", md: "20px" },
    h: "100%",
  },
});
