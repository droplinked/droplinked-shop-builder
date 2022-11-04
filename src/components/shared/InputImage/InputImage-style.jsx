import { chakra } from "@chakra-ui/react";

export const InputImageWrrapper = chakra("div", {
  baseStyle: {
    pos: "relative",
    maxW: "150px",
    w: "150px",
    m: "0px auto",
  },
});

export const InputImageContainer = chakra("div", {
  baseStyle: {
    pos: "absolute",
    right: "0px",
    zIndex: "1",
    top: "10px",
  },
});

export const BackGroundImage = chakra("div", {
  baseStyle: {
    w: "100%",
    h: "100%",
    border: "6px",
    borderColor: "primary",
    borderRadius: "100%",
    bgRepeat: "no-repeat",
    bgPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export const BackGroundImageWrapper = chakra("div", {
  baseStyle: {
    w: "100%",
    h: "150px",
    pos: "relative",
    borderRadius: "100%",
    border: "4px",
    borderColor: "primary",
    boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.1)",
  },
});


export const LabelTest = chakra("lable", {
    baseStyle: {
       
        display:"flex",
        w:"30px",
        h:"30px",
        mb:"0",
        borderRadius:"100%",
        bgColor:"#222",
        border:"2px",
        borderColor:"primary",
        cursor:"pointer",
        justifyContent:"center",
        alignItems:"center",
        _hover:{ border: "4px", borderColor: "primary" },
    },
  });
  
