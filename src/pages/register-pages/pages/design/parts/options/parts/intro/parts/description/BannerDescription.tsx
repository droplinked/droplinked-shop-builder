import { VStack } from '@chakra-ui/react'
import AppInput from 'components/common/form/textbox/AppInput'
import React from 'react'
import OptionsCaption from '../../../caption/OptionsCaption'

function BannerDescription() {
  return (
    <VStack align="stretch">
      <OptionsCaption caption='Hero Text' isRequired />
      <AppInput name='' placeholder='Enter hero text' isRequired />
    </VStack>
  )
}

export default BannerDescription