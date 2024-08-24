import React from 'react';
import { Flex, Image, VStack } from '@chakra-ui/react';
import PreviewTypo from '../../../../../../parts/typo/PreviewTypo';

interface ICollectionCard {
  imageSrc: string;
  title: string;
  description: string;
}

function CollectionCard({ imageSrc, title, description }: ICollectionCard) {
    return (
      <VStack align="stretch" spacing="3px" textAlign="center">
        <Image src={imageSrc} width="100%" borderRadius="8px"  />
        <Flex flexDirection={"column"} alignItems={"flex-start"} gap={"4px"}>
          <PreviewTypo m={0} fontSize="12px" fontWeight={600}>{title}</PreviewTypo>
          <PreviewTypo fontSize="10px" fontWeight={500}>{description}</PreviewTypo>
        </Flex>
      </VStack>
    );
}

export default CollectionCard;
