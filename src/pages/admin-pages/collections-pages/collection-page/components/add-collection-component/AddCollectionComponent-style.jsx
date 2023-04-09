import { chakra } from "@chakra-ui/react";


export const InputProductComponent = chakra("div", {
    baseStyle: {
      d: "flex",
      w: "100%",
      border: "2px solid #aaa",
      borderRadius: "12px",
      cursor: "pointer",
      flexDir: "column",
      _hover: {
        borderColor: "#ddd",
      },
    },
  });
  