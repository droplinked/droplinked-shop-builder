import { Box, Flex, Text, VStack } from '@chakra-ui/react';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import React, { useEffect, useState } from 'react';
import DescriptionContent from './components/DescriptionContent';
import ShippingAvailability from './components/ShippingAvailability';
import ProductCard from './components/ProductCard';

interface ProductDescriptionProps {
  product: any;
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({ product }) => {
  const { t } = useLocaleResources('affiliate');
  const [activeSection, setActiveSection] = useState<string>('description');

  useEffect(() => {
    const handleScroll = () => {
      const descriptionTop = document.getElementById('description')?.offsetTop ?? 0;
      const shippingTop = document.getElementById('shipping')?.offsetTop ?? 0;
      const scrollPosition = window.scrollY + 100;

      if (scrollPosition >= shippingTop) {
        setActiveSection('shipping');
      } else if (scrollPosition >= descriptionTop) {
        setActiveSection('description');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [product?.pod_blank_product_id]);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      const offset = section.offsetTop - 80;
      window.scrollTo({ top: offset, behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <>
      <Box
        as="nav"
        w="100%"
        position="relative"
        borderBottom="1px solid"
        borderTop="1px solid"
        borderColor="neutral.gray.800"
        bg="#171923"
        display="flex"
        alignItems="center"
        justifyContent="start"
        overflow="hidden"
        bgColor={'neutral.gray.1000'}
      >
        <Text
          cursor="pointer"
          borderBottom={activeSection === 'description' ? '2px solid white' : '2px solid transparent'}
          px="5%"
          py="4"
          fontSize="base"
          fontWeight="medium"
          onClick={() => scrollToSection('description')}
          color="white"
        >
          {t('common:description')}
        </Text>

        {product?.pod_blank_product_id && (
          <Text
            cursor="pointer"
            borderBottom={activeSection === 'shipping' ? '2px solid white' : '2px solid transparent'}
            px="5%"
            py="4"
            fontSize="base"
            fontWeight="medium"
            onClick={() => scrollToSection('shipping')}
            color="white"
          >
            {t('products.productDetails.shippingAvailability')}
          </Text>
        )}
      </Box>

      <Flex gap="9" p="4" color="white" width="100%">
        <VStack flex="1" align="stretch" spacing="14">
          <Box id="description">
            <DescriptionContent description={product.description} />
          </Box>

          {product?.pod_blank_product_id && (
            <Box id="shipping">
              {' '}
              <ShippingAvailability productId={product.pod_blank_product_id} />{' '}
            </Box>
          )}
        </VStack>

        <Box flexShrink={0} >
          <ProductCard product={product} />
        </Box>
      </Flex>
    </>
  );
};

export default ProductDescription;
