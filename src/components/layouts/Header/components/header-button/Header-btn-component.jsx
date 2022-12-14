import { Box } from "@chakra-ui/react";

export default function HeaderItem({ children, click, ...otherProps }) {
  return (
    <Box
      onClick={click}
      display="flex"
      justifyContent="center"
      alignItems="center"
      h={{ base: "36px", md: "48px" }}
      color="white"
      bgColor="button"
      borderRadius="8px"
      fontWeight="600"
      px={{ base: "16px", md: "28px" }}
      fontSize={{ base: "12px", md: "20px" }}
      cursor="pointer"
      _hover={{
        bgColor: "#424242",
      }}
      {...otherProps}
    >
      {children}
    </Box>
  );
}

{
  /* <div className="header-item-btn-component-wraper" onClick={click} style={style}>{children}</div> */
}
