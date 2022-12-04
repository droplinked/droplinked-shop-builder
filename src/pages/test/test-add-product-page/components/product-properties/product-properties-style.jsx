import { chakra } from "@chakra-ui/react";

export const OptionText = chakra("p", {
  baseStyle: {
    fontSize:'20px',
    fontWeight:'400' ,
    color:'white'
  },
});


export const GrayLine = chakra("div", {
    baseStyle: {
     w:'1px',
     border:'1px solid',
     h:'100%' ,
     borderColor:'line',
     borderRadius:'8px' ,
     bg:'line' 
    },
  });
  

  export const OptionFormWrapper = chakra("div", {
    baseStyle: {
     w:'100%',
     p:'24px 36px' ,
     bg:'subLayer',
     mb:'10px',
     borderRadius:'8px'
    },
  });

 


  export const ValueInput = chakra("input", {
    baseStyle: {
    fontSize:'20px'  ,
    fontWeight:'500',
    color:'darkGray' ,
    p:'15px 24px' ,
    w:'100%',
    backgroundColor: "mainLayer",
    borderRadius: "8px",
    _placeholder:{
      color:'darkGray' ,
    },
    _focus:{
      outline:'none'
    }
    },
  });


  export const PlusIcon = chakra("img", {
    baseStyle: {
    w:'24px' ,
    h:'24px' ,
    mx:'18px' ,
    cursor:'pointer'
    }
  });
  
  
  