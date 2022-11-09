import { chakra, keyframes } from "@chakra-ui/react";

export const ProfileImageWrapper = chakra("div", {
  baseStyle: {
    borderRadius: " 50%",
    margin: "auto 0px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: { base: "80px", md: "120px" },
    height: { base: "80px", md: "120px" },
  },
});

export const ShopName = chakra("p", {
  baseStyle: {
    fontWeight: " 600",
    fontSize: { base: "24px", md: "32px" },
    lineHeight: "44px",
    textalign: "center",
    color: "#ffffff",
  },
});

export const IconsWrapper = chakra("a", {
  baseStyle: {
    display: "flex",
    alignItems: "center",
    margin: "4px 18px",
    width: "30px",
    height: "30px",
    padding: "auto 0px",
    aspectRatio: "1 / 1;",
  },
});

export const IconImage = chakra("img", {
  baseStyle: {
    display: "flex",
    margin: "auto 0px",
  },
});

export const EditButton = chakra("button", {
  baseStyle: {
    w: "auto",
    color: "primary",
    fontWeight: "600",
    mt: { base: "20px", md: "30px" },
    fontSize: { base: "16px", md: "20px" },
    _hover: {
      color: "#b3b3b3",
    },
  },
});
