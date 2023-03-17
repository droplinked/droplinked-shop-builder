import { Button } from "@chakra-ui/react";


const SubmitButton = ({ children , width }) => {
  return (
    <Button
      bg="primary"
      w={width}
      borderRadius="8px"
      padding=" 12px 16px"
      display="flex"
      justifyContent="center"
      alignItems="center"
      fontFamily="Avenir Next"
      fontWeight="500"
      fontSize="18px"
      color="#084836"
      border="1px solid"
      borderColor="primary"
      _hover={{
        bg: "mainLayer",
        color: "primary",
      }}
      _disabled={{
        bg: "#292929",
        color: "lightGray",
        borderColor: "#292929",
      }}
    >
      {children}
    </Button>
  );
};

export default SubmitButton;
