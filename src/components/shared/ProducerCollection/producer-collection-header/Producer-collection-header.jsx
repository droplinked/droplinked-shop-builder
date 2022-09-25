import { Link, useNavigate } from "react-router-dom";
import { Flex, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { ShopNameText } from "../Producer-collection-style";
import { menuButtonStyle, menuItemStyle } from "../Producer-collection-style";

const ProducerCollectionHeader = ({
  title,
  collectionId,
  shopName,
  editOnclick,
  deleteOnclick,
  openRuleModal
}) => {
  const navigate = useNavigate();

  const linkToViewCollection = () =>
    navigate(`/${shopName}/collection/${collectionId}`);


  return (
    <>
      <Flex justifyContent="space-between" alignItems="center" h="auto">
        <ShopNameText>{title}</ShopNameText>
        <Link to={`/${shopName}/collection/${collectionId}`}></Link>

        <Menu>
          <MenuButton {...menuButtonStyle}>More</MenuButton>
          <MenuList bgColor="#222" border="2px solid #444">
            <MenuItem {...menuItemStyle} onClick={linkToViewCollection}>
              View collection
            </MenuItem>
            <MenuItem {...menuItemStyle} onClick={editOnclick}>
              Edit collection
            </MenuItem>
            <MenuItem {...menuItemStyle} onClick={openRuleModal}>Edit ruleset</MenuItem>
            <MenuItem {...menuItemStyle} onClick={deleteOnclick}>
              Delete collection
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </>
  );
};

export default ProducerCollectionHeader;
