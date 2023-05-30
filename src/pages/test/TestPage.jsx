import { Box, Flex } from "@chakra-ui/react";

const TestPage = () => {
  return (
    <Flex
      w="100%"
      h="auto"
      py="100px"
      alignItems="center"
      justifyContent="center"
    >
      <Box w="600px" h="500px">
        <iframe
          style={{ width: "100%", height: "100%" }}
          src="https://tshirt-3d-modeling.netlify.app"
          title="Module"
        ></iframe>
      </Box>
    </Flex>
  );
};

export default TestPage;
