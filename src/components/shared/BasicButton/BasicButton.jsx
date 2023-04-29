import { Box, Button, Spinner } from "@chakra-ui/react";

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
      width="100%"
      bgColor={cancelType ? "#1c1c1c" : "primary"}
      color="white"
      border={cancelType ? "2px solid #292929" : "2px solid primary"}
      fontWeight="600"
      borderRadius="8px"
      margin="0px auto"
      p={{ base: "12px 20px 9px 20px", md: "12px 20px" }}
      outline="none"
      _hover={{
        borderColor: cancelType ? "button" : "primary",
        bgColor: cancelType ? "button" : "button",
        color: cancelType ? "offText" : "primary",
      }}
      _disabled={{
        bgColor: "button",
        color: "offText",
        borderColor: "#363636",
      }}
      onClick={click}
      disabled={disable || loading}
      {...otherprops}
    >
      {loading !== undefined && loading === true ? (
        <>
          <Spinner
            thickness="4px"
            position={"absolute"}
            speed="0.65s"
            emptyColor="white"
            color="primary"
            size="xs"
          />
        </>
      ) : null}
      <Box {...loading && { color: "transparent" }}>{children}</Box>
    </Button>
  );
}
