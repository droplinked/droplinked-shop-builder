import { chakra } from "@chakra-ui/react";

export const AddressPageWrapper = chakra("div", {
  baseStyle: {
    d: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDir: "column",
    w: "100%",
    h: "auto",
  },
});

export const PageTitle = chakra("p", {
  baseStyle: {
    fontSize: { base: "20px", md: "36px" },
    fontWeight: "600",
    color: "#fff",
    m: "0px auto 48px auto",
  },
});

export const AddAddressButton = chakra("div", {
  baseStyle: {
    d: "flex",
    w: "100%",
    border: "1px",
    borderColor: "#fff",
    borderRadius: "8px",
    p: "24px 20px 16px 20px",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    fontSize: "20px",
    fontWeight: "600",
    _hover: { borderColor: "#8053ff", color: "#8053ff" },
    cursor: "pointer",
  },
});

export const ButtonWrapper = chakra("div", {
  baseStyle: {
    d: "flex",
    w: "100%",
    mt: "40px",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
