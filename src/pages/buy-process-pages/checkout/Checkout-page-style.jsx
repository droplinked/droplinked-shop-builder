import { chakra } from "@chakra-ui/react";

export const CheckoutPageWrapper = chakra("div", {
  baseStyle: {
    d: "flex",
    w: "100%",
    maxW: "980px",
    m: "0px auto",
    px: { base: "20px", md: "80px" },
    flexDirection: "column",
  },
});

export const PriceWrapper = chakra("div", {
  baseStyle: {
    display: "flex",
    w: "100%",
    justifyContent: "space-between",
    borderTop: "2px",
    borderColor: "#8053ff",
    pt: "20px",
  },
});

export const ButtonWrapper = chakra("div", {
  baseStyle: {
    display:'flex',
    w: "100%",
    justifyContent: "space-between",
    h: { base: "40px", md: "40px" },
    mt: "40px",
  },
});

export const EmptyText = chakra("p", {
  baseStyle: {
    fontSize: { base: "20px", md: "24px" },
    fontWeight: "600",
    color: "#fff",
    m: "0px auto 40px auto",
  },
});

export const HeadText = chakra("p", {
  baseStyle: {
    fontSize: { base: "20px", md: "24px" },
    fontWeight: "600",
    color: "#fff",
    m: "0px auto 40px auto",
  },
});

export const PriceText = chakra("p", {
  baseStyle: {
    color: "#fff",
    fontSize: { base: "18px", md: "22px" },
    fontWeight: "600",
  },
});
