import {
  Flex,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";

const CollectionHeader = ({ title, openSnipedModal, seeMore }) => {

  return (
    <Flex w="100%" justifyContent="space-between" h="auto" mb="28px" px='3px'>
      
      <Text
        color="#fff"
        fontSize={{ base: "14px", sm: "16px", md: "28px" }}
        fontWeight="600"
        onClick={seeMore}
        cursor="pointer"
      >
        {title}
      </Text>

      <Menu>
        <MenuButton>
          <Flex
            p={{ base: "3px 10px 0px 10px", md: "4px 28px" }}
            color="#fff"
            border='1px solid #DBDBDB'
            //bgColor="#353536"
            borderRadius="8px"
            justifyContent="center"
            alignItems="center"
            textAlign="center"
            ml="10px"
            cursor="pointer"
            fontWeight='600'
            fontSize={{base:'16px', md:'20px'}}
            _hover={{
              bgColor: "#555558",
            }}
            onClick={seeMore}
          >
            {/* <BsThreeDots color="white" size='30px' /> */}
            More
          </Flex>
        </MenuButton>
        <MenuList
          bgColor="#353536"
          w={{ base: "auto", md: "auto" }}
          minW="auto"
          border="none"
        >
          <MenuItem
            bgColor="#353536"
            color="#fff"
            fontSize={{ base: "14px", md: "18px" }}
            _hover={{ bgColor: "#555" }}
            _focus={{ bgColor: "#353536" }}
            onClick={openSnipedModal}
            //   style={{backgroundColor:'#353536'}}
          >
            Embed collection
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default CollectionHeader;
