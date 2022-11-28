import {
  VariantComponentWrapper,
  DetailWrapper,
  DetailText,
  Line,
} from "./variant-conponent-style";

import { Box, Image, Text, Flex } from "@chakra-ui/react";
import deleteIcon from "../../../../assest/icon/delete-icon.svg";
import editIcon from "../../../../assest/icon/edit-icon.svg";

const VariantComponent = () => {
  return (
    <VariantComponentWrapper>
      <DetailWrapper>
        <DetailText>Color: blue</DetailText>
        <Line></Line>
        <DetailText>Size: xl</DetailText>
        <Line></Line>
        <DetailText>Price: 12 ETH</DetailText>
        <Line></Line>
        <DetailText>Quantity: 120</DetailText>
        <Line></Line>
        <DetailText>External ID: 123974</DetailText>
      </DetailWrapper>

      <Flex>
        <Flex
          w="24px"
          h="24px"
          bg="#FEB900"
          borderRadius="50% 50% 0px 50% "
          justifyContent="center"
          alignItems="center"
          mr="16px"
        >
          <Flex w="10px" h="10px" bg="#1C1C1C" borderRadius="50%"></Flex>
        </Flex>
        <Image src={deleteIcon} w="24px" h="24px" mr="16px" />
        <Image src={editIcon} w="24px" h="24px" />
      </Flex>
    </VariantComponentWrapper>
  );
};

export default VariantComponent;
