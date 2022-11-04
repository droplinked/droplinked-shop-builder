import { chakra, keyframes } from "@chakra-ui/react";

const animationKeyframes = keyframes`
  0% { margin-top: 200px;  opacity: 0; }
  100% {  margin-top: 0px; opacity: 1;}
`;

const animation = `${animationKeyframes} 1s`;

export const ShopPageContainer = chakra("div", {
  baseStyle: {
    marginTop: "0px",
    animation: animation,
    w:'100%',
    maxW:'800px',
  },
});


export const ShopnotFind = chakra("p", {
  baseStyle: {
    textAlign:'center',
    my:'auto',
   // marginTop: { base: "30px", md: "50px" },
    fontWeight: "600",
    color: " #fff",
    fontSize: { base: "24px", md: "32px" },
  },
});

export const EmptyCollectionText = chakra("p", {
  baseStyle: {
    marginTop: { base: "30px", md: "50px" },
    fontWeight: "600",
    color: " #fff",
    fontSize: { base: "20px", md: "24px" },
  },
});

export const EmptyCollectionBox = chakra("div", {
  baseStyle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "0px 0px 40px 0px",
  },
});
