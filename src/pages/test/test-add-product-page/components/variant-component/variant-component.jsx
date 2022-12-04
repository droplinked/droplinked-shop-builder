import {
  VariantComponentWrapper,
  DetailWrapper,
  DetailText,
  Line,
} from "./variant-conponent-style";

import { Image, Flex, Text } from "@chakra-ui/react";
import deleteIcon from "../../../../../assest/icon/delete-icon.svg";
import editIcon from "../../../../../assest/icon/edit-icon.svg";

const VariantComponent = ({ sku }) => {

  return (
    <VariantComponentWrapper>
      <DetailWrapper>
        {sku.options.map((option) => {
          return (
            <>
              <DetailText>
                {option.variantName}: {option.value}
              </DetailText>
              <Line></Line>
            </>
          );
        })}

        <DetailText>Price: ${sku.price}</DetailText>
        <Line></Line>
        <DetailText>Quantity: {sku.quantity}</DetailText>
        <Line></Line>
        <DetailText>External ID: {sku.externalID}</DetailText>
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
            cursor="pointer"
           // onClick={openModal}
          >
            <Flex w="10px" h="10px" bg="#1C1C1C" borderRadius="50%"></Flex>
          </Flex>
          <Image src={deleteIcon} w="24px" h="24px" mr="16px" />
          <Image src={editIcon} w="24px" h="24px" />
        </Flex>
      {/*  {isRecord ? (
        <Flex w="100px" borderRadius="35px" bg="subLayer" justifyContent='center' alignItems='center' p='8px 16px'>
          <Text fontSize='18px' fontWeight='500' color='lightGray' >recorded</Text>
        </Flex>
      ) : (
        
      )} */}
    </VariantComponentWrapper>
  );
};

export default VariantComponent;
