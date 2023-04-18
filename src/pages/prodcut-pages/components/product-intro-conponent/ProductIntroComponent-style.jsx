import { chakra } from "@chakra-ui/react";

export const ComponentWrapper = chakra("div", {
    baseStyle: {
      w: "100%",
      maxW: "1000px",
      bg: "#1c1c1c",
      p: "50px 60px",
      borderRadius: "8px",
    },
  });
  
  export const ComponentTitle = chakra("p", {
    baseStyle: {
      fontSize: "20px",
      fontWeight: "500",
      color: "#fff",
    },
  });