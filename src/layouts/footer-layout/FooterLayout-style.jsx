import { chakra } from "@chakra-ui/react";

export const FooterWrapper = chakra("div", {
  baseStyle: {
    minWidth: "100%",
    padding: { base: "30px 20px", md: "70px 40px", lg: '70px 80px' },
    backgroundColor: "#000",
    display: "flex",
    justifyContent: "center",
    color: "#FFF"
  },
});

export const FooterBody = chakra("div", {
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

export const Leftside = chakra("div", {
  baseStyle: {
    display: "flex",
    justifyContent: { base: "center", md: "flex-start" },
    alignItems: "center",
  },
});

export const FooterText = chakra("p", {
  baseStyle: {
    margin: "auto 12px auto 0px  ",
    fontWeight: "400",
    fontSize: { base: "16px", md: "20px" },
    color: "white",
  },
});

export const FooterLogo = chakra("img", {
  baseStyle: {
    width: { base: "130px", md: "200px" },
    height: { base: "17px", md: "26px" },
    margin: "auto 0px",
  },
});

export const RightSide = chakra("div", {
  baseStyle: {
    width: "30%",
    margin: { base: "12px 0px 0px 0px", md: "auto 0px" },
    display: "flex",
    justifyContent: { base: "center", md: "start" },
    alignItems: "center",
  },
});

export const TermText = chakra("span", {
  baseStyle: {
    fontWeight: "bold",
    fontSize: "15px",
    lineHeight: "16px",
    textAlign: "right",
    color: "#808080",
  },
});



export const FooterIcon = chakra("img", {
  baseStyle: {
    width: { base: "16px", md: "25px" },
    height: { base: "16px", md: "25px" },
  },
});