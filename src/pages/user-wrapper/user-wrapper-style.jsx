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
    d:{base:'none',sm:'inline'},
    w: { sm: "78px", md: "200px" },
    h: "100%",
    mr:{ sm: "10px", md: "20px" }
  },
});

export const PageContainer = chakra("div", {
  baseStyle: {
    d: "flex",
    w: { base: "calc(100% - 120px)", md: "calc(100% - 220px)" },
    justifyContent: "center",
    alignItems: "center",
  },
});
