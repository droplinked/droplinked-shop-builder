import { chakra } from "@chakra-ui/react";

export const SignupWrapper = chakra("div", {
  baseStyle: {
    d: "flex",
    justifyContent: "space-between",
    w: { base: "100%", md: "80%" },
    h: "auto",
    borderRadius: "8px",
    p: "8px",
    alignItems: "center",
    border: "2px",
    borderColor: "#8053ff",
    mt: { base: "36px", md: "3vw" },
  },
});

export const DomainText = chakra("p", {
  baseStyle: {
    fontWeight: "600",
    fontSize: { base: "16px", md: "1.7vw" },
    lineHeight: "28px",
    color: "#fff",
    m: "auto 0px",
    pt: { base: "2px", md: "0px" },
  },
});

export const ShopNameInput = chakra("input", {
  baseStyle: {
    fontWeight: "600",
    fontSize: { base: "16px", md: "1.7vw" },
    lineHeight: "28px",
    color: "#fff",
    bg: "transparent",
    m: "auto 0px",
    border: "none",
    p: { base: "2px 0px 0px 0px", md: "0px" },
    _focus: { border: "none", outline: "none" },
  },
});

export const SignupButton = chakra("button", {
  baseStyle: {
    d: "flex",
    w: "100%",
    h: { base: "40px", md: "100%" },
    justifyContent: "center",
    alignItems: "center",
    p: { base: "12px 20px 9px 20px", md: "12px 20px" },
    bg: "primary",
    borderRadius: "8px",
    fontWeight: "600",
    fontSize: { base: "16px", md: "1.4vw" },
    textAlign: "center",
    color: "#fff",
    whiteSpace: "nowrap",
    verticalAlign: "middle",
    _hover: { bg: "#8053ff" },
  },
});

export const ErrorText = chakra("button", {
  baseStyle: {
    m: "auto 0px",
    pl: "5px",
    fontWeight: "500",
    fontSize: { base: "12px", md: "14px" },
    color: "#b3b3b3",
    lineHeight: "28px",
  },
});
