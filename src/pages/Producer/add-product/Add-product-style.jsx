import { chakra } from "@chakra-ui/react";

export const ModalContainerWrapper = chakra("div", {
  baseStyle: {
    d: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    maxWidth: "900px",
    bg: "subLayer",
    p: { base: "30px 20px", md: "50px 80px" },
    borderRadius: "8px",
  },
});

export const TitleText = chakra("p", {
  baseStyle: {
    color: "white",
    fontWeight: "600",
    fontSize: { base: "26px", md: "30px" },
    mb: "40px",
  },
});

//padding: 0px 20px;
