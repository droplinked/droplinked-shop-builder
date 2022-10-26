import { chakra } from "@chakra-ui/react";

export const ProducerCollectionWrapper = chakra("div", {
  baseStyle: {
    width: "100%",
    borderRadius: "8px",
    padding: { base: "15px 10px 10px 10px", md: "25px 20px 15px 20px" },
    transition: "0.8s",
    bg:'subLayer',
  },
});

export const ShopNameText = chakra("div", {
  baseStyle: {
    color: "#fff",
    fontWeight: "600",
    fontSize: { base: "18px", md: "24px" },
    pt: { base: "3px", md: "0px" },
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
});

export const MenuItem = chakra("button", {
  baseStyle: {
    color: "#fff",
    fontWeight: "600",
    fontSize: { base: "18px", md: "24px" },
  },
});

export const menuItemStyle = {
  color: "white",
  px: "4",
  py: "2",
  bgColor: "#222",
  _hover: { bg: "#333" },
  _focus: { bg: "#333" },
  fontSize: { base: "16px", md: "20px" },
};

export const menuButtonStyle = {
  color: "white",
  bg:'mainLayer',
  px: 4,
  py: 1,
  fontSize: { base: "16px", md: "20px" },
  transition: "all 0.2s",
  borderRadius: "md",
};

