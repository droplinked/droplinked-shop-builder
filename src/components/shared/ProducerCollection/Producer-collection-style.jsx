import { chakra } from "@chakra-ui/react";

export const ProducerCollectionWrapper = chakra("div", {
  baseStyle: {
    width: "100%",
    border: "3px solid #d4d4d486",
    borderRadius: "30px",
    padding: { base: "15px 10px 10px 10px", md: "25px 20px 15px 20px" },
    transition: "0.8s",
    _hover: {
      border: "3px solid #8053ff",
    },
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
  px: 4,
  py: 1,
  fontSize: { base: "16px", md: "20px" },
  transition: "all 0.2s",
  borderRadius: "md",
  border: "1px solid #555",
};

export const InputProductComponent = chakra("div", {
  baseStyle: {
    d: "flex",
    w: "100%",
    border: "2px solid #aaa",
    borderRadius: "12px",
    cursor: "pointer",
    flexDir: "column",
    _hover: {
      borderColor: "#ddd",
    },
  },
});
