import { Box, VStack } from '@chakra-ui/react';
import React from 'react'
import PropertiesForm from './parts/form/PropertiesForm';
import { ComponentTitle } from 'pages/prodcut-pages/ProductPages-style';
import AppCard from 'components/shared/card/AppCard';

function Properties() {

  return (
    <>
      <AppCard mini>
        <VStack align={"stretch"} spacing={10}>
          <Box><ComponentTitle>Properties</ComponentTitle></Box>
          <Box><PropertiesForm /></Box>
        </VStack>
      </AppCard>
    </>
  )
}

export default Properties