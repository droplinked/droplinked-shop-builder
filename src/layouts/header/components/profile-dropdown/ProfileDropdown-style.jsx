import { chakra } from "@chakra-ui/react";

export const ProfileDropdownWrapper = chakra("div", {
  baseStyle: {
    display: "flex",
    pos: "absolute",
    top: { base: "60px", md: "110px" },
    right: "20px",
    w: { base: "200px", md: "250px" },
    h: "auto",
    minH: "100px",
    borderRadius: "16px",
    overflow: "hidden",
    zIndex: "20",
    p: "24px",
    bgColor: "button",
    flexDirection: "column",
  },
});

export const ProfileItem = chakra("div", {
  baseStyle: {
    p: "10px 0px",
    fontSize: { base: "16px", md: "20px" },
    textAlign: "center",
    fontWeight: "600",
    cursor: "pointer",
    color: "white",
    w: "100%",
    _hover: {
      bgColor: "#333",
    },
  },
});
