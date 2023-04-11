import { chakra } from "@chakra-ui/react";

export const ImagesInputWrapper = chakra("div", {
  baseStyle: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "start",
  },
});

export const ItemImage = chakra("div", {
  baseStyle: {
    padding: "10px",
    width: { base: "48%", md: "25%" },
    position: "relative",
    cursor: "pointer",
    display: "flex",

    justifyContent: "center",
    alignitems: "center",
    borderRadius: "8px",
    aspectRatio: "1 / 1",
  },
});

export const InputAddImage = chakra("div", {
  baseStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDir:'column',
    width: "100%",
    height: "100%",
    bg:'subLayer',
   // border: "2px solid rgb(173, 173, 173)",
    borderRadius: "8px",
    transition: "0.5s",
    // _hover: {
    //   border: "2px solid white",
    // },
  },
});

export const AddImageText = chakra("p", {
  baseStyle: {
    color: "white",
    fontSize: { base: "16px", md: "20px" },
  },
});

export const DeleteIcon = chakra("img", {
  baseStyle: {
    width: "34px",
    height: "34px",
    position: "absolute",
    left: "-10px ",
    top: "-10px",
    display: "inline",
  },
});
