import { chakra } from "@chakra-ui/react";

export const CheckoutItemWrapper = chakra("div", {
  baseStyle: {
    d: "flex",
    w: "100%",
    p: "20px 40px",
    h: "auto",
    //  mb: "28px",
    flexDirection: { base: "column", md: "row" },
    justifyContent: "space-between",
    pos:'relative'
  },
});

export const DetailWrapper = chakra("div", {
  baseStyle: {
    d: "flex",
    w: { base: "100%", md: "60%" },
    flexDirection: "row",
    mb: { base: "20px", md: "0px" },
  },
});

export const ProductImage = chakra("img", {
  baseStyle: {
    alt: "product image",
    w: "100px",
    h: "100px",
    mr: "20px",
    cursor: "pointer",
    borderRadius: "8px",
  },
});

export const TitleWrapper = chakra("div", {
  baseStyle: {
    d: "flex",
    flexDirection: "column",
    align: "start",
    //maxW: "100%",
    w: "100%",
    overflow: "hidden",
  },
});

export const Title = chakra("p", {
  baseStyle: {
    color: "#fff",
    fontWeight: "600",
    fontSize: { base: "16px", md: "24px" },
    mb: "5px",
    overflow: "hidden",
    cursor: "pointer",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
});

export const VariantText = chakra("p", {
  baseStyle: {
    color: "#ddd",
    fontWeight: "500",
    fontSize: { base: "14px", md: "18px" },
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
    fontSize: "24",
  },
});

export const ButtonControllerWrapper = chakra("div", {
  baseStyle: {
    d: "flex",
    flexDir: "column",
    justifyContent: "space-between",
    w: { base: "100%", md: "35%" },
  },
});

export const CounterWrapper = chakra("div", {
  baseStyle: {
    display: "flex",
    w: "60%",
    border: "1px solid gray",
    borderRadius: "8px",
   // mb: "10px",
    px: "20px",
  },
});

export const QuantityInput = chakra("input", {
  baseStyle: {
    color: "#fff",
    border: "none",
    w:'100%',
    fontWeight: "600",
    textAlign: "center",
    outline: "none",
    bgColor:'transparent',
    _focus: {
      border: "none",
      outline: "none",
    },
    fontSize: { base: "16px", md: "20px" },
  },
});

export const IconWrapper = chakra("div", {
  baseStyle: {
    d: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
});

export const TotalPerItem = chakra("div", {
  baseStyle: {
    w: "35%",
    fontWeight: "600",
    fontSize: { base: "16px", md: "20px" },
    color: "#fff",
    textAlign: "end",
    h:'100%'
  },
});
