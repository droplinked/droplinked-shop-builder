import { chakra } from "@chakra-ui/react";

const FooterWrapper = chakra("div", {
  baseStyle: {},
});

const FooterBody = chakra("div", {
  baseStyle: {
    width: "90%",
    margin: "auto",
    height: "auto",
    display: "flex",
    alignItems: "baseline",
    flexDir: { base: "column", md: "row" },
    justifyContent: { base: "center", md: "space-between" },
  },
});

const Leftside = chakra("div", {
  baseStyle: {
    display: "flex",
    justifyContent: { base: "center", md: "flex-start" },
    alignItems: "center",
  },
});

const FooterText = chakra("p", {
  baseStyle: {
    margin: "auto 12px auto 0px  ",
    fontWeight: "400",
    fontSize: { base: "16px", md: "20px" },
    color: "white",
  },
});

const FooterLogo = chakra("img", {
  baseStyle: {
    width: '200px',
    height: "auto",
    margin: "auto 0px",
    bg:'linear-gradient(0deg, rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45))'
  },
});

const RightSide = chakra("div", {
  baseStyle: {
    width: "30%",
    margin: { base: "12px 0px 0px 0px", md: "auto 0px" },
    display: "flex",
    justifyContent: { base: "center", md: "start" },
    alignItems: "center",
  },
});

const TermText = chakra("span", {
  baseStyle: {
    fontWeight: "bold",
    fontSize: "12px",
    textAlign: "right",
    color: "#808080",
  },
});

const FooterIcon = chakra("img", {
  baseStyle: {
    width: { base: "16px", md: "25px" },
    height: { base: "16px", md: "25px" },
  },
});

export const footerStyles = {
  FooterWrapper,
  FooterBody,
  Leftside,
  FooterText,
  FooterLogo,
  RightSide,
  TermText,
  FooterIcon,
};
