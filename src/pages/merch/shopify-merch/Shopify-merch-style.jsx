import { chakra } from "@chakra-ui/react";

export const MerchPageWrapper = chakra("div", {
  baseStyle: {
    d: "flex",
    justifyContent: "space-between",
    maxW: "800px",
    w: "100%",
    flexWrap: "wrap",
    m: "auto",
  },
});

export const DescriptionWrapper = chakra("div", {
  baseStyle: {
    display: "flex",
    mt: { base: "20px", md: "40px" },
    w: "100%",
    flexDir: "column",
    alignItems: "center",
    pr: { base: "20px", md: "0px" },
    overflow: "hidden",
  },
});

export const DescriptionText = chakra("p", {
  baseStyle: {
    fontWeight: "500",
    fontSize: "18px",
    w: "100%",
    color: "#b3b3b3",
    whiteSpace: "pre-line",
    overflow: "hidden",
    textOverflow: "ellipsis",
    __css: {
      "&::-webkit-line-clamp": {
        w: "2",
      },
      "&::-webkit-box-orient": {
        w: "vertical",
      },
    },
  },
});

export const ReadmoreButton = chakra("div", {
  baseStyle: {
    color: "#fff",
    fontSize: "16px",
    w: "auto",
    textAlign: "center",
    mt: "20px",
    border: "1px solid #aaa",
    p: "5px 10px",
    borderRadius: "8px",
    cursor: "pointer",
    _hover: { border: "1px solid #fff" },
  },
});

//////


