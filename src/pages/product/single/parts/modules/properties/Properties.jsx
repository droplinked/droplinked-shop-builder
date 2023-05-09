import { Box, VStack } from '@chakra-ui/react';
import React from 'react'
import ProductPageTitle from '../title/ProductPageTitle';
import PropertiesForm from './parts/form/PropertiesForm';

function Properties() {

  return (
    <VStack align={"stretch"} spacing={4}>
      <ProductPageTitle
          title='Product Properties'
          description='Provide size, color, or both'
        />
      <PropertiesForm />
    </VStack>
  )
}

export default Properties