import { chakra } from "@chakra-ui/react";

export const EventButtonWrapper = chakra("div", {
  baseStyle: {
    d: "flex",
    w: "100%",
    h: {base:'100px',md:"70px"},
    flexDir:{base:"column",md:'row'},
    alignItems:'center',
    justifyContent:'space-between',
    borderRadius: "8px",
    bgColor: "primary",
    py: "8px",
    px: "13px",
  },
});

export const EventText = chakra("p", {
  baseStyle: {
    textAlign:'center',
    color: "#fff",
    fontSize: { base: "10px", sm:'12px', md: "8px", lg:'10px'  ,xl:"12px"},
    fontWeight: "700",
    h:'auto',
    w: {base:'45%',md:"40%"},
  },
});


export const CounterWrapper = chakra("div", {
    baseStyle: {
      d:'flex',
      w:{base:'50%',md:"60%"},
      h:'100%',
      alignItems:'center',
      justifyContent:'space-between',
  
    },
  });

  export const ItemWrapper = chakra("div", {
    baseStyle: {
      d:'flex',
      flexDir:'column',
      w:"20%",
      h:'100%',
      alignItems:'center',
      justifyContent:'center',
    },
  });
  

  export const TimeNum = chakra("p", {
    baseStyle: {
      color:'#fff',
      fontSize: { base: "12px", sm:'14px', md: "12px", lg:'14px'  ,xl:"18px"},
      fontWeight:'700'
    },
  });

  export const TimeText = chakra("p", {
    baseStyle: {
      color:'#fff',
      fontSize: { base: "8px", sm:'12px', md: "6px", lg:'8px'  ,xl:"10px"},
      fontWeight:'400'
    },
  });

  export const BuyButton = chakra("button", {
    baseStyle: {
      w:{base:'100%',md:'20%'},
      h:'100%',
      bgColor:'#1D173B',
      color:'primary',
      fontWeight:'700',
      fontSize: { base: "12px", sm:'16px', md: "12px", lg:'14px'  ,xl:"18px"},
      borderRadius:'8px'
    },
  });
  
  