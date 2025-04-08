import { Image, SimpleGrid, VStack } from '@chakra-ui/react';
import { designContext } from 'pages/register-pages/pages/design/design-context';
import React, { useContext, useMemo } from 'react';
import PreviewTypo from '../../../../common/typo/PreviewTypo';
import { useCurrencyConverter } from 'hooks/useCurrencyConverter/useCurrencyConverter';

function PreviewProducts() {
  const { state: { shop: { shopDesign: { textColorParagraphs } }, device } } = useContext(designContext);
  const isDesktop = useMemo(() => device === 'desktop', [device]);
  const { getFormattedPrice } = useCurrencyConverter()

  return (
    <VStack align="stretch">
      <SimpleGrid columns={isDesktop ? 4 : 2} rowGap="20px" spacing={isDesktop ? '15px' : '10px'}>
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
