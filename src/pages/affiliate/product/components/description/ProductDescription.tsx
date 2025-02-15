import { Box, Flex, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import DescriptionContent from './components/DescriptionContent';
import ShippingAvailability from './components/ShippingAvailability';
import ProductCard from './components/ProductCard';

const ProductDescription: React.FC<any> = ({ product }) => {
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
        w="103%"
        position="relative"
        borderBottom="1px solid #292929"
        borderTop="1px solid #292929"
        bg="#171923"
        display="flex"
        alignItems="center"
        justifyContent="start"
        overflow="hidden"
        bgColor={'#1C1C1C'}
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
          Description
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
            Shipping Availability
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
