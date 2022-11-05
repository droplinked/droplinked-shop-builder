import { chakra } from "@chakra-ui/react";

export const SidebarWrapper = chakra("div", {
  baseStyle: {
    w: "100%",
    bg: "subLayer",
    px: { sm: "14px", md: "24px" },
    py: { sm: "32px", md: "56px" },
    borderRadius: "8px",
  },
});

export const IconWrapper = chakra("a", {
  baseStyle: {
    display: "flex",
    alignItems: "center",
    width: { base: "30px", md: "20px" },
    height: { base: "30px", md: "20px" },
    padding: "auto 0px",
    mb: "20px",
    cursor: "pointer",
  },
});

export const ShopinfoWrapper = chakra("div", {
  baseStyle: {
    d: "flex",
    w: "100%",
    flexDir: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});

export const ProfileImageWrapper = chakra("div", {
  baseStyle: {
    d: "flex",
    borderRadius: "50%",
    margin: "auto 0px",
    justifyContent: "center",
    alignItems: "center",
    width: { sm: "50px", md: "120px" },
    height: { sm: "50px", md: "120px" },
    border: "1px solid #353535",
  },
});

export const ProfileImage = chakra("img", {
  baseStyle: {
    margin: "auto",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "50%",
  },
});

export const DefaultProfileImage = chakra("div", {
  baseStyle: {
    width: "60%",
    height: "60%",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
});

export const ShopnameText = chakra("p", {
  baseStyle: {
    marginTop: "20px",
    fontWeight: "600",
    fontSize:{ sm: "8px", md: "18px" },
    textAlign: "center",
    color: "#ffffff",
  },
});

export const IconContainer = chakra("div", {
  baseStyle: {
    d: "flex",
    w: { base: "auto", md: "25%" },
    justifyContent: "center",
    alignItem: "center",
  },
});
