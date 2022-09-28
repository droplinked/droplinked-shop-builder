import { Button, Spinner } from "@chakra-ui/react";

export default function BasicButton({
  children,
  click,
  loading,
  cancelType,
  ...otherprops
}) {
  return (
    <Button
      w="100%"
      h="100%"
      bgColor={cancelType ? "transparent" : "#8053ff"}
      color={cancelType ? "#fd4545" : "#222"}
      border={cancelType ? "2px solid #fd4545" : "2px solid #8053ff"}
      fontSize={{ base: "16px", md: "20px" }}
      fontWeight="600"
      borderRadius="8px"
      margin="0px auto"
      p={{ base: "12px 20px 9px 20px", md: "12px 20px" }}
      outline='none'
      _hover={{
        borderColor: cancelType ? "#fd4545" : "#8053ff",
        bgColor: cancelType ? "#fd4545" : "#222",
        color: cancelType ? "#222" : "#8053ff",
      }}
      _disabled={{ bgColor: "#222" }}
      onClick={click}
      disabled={loading}
      {...otherprops}
    >
      {loading != undefined && loading == true ? (
        <>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="#fff"
            color="#222"
            size="md"
          />
        </>
      ) : (
        <>{children}</>
      )}
    </Button>
  );
}
