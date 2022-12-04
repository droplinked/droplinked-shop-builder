import { chakra } from "@chakra-ui/react";

export const SkuFormWrapper = chakra("div", {
  baseStyle: {
    w: "100%",
    p: "36px 48px",
    bg: "subLayer",
    borderRadius: "8px",
  },
});

export const InputWrapper = chakra("div", {
  baseStyle: {
    d: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export const LeftSideText = chakra("p", {
  baseStyle: {
    fontSize: "20px",
    fontWeight: "500",
    color: "white",
  },
});

export const FieldInput = chakra("input", {
  baseStyle: {
    w: "70%",
    bg: "mainLayer",
    p: "15px 24px",
    fontSize: "20px",
    fontWeight: "500",
    borderRadius: "8px",
    color:'darkGray' ,
    _placeholder: {
      color: "darkGray",
    },
    _focus: {
      outline: "none",
    },
  },
});

export const SmallInput = chakra("input", {
    baseStyle: {
      w: "15%",
      fontSize: "20px",
      fontWeight: "500",
      color:'darkGray' ,
      bg:'mainLayer' ,
      border:'none',
      py:'7px' ,
      outline:'none',
      _placeholder: {
        color: "darkGray",
      },
      _focus: {
        outline: "none",
      },
    },
  });

  export const GrayLine = chakra("div", {
    baseStyle: {
     w:'1px',
     border:'1px solid',
     h:'26px' ,
     minH:'100%',
     borderColor:'line',
     borderRadius:'8px' ,
     bg:'line' 
    },
  });
  

  export const SelectComponent = chakra("select", {
    baseStyle: {
      w: "70%",
      d: "flex",
      backgroundColor: "mainLayer",
      borderRadius: "8px",
      color: "darkGray",
      p: "18px 18px",
      fontSize:"20px" ,
      fontWeight:'500',
      outline: "none",
      _focus: {
        border: "none",
        outline: "none",
      },
    },
  });
  
  export const OptionComponent = chakra("option", {
    baseStyle: {
      w: "100%",
      bg: "subLayer",
      borderRadius: "8px",
      color: "darkGray",
      p: "18px 18px",
      _disabled:{
        bg: "mainLayer",
      }
    },
  });
  
