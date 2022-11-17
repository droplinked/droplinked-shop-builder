import { Text, Flex, Image } from "@chakra-ui/react";

import unlockIconfrom from "../../../../assest/icon/unlock.svg";
import lockIcon from "../../../../assest/icon/lockIcon.svg";

const RuleState = ({ lock, description }) => {
  console.log("lock", lock);
  console.log("description", description);
  return (
    <Flex w="100%" alignItems="center">
      <Image
        w="28px"
        h="28px"
        src={lock ? lockIcon : unlockIconfrom}
        mr="8px"
        bg='button'
        borderRadius='50%'
        p='4px'
      />
      {lock && (
        <Text color="white" fontSize="12px">{description}</Text>
      )}
    </Flex>
  );
};

export default RuleState;
