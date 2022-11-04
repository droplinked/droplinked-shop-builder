import { Flex, Image, Text } from "@chakra-ui/react";

const ProfileButton = ({ text, icon, click }) => {
  return (
    <Flex w="100%" p="10px" borderRadius="8px" mb="20px" cursor='pointer' 
    _hover={{
      bg:'primary'
    }}
    onClick={click}>
      <Image src={icon} w="24px" h="24px" mr="10px" />
      <Text color="white" fontWeight="500" fontSize="18px">
        {text}
      </Text>
    </Flex>
  );
};

export default ProfileButton;
