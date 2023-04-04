import { Td, Tr, Image, Flex, Text } from "@chakra-ui/react";

import discountIcon from "../../../../../assest/icon/discount-active-icon.svg";
import gatedIcon from "../../../../../assest/icon/gated-active-icon.svg";

const RuleComponent = ({ rule }) => {
  //console.log("rule ", rule);
  return (
    <Tr>
      <Td>
        <Flex w="auto" alignItems="center" gap="8px">
          <Image
            src={rule.gated ? gatedIcon : discountIcon}
            w="16px"
            h="16px"
          />
          <Text
            fontFamily="Avenir Next"
            fontWeight="500"
            fontSize="14px"
            color="#c2c2c2"
          >
            {rule.gated ? "gated" : "discount"}
          </Text>
        </Flex>
      </Td>
      <Td>
        <Text
          fontFamily="Avenir Next"
          fontWeight="500"
          fontSize="14px"
          color="#c2c2c2"
        >
          {rule.rules[0].discountPercentage ? `%${rule.rules[0].discountPercentage}` : "-"}
        </Text>
      </Td>
      <Td>
        <Text
          fontFamily="Avenir Next"
          fontWeight="500"
          fontSize="14px"
          color="#c2c2c2"
        >
          {rule.rules[0].addresses.length}
        </Text>
      </Td>
      <Td>
        <Text
          fontFamily="Avenir Next"
          fontWeight="500"
          fontSize="14px"
          color="#c2c2c2"
        >
          {rule.rules[0].nftsCount}
        </Text>
      </Td>
    </Tr>
  );
};

{
  /* <Tr cursor="pointer" onClick={clickOnProduct}>
<Td>

</Td>
</Tr> */
}

export default RuleComponent;
