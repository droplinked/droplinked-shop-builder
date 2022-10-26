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
    maxWidth: "800px",
    width: { base: "100%", md: "90%" },
    background: "#353536",
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
  },
});

export const RulesetText = chakra("p", {
  baseStyle: {
    fontSize: { base: "14px", md: "16px" },
    color: "white",
    fontWeight: "500",
    mb: { base: "30px", md: "50px" },
  },
});

export const RuleSelect = chakra("select", {
  baseStyle: {
    border: "2px solid #b4b4b4",
    borderRadius: "8px",
    padding: { base: "6px 12px", md: "10px 16px 9px 16px" },
    outline: "none",
    backgroundColor: "transparent",
    color: "#fff",
    fontWeight: "600",
    fontSize: { base: "14px", md: "18px" },
    transition: "0.5s",
    backgroundColor: "#353536",
    w: { base: "100%", md: "50%" },
    ml: "10px",
  },
});

export const RuleAddressInput = chakra("input", {
  baseStyle: {
    // border: "2px solid #b4b4b4",
    borderRadius: "8px",
    px: "16px",
    py: { base: "8px", md: "12px" },
    outline: "none",
    backgroundColor: "transparent",
    color: "lightGray",
    bg: "dark",
    fontWeight: "600",
    fontSize: { base: "14px", md: "18px" },
    transition: "0.5s",
    backgroundColor: "#353536",
    w: "100%",
    // w: { base: "100%", md: "50%" },
  },
});

export const RuleAddressShow = chakra("div", {
  baseStyle: {
    border: "2px solid #b4b4b4",
    borderRadius: "8px",
    padding: { base: "6px 12px", md: "10px 16px 9px 16px" },
    outline: "none",
    backgroundColor: "transparent",
    color: "#fff",
    fontWeight: "600",
    fontSize: { base: "14px", md: "18px" },
    transition: "0.5s",
    backgroundColor: "#353536",
    w: { base: "100%", md: "50%" },
  },
});

export const AddressWrapper = chakra("div", {
  baseStyle: {
    display: "flex",
    pl: "40px",
    w: "100%",
    color: "white",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "24px",
    fontWeight: "600",
  },
});

export const AddRuleButton = chakra("button", {
  baseStyle: {
    fontSize: { base: "16px", md: "20px" },
    color: "white",
    borderBottom: "1px solid white",
    cursor: "pointer",
    _hover: {
      color: "#8053ff",
      borderColor: "#8053ff",
    },
  },
});
