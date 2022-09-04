import { Flex, Text } from "@chakra-ui/react";

const CollectionHeader = ({ title, openSnipedModal, seeMore }) => {
  return (
    <>
      <Flex w="100%" justifyContent="space-between" h="auto" mb="10px">
        <Text
          color="#fff"
          fontSize={{ base: "10px", sm: "16px", md: "22px" }}
          fontWeight="600"
        >
          {title}
        </Text>
        <Flex>
          <Flex
            p={{ base: "4px 10px 1px 10px", md: "4px 20px" }}
            color="#fff"
            bgColor="#353536"
            fontSize={{ base: "6px", sm: "8px", md: "14px" }}
            fontWeight="500"
            borderRadius="8px"
            justifyContent="center"
            alignItems="center"
            cursor="pointer"
            _hover={{
              bgColor: "#555558",
            }}
            onClick={openSnipedModal}
          >
            Embed collection
          </Flex>
          <Flex
            p={{ base: "4px 10px 1px 10px", md: "4px 20px" }}
            color="#fff"
            bgColor="#353536"
            fontSize={{ base: "6px", sm: "8px", md: "14px" }}
            fontWeight="500"
            borderRadius="8px"
            justifyContent="center"
            alignItems="center"
            ml="10px"
            cursor="pointer"
            _hover={{
              bgColor: "#555558",
            }}
            onClick={seeMore}
          >
            See more
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default CollectionHeader;
