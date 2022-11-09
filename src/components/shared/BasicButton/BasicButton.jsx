import { Button, Spinner } from "@chakra-ui/react";

export default function BasicButton({
  children,
  click,
  loading,
  disable,
  cancelType,
  ...otherprops
}) {
  return (
    <Button
      w="100%"
      h="100%"
      bgColor={cancelType ? "dark" : "primary"}
      color={cancelType ? "DarkGray" : "#fff"}
      border={cancelType ? "2px solid button" : "2px solid primary"}
      fontSize={{ base: "16px", md: "20px" }}
      fontWeight="600"
      borderRadius="8px"
      margin="0px auto"
      p={{ base: "12px 20px 9px 20px", md: "12px 20px" }}
      outline="none"
      _hover={{
        borderColor: cancelType ? "button" : "primary",
        bgColor: cancelType ? "dark" : "dark",
        color: cancelType ? "DarkGray" : "primary",
      }}
      _disabled={{
        bgColor: "dark",
        color: "DarkGray",
        borderColor: "#363636",
      }}
      onClick={click}
      disabled={disable || loading}
      {...otherprops}
    >
      {loading != undefined && loading == true ? (
        <>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="#fff"
            color="primary"
            size="md"
          />
        </>
      ) : (
        <>{children}</>
      )}
    </Button>
  );
}
