import { chakra } from "@chakra-ui/react";

const TinyInput = chakra("input", {
    baseStyle: {
        w: "15%",
        fontSize: "20px",
        fontWeight: "500",
        color: "darkGray",
        bg: "mainLayer",
        border: "none",
        py: "7px",
        outline: "none",
        _placeholder: {
            color: "darkGray",
        },
        _focus: {
            outline: "none",
        },
    },
});

const FieldInput = chakra("input", {
    baseStyle: {
        w: "70%",
        bg: "mainLayer",
        p: "15px 24px",
        fontSize: "20px",
        fontWeight: "500",
        borderRadius: "8px",
        color: "darkGray",
        _placeholder: {
            color: "darkGray",
        },
        _focus: {
            outline: "none",
        },
    },
});

const GrayLine = chakra("div", {
    baseStyle: {
        w: "1px",
        border: "1px solid",
        h: "100%",
        minH: "20px",
        borderColor: "gray",
        borderRadius: "8px",
        bg: "line",
    },
});

const VariantMakeFormStyles = {
    TinyInput,
    FieldInput,
    GrayLine
}
export default VariantMakeFormStyles