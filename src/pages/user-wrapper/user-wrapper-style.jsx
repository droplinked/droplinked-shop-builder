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
    w: { base: "100px", md: "200px" },
    h: "300px",
    bg: "subLayer",
    mr: "20px",
    bg: "subLayer",
    px: { base: "14px", md: "32px" },
    py: { base: "32px", md: "56px" },
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
