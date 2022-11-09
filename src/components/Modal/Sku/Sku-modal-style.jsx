import { chakra } from "@chakra-ui/react";

export const ModalWrapper = chakra("div", {
  baseStyle: {
    display: "flex",
    justifyContent: "center",
    pos: "fixed",
    zIndex: "10",
    padding: { base: "30px 30px 30px 30px", md: "30px 0px 0px 0px" },
    left: "0",
    top: "0",
    w: { base: "100vw", md: "100%" },
    h: "100%",
    overflow: "hidden",
    bgColor: "rgba(0, 0, 0, 0.4)",
  },
});

export const ModalContent = chakra("div", {
  baseStyle: {
    zIndex: "11",
    boxSizing: "border-box",
    h: "auto",
    m: "auto",
    w: { base: "100%", md: "800px" },
    bgColor: "#202020",
    boxShadow: "0px 2px 30px rgba(85, 88, 90, 0.1)",
    borderRadius: "10px",
    padding: { base: "20px 20px 60px 20px", md: "20px 40px 40px 40px" },
  },
});



export const SkuContent = chakra("div", {
  baseStyle: {
    d:'flex',
    w: "100%",
    justifyContent: "space-between",
    mb: "20px",
  },
});

export const SkuLable = chakra('lable', {
    baseStyle: {
        color: 'primary',
        fontWight: '500',
        fontSize: '18px',
        width: '40%',
        p: '5px',
        borderBottom: ' 2px solid primary'
    },
})


export const SkuInput = chakra('input', {
    baseStyle: {
        fontWeight: '600',
        fontSize: '18px',
        color: "#fff",
        w: '40%',
        p: '5px',
        border: '2px solid #b3b3b3',
        borderRadius: '8px',
        outline: 'none',
        bgColor: 'transparent',
        transition: '0.5s',
        _focus: {
            border: '2px solid primary'
        }
    },
})
