import { chakra } from "@chakra-ui/react";

export const MerchpageContainer = chakra("div", {
  baseStyle: {
    width: " 100%",
    display: "flex",
    justifyContent:'center',
    flexDirection: "column",
    height: "auto",
    bg:'subLayer',
    borderRadius:'8px',
    px: { base: "20px", sm: "40px", md: "80px" },
    py: { base: "20px", sm: "20px", md: "60px" },
  },
});
