import { chakra } from "@chakra-ui/react";

export const VariantSelect = chakra("select", {
    baseStyle: {
      border: '2px solid #b4b4b4',
      borderRadius: '8px',
      padding: {base:'12px 16px 9px 16px' ,md:'6px 12px'},
      outline: 'none',
      backgroundColor: 'transparent',
      color: '#fff',
      fontWeight: '600',
      fontSize: {base:'16px',md:'20px'},
      transition: '0.5s',
      backgroundColor: '#353536',
      w:'100%'
    },
  });
  

  export const QuantityButton = chakra("div", {
    baseStyle: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      w: "35px",
      h: "35px",
      mr: "8px",
      borderRadius: "8px",
      p: "5px",
    },
  });


  
export const ProductTitle = chakra("p", {
    baseStyle: {
      color: "#fff",
      fontSize: "20px",
      fontWeight: "600",
    },
  });
  
  export const ProductShopname = chakra("p", {
    baseStyle: {
      color: "#B3B3B3",
      fontSize: { base: "20px", md: "22px" },
      fontWeight: "600",
      cursor: "pointer",
      display: "inline-block",
      _hover: { color: "#fff" },
    },
  });

  export const DetailWrapper = chakra("div", {
    baseStyle: {
      display: "flex",
      w: { base: "100%", md: "50%" },
      pl: { base: "0px", md: "20px" },
      pb: { base: "0px", md: "80px" },
      mt: { base: "40px", md: "0px" },
      h: { base: "320px", md: "auto" },
      flexDir: "column",
      justifyContent: "space-between",
    },
  });