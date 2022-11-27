import { chakra } from "@chakra-ui/react";

export const AddProductPageWrapper = chakra("div", {
  baseStyle: {
    w: "100%",
  },
});

export const AddProductContentWrapper = chakra("div", {
  baseStyle: {
    w: "100%",
    bg: "mainLayer",
    p: "50px 60px",
    borderRadius: "8px",
  },
});

export const SectionTitle = chakra("p", {
  baseStyle: {
    fontWeight: "500",
    fontSize: "24px",
    color: "white",
  },
});

export const ImagesWrapper = chakra("div", {
  baseStyle: {
    w: "100%",
    d: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
    gap: "10px",
  },
});


export const ImageItem = chakra("div", {
    baseStyle: {
      w: "100%",
      aspectRatio:'1 / 1',
      borderRadius:'8px',
      backgroundSize:'cover',
      d:'flex',
      alignItems:'center',
      justifyContent:'center',
      flexDir:'column',
      overflow:'hidden'
    },
  });
