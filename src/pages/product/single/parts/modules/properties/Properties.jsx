import { Box, VStack } from '@chakra-ui/react';
import React from 'react'
import ProductPageTitle from '../title/ProductPageTitle';
import PropertiesForm from './parts/form/PropertiesForm';

function Properties() {

  return (
    <VStack align={"stretch"} spacing={4}>
      <ProductPageTitle
        head
        isReuired
        title='Product Properties'
        description='Add at least one property to enable all variant fields.'
      />
      <PropertiesForm />
    </VStack>
  )
}

export default Properties