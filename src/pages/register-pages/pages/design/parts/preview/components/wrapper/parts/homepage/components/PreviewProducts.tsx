import { SimpleGrid, VStack } from '@chakra-ui/layout';
import { Image } from '@chakra-ui/react';
import useAppStore from 'lib/stores/app/appStore';
import { currencyConvertion } from 'lib/utils/helpers/currencyConvertion';
import { designContext } from 'pages/register-pages/pages/design/design-context';
import React, { useContext, useMemo } from 'react';
import PreviewTypo from '../../../../common/typo/PreviewTypo';

function PreviewProducts() {
  const { state: { shop: {shopDesign: { textColorParagraphs } }, device}} = useContext(designContext);
  const isDesktop = useMemo(() => device === 'desktop', [device]);
  const {shop: { currency } } = useAppStore();
  
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
              {currency?.symbol}
              {currencyConvertion(30.0, currency?.conversionRateToUSD, false)} {currency?.abbreviation}
            </PreviewTypo>
          </VStack>
        ))}
      </SimpleGrid>
    </VStack>
  );
}

export default PreviewProducts;
