import { Divider, extendTheme } from "@chakra-ui/react";
import { switchAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

export const theme = extendTheme({
    components: {
        Switch: createMultiStyleConfigHelpers(switchAnatomy.keys).defineMultiStyleConfig({ baseStyle: createMultiStyleConfigHelpers(switchAnatomy.keys).definePartsStyle({ container: { border: "none", outline: "none" }, thumb: { backgroundColor: "#1E1E1E" }, track: { backgroundColor: "#5E5E5E", _checked: { bg: "green.500" } } }) }),
        Divider: { baseStyle: { margin: "0" } }
    },
    styles: {
        global: {
            ".chakra-form__required-indicator": {
                color: "#2EC99E !important",
            },
        },
    },
    colors: {
        bG: "#141414",
        subLayer: "#141414",
        mainLayer: "#1C1C1C",
        button: "#353535",
        line: "#262626",
        primary: "#25BB92",
        primaryLight: "#54DDB7",
        primaryDark: "#084836",
        white: "#fff",
        dark: "#181818",
        black: "#000",
        lightGray: "#C2C2C2",
        darkGray: "#666666",
        offText: "#5D5D5D",
        error: '#E63F43',
        green: {
            50: "#edfaf6",
            100: "#b4ecdc",
            200: "#6bd9ba",
            300: "#2bbb93",
            400: "#26a783",
            500: "#2EC99E",
            600: "#1b775d",
            700: "#165f4b",
            800: "#12513f",
            900: "#0d3a2e",
        },
        mainGray: {
            50: "#f7f7f7",
            100: "#e0e0e0",
            200: "#c5c5c5",
            300: "#a6a6a6",
            400: "#949494",
            500: "#292929",
            600: "#696969",
            700: "#545454",
            800: "#474747",
            900: "#333333",
        },
    },
    breakpoints: {
        sm: "481px",
        md: "768px",
        lg: "992px",
        xl: "1200px",
    },
});
