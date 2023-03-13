import { chakra, keyframes } from "@chakra-ui/react";

const animationKeyframes = keyframes`
  0% { transform: translateY(-300px); opacity: 0; }
  100% {  transform: translateY(0px); opacity: 1;}
`;



const animation = `${animationKeyframes} 0.8s`;

export const ModalContainerWrapper = chakra("div", {
  baseStyle: {
    d: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "fixed",
    zIndex: "10",
    left: "0",
    top: "0",
    width: "100%",
    height: "100%",
    overflow: "auto",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    padding: { base: "30px 30px 30px 30px", md: "100px 0px 50px 0px" },
  },
});

export const ModalBody = chakra("div", {
  baseStyle: {
    zIndex: "11",
    boxSizing: "border-box",
    height: "auto",
    margin: "auto",
    width: { base: "100%", md: "720px" },
    background: "mainLayer",
    borderRadius: "8px",
    animation:animation,
    padding: { base: "30px 20px 30px 20px", md: "60px 80px" },
  },
});


