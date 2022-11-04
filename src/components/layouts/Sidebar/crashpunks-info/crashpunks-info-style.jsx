import { chakra } from "@chakra-ui/react";

export const IconWrapper = chakra("a", {
  baseStyle: {
    display: "flex",
    alignItems: "center",
    width: {base:"20px",md:'20px'},
    height: {base:"20px",md:'20px'},
    padding: "auto 0px",
    mb:'20px',
    cursor: 'pointer',
  },
});
