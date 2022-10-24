import { chakra } from "@chakra-ui/react";

export const RegisterPageWrapper = chakra("div", {
  baseStyle: {
    d: "flex",
    w: "100%",
    maxW: "1200px",
    m: { base: "30px auto 0px auto", md: "0px auto" },
    //  px: { base: "20px", md: "80px" },
    flexDirection: "column",
  },
});