import { useNavigate } from "react-router-dom";
import { Flex, Box } from "@chakra-ui/react";
import { ShopNameText } from "../Producer-collection-style";
import { HeaderIcon } from "../Producer-collection-style";

import editIcon from "../../../../assest/icon/edit-icon.svg";
import ruleIcon from "../../../../assest/icon/rule-icon.svg";

const ProducerCollectionHeader = ({
  title,
  collectionId,
  editOnclick,
  deleteOnclick,
  openRuleModal,
}) => {
  const navigate = useNavigate();

  const linkToViewCollection = () =>
    navigate(`/producer/collection/${collectionId}`);

  return (
    <>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        h="auto"
        mb={{base:'20px',md:'40px'}}
      >
        <ShopNameText onClick={linkToViewCollection}>{title}</ShopNameText>


        <Flex>
          <HeaderIcon src={ruleIcon} onClick={openRuleModal} />
          <Box ml={{ base: "10px", sm: "20px", md: "30px" }}></Box>
          <HeaderIcon src={editIcon} onClick={editOnclick} />
        </Flex>

        {/* <Menu>
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
        </Menu> */}
      </Flex>
    </>
  );
};

export default ProducerCollectionHeader;
