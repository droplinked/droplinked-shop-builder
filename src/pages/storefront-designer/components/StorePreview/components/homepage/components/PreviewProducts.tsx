import { Image, SimpleGrid, VStack } from '@chakra-ui/react';
import { useCurrencyConverter } from 'hooks/useCurrencyConverter/useCurrencyConverter';
import { designerContext } from 'pages/storefront-designer/context/designerContext';
import React, { useContext, useMemo } from 'react';
import PreviewTypo from '../../common/typo/PreviewTypo';

function PreviewProducts() {
  const {state: {shop: {shopDesign: { textColorParagraphs }}, device}} = useContext(designerContext);
  const isMobile = useMemo(() => device === 'mobile', [device]);
  const { getFormattedPrice } = useCurrencyConverter();

  return (
    <VStack align="stretch" width="100%">
      <SimpleGrid columns={isMobile ? 2 : 4} rowGap="20px" spacing={isMobile ? '10px' : '15px'}>
        {[...Array(7)].map((_, key: number) => (
          <VStack key={key} align="stretch" spacing="3px">
            <Image width="100%" paddingBottom="4px" borderRadius="4px" src="/assets/images/templated/sample.png" />
            <PreviewTypo fontSize="12px" fontWeight="bold" textAlign="left" color={textColorParagraphs || '#FFF'}>
              Sneakers
            </PreviewTypo>
            <PreviewTypo fontSize="12px" fontWeight="bold" textAlign="left" opacity=".5" color={textColorParagraphs || '#FFF'}>
              {getFormattedPrice({ amount: 30.0, toFixed: true })}
            </PreviewTypo>
          </VStack>
        ))}
      </SimpleGrid>
    </VStack>
  );
}

export default PreviewProducts;
