import { VStack } from '@chakra-ui/react';
import React, { useContext } from 'react'
import PODProperties from './parts/pod/PODProperties';
import PropertiesForm from './parts/form/PropertiesForm';
import { productContext } from 'pages/product/single/context';

function Properties() {
  const { state: { product_type } } = useContext(productContext)

  return (
    <VStack align={"stretch"} spacing={4}>
      {["NORMAL", "DIGITAL"].includes(product_type) ? <PropertiesForm /> : <PODProperties />}
    </VStack>
  )
}

export default Properties