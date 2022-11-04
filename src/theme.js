import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  colors: {
    primary: "#8053ff",
    dark: "#181818",
    lightGray: "#DBDBDB",
    mainLayer: "#141414",
    subLayer: "#242424",
    button: "#353535",
    line: "#5E5E5E",
    white: "#fff",
  },
  breakpoints: {
    sm: "481px",
    md: "768px",
    lg: "1280px",
    xl: "96em",
  },
});
