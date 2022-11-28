import { chakra } from "@chakra-ui/react";

export const FormInput = chakra("input", {
  baseStyle: {
    w: "100%",
    maxW:"50%",
    bg:'mainLayer',
    color:'darkGray',
    p:'15px 24px',
    borderRadius:'8px',
    outline:'none',
    border:'none'
  },
});



export const DimentionsInputs = chakra("input", {
    baseStyle: {
      w: "100%",
      color:'darkGray',
      outline:'none',
      border:'none',
      bg:'transparent'
    },
  });


  export const SelectTag = chakra("select", {
    baseStyle: {
      w: "100%",
      maxW:"50%",
      d: "flex",
      justifyContent: "space-between",
      p: "18px",
      bg:'mainLayer',
      border:'none',
      outline:'none',
      borderRadius:'8px',
      color:'darkGray',
      fontSize:'20px'
    },
  });
  
  
  export const OptionTag = chakra("option", {
    baseStyle: {
        bg:'mainLayer',
      color:'darkGray',
      fontSize:'20px'
    },
  });
  
