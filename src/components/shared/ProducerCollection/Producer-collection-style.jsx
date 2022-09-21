import { chakra } from "@chakra-ui/react";

export const ProducerCollectionWrapper = chakra("div", {
  baseStyle: {
    width: "100%",
    border: "3px solid #d4d4d486",
    borderRadius: "30px",
    padding: { base: "15px 10px 10px 10px", md: "25px 20px 15px 20px" },
    transition: "0.8s",
    _hover: {
      border: "3px solid #8053ff",
    },
  },
});

export const ShopNameText = chakra("div", {
  baseStyle: {
    color: "#fff",
    fontWeight: "600",
    fontSize:{base:'18px' ,md:"24px"},
    pt:{base:'3px' , md:'0px'},
    overflow:'hidden',
    whiteSpace:'nowrap'
  },
});


export const MenuItem = chakra("button", {
    baseStyle: {
      color: "#fff",
      fontWeight: "600",
      fontSize:{base:'18px' ,md:"24px"},
    },
  });
  
  
