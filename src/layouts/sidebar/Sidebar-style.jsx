import { chakra } from "@chakra-ui/react";

export const SidebarWrapper = chakra("div", {
    baseStyle: {
    //  d: { base: "inline", sm: "flex" },
      w:{ base: "0px", sm: "auto" },
      h: "auto",
      minH: "100%",
      mr: { sm: "10px", md: "20px", xl: "36px" },
      //
     // borderRight: "1px solid ",
     // borderColor: "line",
     // borderColor:{ base: "transparent", sm: "line" },
    },
  });




