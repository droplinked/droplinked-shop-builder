import { chakra } from "@chakra-ui/react";

export const SidebarWrapper = chakra("div", {
  baseStyle: {
    w:'100%',
    bg: "subLayer",
    px: { base: "14px", md: "24px" },
    py: { base: "32px", md: "56px" },
    borderRadius:'8px'
  },
});
