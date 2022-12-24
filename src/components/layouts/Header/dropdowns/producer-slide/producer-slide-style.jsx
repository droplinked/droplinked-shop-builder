import { chakra, keyframes } from "@chakra-ui/react";

const animationKeyframes = keyframes`
  0% { transform: translateX(-80vw);}
  100% {  transform: translateX(0px);}
`;

const animation = `${animationKeyframes} 0.8s`;

export const ProducerSlideWrapper = chakra("div", {
  baseStyle: {
    h: "100vh",
    w: "80vw",
    zIndex: "50",
    bgColor: "mainLayer",
    position: "fixed",
    borderRadius: "8px",
    top: "0",
    left: "0",
    animation: animation,
    py: "30px",
  },
});

export const SlideButton = chakra("div", {
  baseStyle: {
    w: "100%",
    px: "30px",
    py: "16px",
    d: "flex",
    alignItems: "center",
    borderBottom: "1px solid gray",
  },
});

export const SlideIcon = chakra("img", {
  baseStyle: {
    w: "25px",
    h: "25px",
    mr: "30px",
  },
});

export const SlideText = chakra("p", {
  baseStyle: {
    color: "white",
    fontSize: "18px",
    fontWeight: "500",
  },
});
