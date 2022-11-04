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
      bgColor={cancelType ? "#242424" : "primary"}
      color={cancelType ? "#DBDBDB" : "#fff"}
      border={cancelType ? "2px solid #242424" : "2px solid primary"}
      fontSize={{ base: "16px", md: "20px" }}
      fontWeight="600"
      borderRadius="8px"
      margin="0px auto"
      p={{ base: "12px 20px 9px 20px", md: "12px 20px" }}
      outline="none"
      _hover={{
        borderColor: cancelType ? "#242424" : "primary",
        bgColor: cancelType ? "transparent" : "#222",
        color: cancelType ? "#DBDBDB" : "primary",
      }}
      _disabled={{
        bgColor: "transparent",
        color: "#DBDBDB",
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
