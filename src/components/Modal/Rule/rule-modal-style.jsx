import { chakra } from "@chakra-ui/react";

export const RuleModalWrapper = chakra("div", {
    baseStyle: {
      position: "fixed",
      zIndex: "1",
      left: "0",
      top: "0",
      width: { base: "100vw", md: "100%" },
      height: "100% ",
      overflow: "auto",
      backgroundColor: "rgba(0, 0, 0, 0.4)",
      padding: { base: "30px 10px 30px 10px", md: "100px 0px 50px 0px" },
    },
  });
  
  export const RuleModalCotent = chakra("div", {
    baseStyle: {
      boxSizing: " border-box",
      height: "auto",
      margin: "auto",
      maxWidth: "800px",
      width: { base: "100%", md: "90%" },
      background: "subLayer",
      boxShadow: "0px 2px 30px rgba(85, 88, 90, 0.1)",
      borderRadius: "24px",
      padding: { base: "30px 20px 60px 20px", md: "40px 40px 40px 40px" },
    },
  })


  export const ModalHeader = chakra("p", {
    baseStyle: {
      fontSize: { base: "20px", md: "24px" },
      color: "white",
      fontWeight: "600",
      mb: { base: "15px", md: "30px" },
      w:'100%',
      textAlign:'center'
    },
})


export const TypeSelect = chakra("select", {
    baseStyle: {
        fontWeight:'600',
        fontSize:{ base: '10px',sm:"12px", md: '16px' },
        color:'white',
        border:'none',
        bgColor:'mainLayer',
        borderRadius:'8px',
        px:"16px",
        py:{ base: "8px", md: "12px" },
        outline:'none',
        _focus:{ outline:'none'},
        h:'auto',
        mr:'40px',
    },
})


export const TextareaInput = chakra("textarea", {
    baseStyle: {
        fontWeight:'600',
        fontSize:{ base: '10px',sm:"12px", md: '16px' },
        w:'100%',
        color:'white',
        border:'none',
        bgColor:'mainLayer',
        borderRadius:'8px',
        px:"16px",
        py:{ base: "8px", md: "12px" },
        outline:'none',
        _focus:{ outline:'none'},
        h:'auto',
    },
})


export const InputComponent = chakra("input", {
    baseStyle: {
        fontWeight:'600',
        fontSize:{ base: '10px',sm:"12px", md: '16px' },
        color:'white',
        border:'none',
        bgColor:'mainLayer',
        borderRadius:'8px',
        w:'100%',
        px:"16px",
        py:{ base: "8px", md: "12px" },
        outline:'none',
        _focus:{ outline:'none'},
        h:'auto',
        _disabled:{
            color:'button'
        }
    },
})


export const AddRuleButton = chakra("p", {
    baseStyle: {
        fontWeight:'600',
        fontSize:{ base: '10px',sm:"12px", md: '16px' },
        color:'primary',
        border:'none',
        w:'100%',
        textAlign:'center',
        cursor:'pointer',
        _hover:{ color:'gray'},
    },
})



export const DeleteIconComponent = chakra("img", {
    baseStyle: {
        w:'15px',
        h:'15px',
        pos:'absolute',
        top:'0px',
        left:'-20px'
    },
})