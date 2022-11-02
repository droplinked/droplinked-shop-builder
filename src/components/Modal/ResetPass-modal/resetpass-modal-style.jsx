import { chakra } from "@chakra-ui/react";

export const Title = chakra("p", {
  baseStyle: {
    width: "100%",
    color: "white",
    fontSize: { base: "20px", md: "28px" },
    textAlign: "center",
    fontWeight: "600",
  },
});

export const Detail = chakra("p", {
  baseStyle: {
    mt: "40px",
    color: "#fff",
    fontSize: { base: "12px", md: "16px" },
    width: "100%",
    fontWeight: "500",
  },
});

export const BacktoLoginButton = chakra("div", {
  baseStyle: {
    marginTop: "30px",
    color: "white",
    fontSize: "14px",
    width: "auto",
    textAlign: "center",
    fontWeight: "500",
    cursor: "pointer",
    _hover: {
        color: "#b3b3b3",
      },
  },
});
