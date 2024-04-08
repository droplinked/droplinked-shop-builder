import { chakra } from "@chakra-ui/react";

export const ThankPageWrapper = chakra("div", {
  baseStyle: {
    display: "flex",
    width: "100%",
    paddingInline: { base: "20px", md: "80px" },
    height: "auto",
    flexDirection: "column",
    alignItems: "center",
  },
});

export const ThankText = chakra("p", {
  baseStyle: {
    color: "#fff",
    fontSize: { base: "30px", sm: "40px", md: "50px", lg: "60px" },
    marginBottom: "10px",
  },
});

export const MessageText = chakra("p", {
  baseStyle: {
    color: "#fff",
    fontSize: { base: "12px", sm: "14px", md: "16px", lg: "22px" },
    fontWeight: "400",
    textAlign: "center",
    marginBottom: { base: "40px", md: "50px" },
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
