import React from 'react';
import { Image, VStack } from '@chakra-ui/react';
import PreviewTypo from '../../../../../../parts/typo/PreviewTypo';

interface ICollectionCard {
  imageSrc: string;
  title: string;
}

function CollectionCard({ imageSrc, title }: ICollectionCard) {
    return (
      <VStack align="stretch" spacing="3px" textAlign="center">
        <Image src={imageSrc} width="100%" borderRadius="8px"  />
        <PreviewTypo fontSize="12px" fontWeight={500}>{title}</PreviewTypo>
      </VStack>
    );
}

export default CollectionCard;
