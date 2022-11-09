import { chakra } from "@chakra-ui/react";

export const RuleModalWrapper = chakra("div", {
  baseStyle: {
    position: "fixed",
    zIndex: "1",
    left: "0",
    top: "0",
    width: { base: "100vw", md: "100%" },
    height: "100% ",
    overflow: "auto",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    padding: { base: "30px 10px 30px 10px", md: "100px 0px 50px 0px" },
  },
});

export const RuleModalCotent = chakra("div", {
  baseStyle: {
    boxSizing: " border-box",
    height: "auto",
    margin: "auto",
    maxWidth: "1000px",
    width: { base: "100%", md: "90%", lg: "1000px", xl: "1200px" },
    background: "subLayer",
    boxShadow: "0px 2px 30px rgba(85, 88, 90, 0.1)",
    borderRadius: "24px",
    padding: { base: "30px 20px 60px 20px", md: "40px 40px 40px 40px" },
  },
});

export const ModalHeader = chakra("p", {
  baseStyle: {
    fontSize: { base: "20px", md: "24px" },
    color: "white",
    fontWeight: "600",
    mb: { base: "15px", md: "30px" },
    w: "100%",
    textAlign: "center",
  },
});

export const TypeSelect = chakra("select", {
  baseStyle: {
    fontWeight: "600",
    fontSize: { base: "10px", sm: "12px", md: "16px" },
    color: "white",
    border: "none",
    bgColor: "mainLayer",
    borderRadius: "8px",
    w: "300px",
    px: "16px",
    py: { base: "8px", md: "12px" },
    outline: "none",
    _focus: { outline: "none" },
    h: "auto",
    mr: "40px",
    _disabled: {
      color: "button",
    },
  },
});

export const TextareaInput = chakra("textarea", {
  baseStyle: {
    fontWeight: "600",
    fontSize: { base: "10px", sm: "12px", md: "16px" },
    w: "100%",
    color: "white",
    border: "none",
    bgColor: "subLayer",
    borderRadius: "8px",
    px: "16px",
    py: { base: "8px", md: "12px" },
    outline: "none",
    _focus: { outline: "none" },
  },
});

export const InputComponent = chakra("input", {
  baseStyle: {
    fontWeight: "600",
    fontSize: { base: "10px", sm: "12px", md: "16px" },
    color: "white",
    border: "none",
    bgColor: "subLayer",
    borderRadius: "8px",
    w: "100%",
    px: "16px",
    py: { base: "8px", md: "12px" },
    outline: "none",
    _focus: { outline: "none" },
    h: "auto",
    _disabled: {
      color: "button",
    },
  },
});

export const AddRuleButton = chakra("p", {
  baseStyle: {
    fontWeight: "600",
    fontSize: { base: "10px", sm: "12px", md: "16px" },
    color: "primary",
    border: "none",
    w: "100%",
    textAlign: "center",
    cursor: "pointer",
    _hover: { color: "gray" },
  },
});

export const IconComponent = chakra("img", {
  baseStyle: {
    w: { base: "12px", sm: "16px", md: "18px", lg: "22px", xl: "24px" },
    h: { base: "12px", sm: "16px", md: "18px", lg: "22px", xl: "24px" },
    mr: { base: "8px", sm: "10px", md: "12px", lg: "14px", xl: "16px" },
  },
});

export const LableInput = chakra("div", {
  baseStyle: {
    fontWeight: "600",
    fontSize: { base: "10px", sm: "12px", md: "16px" },
    color: "white",
    marginBottom: "10px",
  },
});

export const GreenIcon = chakra("div", {
  baseStyle: {
    d: "flex",
    w: { base: "14px", sm: "18px", md: "22px", lg: "28px", xl: "30px" },
    h: { base: "14px", sm: "18px", md: "22px", lg: "28px", xl: "30px" },
    borderRadius: "50% 50% 0px 50%",
    bg: "primary",
    mr: { base: "8px", sm: "10px", md: "12px", lg: "18px", xl: "18px" },
    color: "mainLayer",
    justifyContent: "center",
    alignItems: "center",
    fontSize: { base: "8px", sm: "10px", md: "12px" , lg:'16px' },
  },
});

export const TextBorder = chakra("p", {
  baseStyle: {
    fontSize: { base: "10px", sm: "12px", md: "14px", lg: "18px", xl: "20px" },
    fontWeight: "500",
    color: "white",
    pr: { base: "8px", sm: "10px", md: "12px", lg: "18px", xl: "18px" },
    borderRight: "1px solid white",
    mr: { base: "8px", sm: "10px", md: "12px", lg: "18px", xl: "18px" },
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
});
