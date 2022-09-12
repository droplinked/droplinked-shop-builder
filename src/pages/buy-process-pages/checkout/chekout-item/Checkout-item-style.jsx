import { chakra } from "@chakra-ui/react";

export const CheckoutItemWrapper = chakra("div", {
  baseStyle: {
    d: "flex",
    w: "100%",
    p: "5px",
    bgColor: "#333",
    h: "auto",
    mb: "10px",
    flexDirection: { base: "column", md: "row" },
    justifyContent: "space-between",
  },
});

export const DetailWrapper = chakra("div", {
  baseStyle: {
    d: "flex",
    w: { base: "100%", md: "50%" },
    flexDirection: "row",
  },
});

export const ProductImage = chakra("img", {
  baseStyle: {
    alt: "product image",
    w: "80px",
    h: "80px",
    mr: "20px",
    cursor: "pointer",
  },
});

export const TitleWrapper = chakra("div", {
  baseStyle: {
    d: "flex",
    flexDirection: "column",
    align: "start",
    maxW: "100%",
  },
});

export const Title = chakra("p", {
  baseStyle: {
    color: "#fff",
    fontWeight: "600",
    fontSize: { base: "16px", md: "18px" },
    mb: "5px",
    overflow: "hidden",
    cursor: "pointer",
  },
});

export const VariantText = chakra("p", {
  baseStyle: {
    color: "#ddd",
    fontWeight: "500",
    fontSize: { base: "14px", md: "13px" },
  },
});

export const ButtonWrapper = chakra("div", {
  baseStyle: {
    d: "flex",
    w: { base: "100%", md: "45%" },
    mr: "20px",
    h: { base: "60px", md: "80px" },
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export const InputQuantity = {
  borderRadius: "0px",
  cursor: "pointer",
  w: "80px",
  textAlign: "center",
  color: "#fff",
  fontSize: "20px",
  fontWeight: "600",
  _hover: { bgColor: "none", borderColor: "#8053ff" },
  _focus: { bgColor: "none", borderColor: "#8053ff" },
};

export const SubmitQuantity = {
  color: "#fff",
  fontSize: "20px",
  fontWeight: "600",
  _hover: { bgColor: "none", borderColor: "#8053ff" },
  _focus: { bgColor: "none", borderColor: "#8053ff" },
};

export const PriceText = chakra("p", {
  baseStyle: {
    color: "#fff",
    fontWeight: "600",
    fontSize: "18",
  },
});
