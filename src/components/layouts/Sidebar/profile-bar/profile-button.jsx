import { Flex, Image, Text } from "@chakra-ui/react";

const ProfileButton = ({ text, icon, click }) => {
  return (
    <Flex
      w="100%"
      p="10px"
      borderRadius="8px"
      mb="20px"
      cursor="pointer"
      alignItems="center"
      _hover={{
        bg: "primary",
      }}
      onClick={click}
      justifyContent={{ base: "center", md: "start" }}
    >
      <Image
        src={icon}
        w='24px'
        h='24px'
        mr={{ base: "0px", md: "10px" }}
      />
      <Text
        d={{ base: "none", md: "flex" }}
        color="white"
        fontWeight="500"
        fontSize="18px"
        h="100%"
        alignItems="center"
      >
        {text}
      </Text>
    </Flex>
  );
};

export default ProfileButton;
