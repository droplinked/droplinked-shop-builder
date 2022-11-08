import { chakra } from "@chakra-ui/react";

export const UserWrapperPage = chakra("div", {
  baseStyle: {
    d: "flex",
    alignItems: "start",
    width: "100%",
    px: { base: "20px", md: "80px" },
    h: "auto",
  },
});

export const SideBarWrapper = chakra("div", {
  baseStyle: {
    d: { base: "none", sm: "inline" },
    w: { sm: "78px", lg: "200px" , xl:'23%' },
    h: "100%",
    mr: { sm: "10px", md: "20px" },
  },
});

export const PageContainer = chakra("div", {
  baseStyle: {
    d: "flex",
   // w: { base: "100%", sm: "calc(100% - 120px)",lg:"calc(100% - 200px)"  ,xl: "calc(100% - 23%)" },
   w:'100%',
    justifyContent: "center",
    alignItems: "center",
  },
});
