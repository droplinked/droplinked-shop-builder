import { chakra } from "@chakra-ui/react";

export const CountdownWrapper = chakra("div", {
  baseStyle: {
    d:"flex",
    justifyContent:'center',
   alignItems:'center',
   flexDir:'column',
    w: "100%",
    h: "100%",
    borderRadius: "8px",
    bgColor: "primary",
    pt: "24px",
    pb:"20px"
  },
});

export const TextMessage = chakra("p", {
  baseStyle: {
    fontSize: { base: "12px", sm:'16px', md: "24px", lg:'18px'  ,xl:"24px"},
    fontWeight: "600",
    color: "#fff",
    textShadow: " 0px 4px 4px rgba(0, 0, 0, 0.25)",
    textAlign: "center",
  },
});

export const ItemWrapper = chakra("div", {
  baseStyle: {
    d: "flex",
    flexDir: "column",
    alignItems: "center",
    alignContent: "center",
  },
});

export const TimeNum = chakra("p", {
  baseStyle: {
    fontSize: { base: "10px" , sm:'12px', md: "14px", lg:'16px'  ,xl:"22px"},
    fontWeight: "700",
    color: "#fff",
  },
});

export const TimeText = chakra("p", {
  baseStyle: {
    fontSize: { base: "8px" , sm:'12px', md: "14px", lg:'10px'  ,xl:"14px"},
    fontWeight: "400",
    color: "#fff",
  },
});
