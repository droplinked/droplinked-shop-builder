import { VStack } from '@chakra-ui/react';
import React, { useContext } from 'react'
import PODProperties from './parts/form/parts/pod/PODProperties';
import PropertiesForm from './parts/form/PropertiesForm';
import { productContext } from 'pages/product/single/context';

function Properties() {
  const { productID } = useContext(productContext)

  return (
    <VStack align={"stretch"} spacing={4} {...productID && { opacity: ".7" }}>
      <PropertiesForm />
    </VStack>
  )
}

export default Properties