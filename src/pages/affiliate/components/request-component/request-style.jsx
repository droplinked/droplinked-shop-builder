import { chakra } from "@chakra-ui/react";

export const TextComponent = chakra("p", {
  baseStyle: {
    fontSize: "12px",
    fontWeight: "400",
    color: "white",
  },
});




export const RequestButton = chakra("button", {
  baseStyle: {
    w:'140px',
    p:'8px 0px',
    borderRadius:"36px" ,
    fontSize:'14px',
    fontWeight:'500'
  },
});
