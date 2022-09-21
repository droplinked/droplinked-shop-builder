import { Link } from "react-router-dom";
import {
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import { FiChevronDown } from "react-icons/fi";

import { ShopNameText } from "../Producer-collection-style";

const menuButtonStyle = {
  color: "white",
  px: "4",
  py: "2",
  bgColor: "#222",
  _hover: { bg: "#333" },
  _focus: { bg: "#333" },
  fontSize: { base: "20px", md: "16px" },
};

const ProducerCollectionHeader = ({ title, collectionId, shopName }) => {
  return (
    <Flex justifyContent="space-between" alignItems="center" h="auto">
      <ShopNameText>{title}</ShopNameText>
      <Link to={`/${shopName}/collection/${collectionId}`}></Link>

      <Menu>
        <MenuButton
          color="white"
          px={4}
          py={1}
          fontSize={{ base: "20px", md: "16px" }}
          transition="all 0.2s"
          borderRadius="md"
          border="1px solid #555"
        >
          More
        </MenuButton>
        <MenuList bgColor="#222" border="2px solid #444">
          <MenuItem {...menuButtonStyle}>View collection</MenuItem>
          <MenuItem {...menuButtonStyle}>Edit collection</MenuItem>
          <MenuItem {...menuButtonStyle}>Edit ruleset</MenuItem>
          <MenuItem {...menuButtonStyle}>Delete collection</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default ProducerCollectionHeader;
