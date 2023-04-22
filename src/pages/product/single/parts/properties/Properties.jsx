import { Box, VStack } from '@chakra-ui/react';
import React from 'react'
import PropertiesForm from './parts/form/PropertiesForm';
import { ComponentTitle, ComponentWrapper } from 'pages/prodcut-pages/ProductPages-style';

function Properties() {

  return (
    <>
      <ComponentWrapper>
        <VStack align={"stretch"} spacing={10}>
          <Box><ComponentTitle>Properties</ComponentTitle></Box>
          <Box><PropertiesForm /></Box>
        </VStack>
      </ComponentWrapper>
    </>
  )
}

export default Properties