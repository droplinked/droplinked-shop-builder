import { chakra } from "@chakra-ui/react";

export const ImageWrapper = chakra("div", {
  baseStyle: {
    borderRadius: "50% ",
    margin: "auto 0px ",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: { base: "80px", md: "120px" },
    height: { base: "80px", md: "120px" },
  },
});

export const ProfileImage = chakra("img", {
  baseStyle: {
    margin: "auto",
    width: "100% ",
    height: "100% ",
    objectFit: "cover ",
    borderRadius: "50% ",
  },
});

export const DefaultProfile = chakra("div", {
  baseStyle: {
    width: "60% ",
    height: "60% ",
    backgroundRepeat: "no-repeat ",
    backgroundSize: "cover",
  },
});

export const ShopnameText = chakra("p", {
  baseStyle: {
    mt: "20px",
    fontWeight: "600 ",
    fontSize: { base: "24px", md: "32px" },
    lineHeight: "44px",
    textAlign: "center",
    color: "white",
  },
});

export const IconWrapper = chakra("a", {
  baseStyle: {
    display: "flex",
    alignItems: "center",
    margin: "4px 18px",
    width: "30px ",
    height: "30px",
    padding: " auto 0px",
  },
});


export const Icon = chakra("img", {
    baseStyle: {
      display: "flex",
      margin: 'auto 0px',
      aspectRatio: '1 / 1'
    },
  });
  