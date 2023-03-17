import { Button ,Spinner  } from "@chakra-ui/react";


const SubmitButton = ({ children , width , click ,disabled  ,loading}) => {
  return (
    <Button
      bg="primary"
      w={width}
      h='50px'
      borderRadius="8px"
      padding="12px 16px"
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
      onClick={click}
      disabled={disabled}
    >
        {loading ? <Spinner color='white' size='md' /> :   <>{children}</>}
    
    </Button>
  );
};

export default SubmitButton;
