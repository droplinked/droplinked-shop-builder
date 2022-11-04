import { chakra } from "@chakra-ui/react";

export const SidebarWrapper = chakra("div", {
  baseStyle: {
    w:'100%',
    bg: "subLayer",
    px: { sm: "14px", md: "24px" },
    py: { sm: "32px", md: "56px" },
    borderRadius:'8px'
  },
});
