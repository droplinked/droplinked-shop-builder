import { chakra } from "@chakra-ui/react";

export const MerchPageWrapper = chakra("div", {
  baseStyle: {
    d: "flex",
    justifyContent: "space-between",
    maxW: "1000px",
    w: "100%",
    flexWrap: "wrap",
    m: "auto",
  },
});

export const DescriptionWrapper = chakra("div", {
  baseStyle: {
    display: "flex",
    mt: { base: "20px", md: "80px" },
    w: "100%",
    flexDir: "column",
    alignItems: "center",
    pr: { base: "20px", md: "0px" },
    overflow: "hidden",
  },
});

export const DescriptionText = chakra("p", {
  baseStyle: {
    fontWeight: "500",
    fontSize: "18px",
    w: "100%",
    color: "#b3b3b3",
    whiteSpace: "pre-line",
    overflow: "hidden",
    textOverflow: "ellipsis",
    __css: {
      "&::-webkit-line-clamp": {
        w: "2",
      },
      "&::-webkit-box-orient": {
        w: "vertical",
      },
    },
  },
});

export const ReadmoreButton = chakra("div", {
  baseStyle: {
    color: "#fff",
    fontSize: "16px",
    w: "auto",
    textAlign: "center",
    mt: "20px",
    border: "1px solid #aaa",
    p: "5px 10px",
    borderRadius: "8px",
    cursor: "pointer",
    _hover: { border: "1px solid #fff" },
  },
});

export const VariantSelect = chakra("select", {
  baseStyle: {
  //  border: "2px solid #b4b4b4",
    borderRadius: "8px",
    padding: { base: "12px 16px 9px 16px", md: "8px 24px" },
    outline: "none",
    backgroundColor: "transparent",
    color: "#fff",
    fontWeight: "600",
    fontSize: { base: "16px", md: "20px" },
    transition: "0.5s",
    backgroundColor: "#353536",
    w: "100%",
  },
});

export const QuantityButton = chakra("div", {
  baseStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    w: "35px",
    h: "35px",
    mr: "8px",
    borderRadius: "8px",
    p: "5px",
  },
});

export const ProductTitle = chakra("p", {
  baseStyle: {
    color: "#fff",
    fontSize: {base:"26px",md:'22px',lg:'30px'},
    fontWeight: "600",
  },
});

export const ProductShopname = chakra("p", {
  baseStyle: {
    color: "#B3B3B3",
    fontSize: { base: "20px", md: "22px" },
    fontWeight: "600",
    cursor: "pointer",
    display: "inline-block",
    _hover: { color: "#fff" },
  },
});

export const DetailWrapper = chakra("div", {
  baseStyle: {
    display: "flex",
    w: { base: "100%", md: "50%" },
    pl: { base: "0px", md: "20px" },
    pb: { base: "0px", md: "80px" },
    mt: { base: "40px", md: "0px" },
    mb: { base: "40px", md: "0px" },
    h: { base: "320px", md: "auto" },
    flexDir: "column",
    justifyContent: "space-between",
  },
});

export const DescriptionTextWrapper = chakra("p", {
  baseStyle: {
    fontWeight: "500",
    fontSize: "18px",
    w: "100%",
    color: "#b3b3b3",
    textOverflow: "ellipsis",
    overflow: "hidden",
  },
});

export const ReadmoreIconWrapper = chakra("p", {
  baseStyle: {
    w: "auto",
    h: "auto",
    mt: "30px",
    cursor: "pointer",
    transition: "0.5s",
  },
});
