import { chakra } from "@chakra-ui/react";

export const ThankPageWrapper = chakra("div", {
  baseStyle: {
    d: "flex",
    w: "100%",
    px: { base: "20px", md: "80px" },
    h: "auto",
    flexDirection: "column",
    alignItems: "center",
  },
});

export const ThankText = chakra("p", {
  baseStyle: {
    color: "#fff",
    fontSize: { base: "30px", sm: "40px", md: "50px", lg: "60px" },
    mb: "10px",
  },
});

export const MessageText = chakra("p", {
  baseStyle: {
    color: "#fff",
    fontSize: { base: "12px", sm: "14px", md: "16px", lg: "22px" },
    fontWeight: "400",
    textAlign: "center",
    mb: { base: "40px", md: "50px" },
  },
});

export const EmailText = chakra("span", {
  baseStyle: {
    color: "#fff",
    bgColor: "transparent",
    fontStyle: "avenir",
    fontWeight: "600",
  },
});
