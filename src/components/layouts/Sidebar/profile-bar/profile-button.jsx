import { Flex, Image, Text } from "@chakra-ui/react";

const ProfileButton = ({ text, icon, click ,active  }) => {
  console.log(active);
  return (
    <Flex
      w="100%"
      p="10px"
      borderRadius="8px"
      bg={active?"primary":'transparent'}
      mb="20px"
      cursor="pointer"
      alignItems="center"
      _hover={{
        bg: "primary",
      }}
      onClick={click}
      justifyContent={{ base: "center", lg: "start" }}
    >
      <Image
        src={icon}
        w='24px'
        h='24px'
        mr={{ base: "0px", lg: "20px" }}
      />
      <Text
        d={{ base: "none", lg: "flex" }}
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
