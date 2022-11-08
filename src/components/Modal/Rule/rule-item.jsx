import editIcon from "../../../assest/icon/edit-icon.svg";
import deleteIcon from "../../../assest/icon/delete-icon.svg";
import { Flex } from "@chakra-ui/react";
import { IconComponent, GreenIcon, TextBorder } from "./rule-modal-style";

const RuleItem = ({ rule }) => {
  console.log(rule);
  return (
    <Flex alignItems="center" mb='30px'>
      <IconComponent src={editIcon} />
      <IconComponent src={deleteIcon} />
      <Flex pl='8px' py="14px" borderRadius="8px" bg="mainLayer" w="100%" maxW="100%" overflow='hidden'>
        <GreenIcon>{rule.discount}</GreenIcon>
        <TextBorder>NFT: {rule.address.length}</TextBorder>
        <TextBorder>Amount: {rule.counter}</TextBorder>
        <TextBorder pr="0px" borderRight="none" maxW="30%">
          description: {rule.des}
          asdfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        </TextBorder>
      </Flex>
    </Flex>
  );
};

export default RuleItem;
