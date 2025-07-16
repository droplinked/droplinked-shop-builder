import { Box, Divider, Flex, Text } from '@chakra-ui/react';
import AppImage from 'components/common/image/AppImage';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import arLocale from 'locales/affiliate/ar.json';
import enLocale from 'locales/affiliate/en.json';
import React from 'react';
import ProductPrice from '../../common/ProductPrice';

interface Props {
  price: number; // Item price
  commission: number; // Commission percentage
  shopDetails?: any; // Shop/producer details (name, logo)
  availableItems?: number; // Number of available items
  shopId: string;
}

// Main card component displaying producer info and stats
const ProducerInfoCard = ({ price, commission, shopDetails, availableItems, shopId }: Props) => {
  const { t } = useLocaleResources('affiliate',{
    en: enLocale,
    ar: arLocale
  } );
  const profitPerSale = (price * commission) / 100; // Calculate profit per sale
  const displayedAvailableItems = availableItems < 0 ? "∞" : availableItems;

  return (
    <Box p="6" w="100%" bg="#1b1b1b" borderRadius="lg" display="flex" flexDirection={{ base: 'column', '2xl': 'row' }} alignItems={{ base: 'flex-start', xl: 'center' }} gap={{ base: '4', xl: '0' }}>
      <ProducerInfoSection shopDetails={shopDetails} shopId={shopId} t={t} />
      {/* Horizontal divider for mobile */}
      <Box display={{ base: 'block', xl: 'none' }} width="100%" borderBottom="1px solid" borderColor="neutral.gray.700" mb="4" p="0" />
      {/* Statistics section */}
      <Flex flexDirection={{ base: 'column', md: 'row' }} flex="2" gap="6" width="100%" justify="space-between">
        <StatItem label={t('ProductDetails.availableItems')} value={displayedAvailableItems} />
        <DividerComponent />
        <StatItem label={t('ProductDetails.commission')} value={`${commission}%`} />
        <DividerComponent />
        <StatItem label={t('ProductDetails.profitPerSale')} value={<ProductPrice price={profitPerSale} fontSize='16px' showAbbreviation={false}></ProductPrice>} />
      </Flex>
    </Box>
  );
};

// Displays producer logo and name
const ProducerInfoSection = ({ shopDetails, shopId, t }: { shopDetails; shopId; t: (key: string) => string }) => (
  <Flex flex="1" align="center" gap="4" overflow="hidden" width="100%" py={4} >
    <AppImage w="12" h="12" borderRadius="full" src={shopDetails.logo} alt="Producer" />
    <Box flex="1">
      <Text color="#868686" fontSize="sm" fontWeight="normal">
        {t('ProductDetails.producer')}
      </Text>
      {/* <Link to={`/analytics/affiliate/stores/${shopId}`}> */}
        <Text color="#f5f7fa" fontSize="base" fontWeight="medium">
          {shopDetails.name}
        </Text>
      {/* </Link> */}
    </Box>
  </Flex>
);

// Displays a single statistic (label and value)
const StatItem = ({ label, value }: { label: string; value: any }) => (
  <Box flex="1">
    <Text color="#868686" fontSize="sm" fontWeight="normal" whiteSpace={'nowrap'}>
      {label}
    </Text>
    <Text color="#f5f7fa" fontSize="base" fontWeight="medium">
      {value}
    </Text>
  </Box>
);

// Vertical divider for desktop layout
const DividerComponent = () => <Divider orientation="vertical" borderColor="neutral.gray.700" height="40px" display={{ base: 'none', md: 'block' }} />;

export default ProducerInfoCard;
