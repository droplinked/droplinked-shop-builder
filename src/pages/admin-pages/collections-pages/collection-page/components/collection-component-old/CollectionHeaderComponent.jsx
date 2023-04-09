import { useNavigate } from "react-router-dom";
import { Flex, Box } from "@chakra-ui/react";

import { HeaderIcon, ShopNameText } from "./CollectionComponent-style";

import editIcon from "../../../../../assest/icon/edit-icon.svg";
import ruleIcon from "../../../../../assest/icon/rule-icon.svg";

const CollectionHeaderComponent = ({
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
        mb={{ base: "20px", md: "40px" }}
      >
        <ShopNameText onClick={linkToViewCollection}>{title}</ShopNameText>

        <Flex>
          <HeaderIcon src={ruleIcon} onClick={openRuleModal} />
          <Box ml={{ base: "10px", sm: "20px", md: "30px" }}></Box>
          <HeaderIcon src={editIcon} onClick={editOnclick} />
        </Flex>
      </Flex>
    </>
  );
};

export default CollectionHeaderComponent;
