import { chakra } from "@chakra-ui/react";

export const ModalContainerWrapper = chakra("div", {
  baseStyle: {
    d: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    bg: "subLayer",
    borderRadius: "8px",
    p:{base:'30px 20px',sm:'40px 30px' , md:'40px 60px' , lg:'40px 100px'  }
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


