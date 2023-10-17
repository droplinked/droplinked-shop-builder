import { VStack } from '@chakra-ui/react'
import AppScrollBar from 'components/common/scrollbar'
import React from 'react'
import OptionsCaption from '../../../caption/OptionsCaption'

function OptionBanner() {
  return (
    <VStack align="stretch">
        <OptionsCaption caption='Image' />
        <AppScrollBar>
            
        </AppScrollBar>
    </VStack>
  )
}

export default OptionBanner