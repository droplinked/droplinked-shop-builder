import editIcon from "../../../assest/icon/edit-icon.svg";
import deleteIcon from "../../../assest/icon/delete-icon.svg";
import AddRuleComponent from "./rule-component";

import { Flex } from "@chakra-ui/react";
import { IconComponent, GreenIcon, TextBorder } from "./rule-modal-style";
import { useState } from "react";

const RuleItem = ({ rule, deleteFunc, editRule, isGated }) => {
  const [edit, setEdit] = useState(false);
  const toggleEdit = () => setEdit((p) => !p);

  return (
    <>
      {edit == false ? (
        <Flex alignItems="center" mb={{ base: "10px", md: "10px", lg: "30px" }}>
          <IconComponent src={editIcon} onClick={toggleEdit}/>
          <IconComponent src={deleteIcon} onClick={deleteFunc} />
          <Flex
            pl="8px"
            py="14px"
            borderRadius="8px"
            alignItems="center"
            bg="mainLayer"
            w="100%"
            maxW="100%"
            overflow="hidden"
          >
            <GreenIcon>{rule.discount}</GreenIcon>
            <TextBorder>NFT: {rule.addresses.length}</TextBorder>
            <TextBorder>Amount: {rule.counter}</TextBorder>
            <TextBorder pr="0px" borderRight="none" maxW="30%">
              description: {rule.des}
              asdfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            </TextBorder>
          </Flex>
        </Flex>
      ) : (
        <AddRuleComponent
          rule={rule}
          close={toggleEdit}
          isGated={isGated}
          addToRules={editRule}
        />
      )}
    </>
  );
};

export default RuleItem;
