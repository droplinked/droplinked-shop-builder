import { VStack } from '@chakra-ui/react'
import AppColorPicker from 'components/common/colorPicker/AppColorPicker'
import AppInput from 'components/common/form/textbox/AppInput'
import React, { useState } from 'react'
import OptionsCaption from '../../../caption/OptionsCaption'

function ColorDescription() {
  const [Test, setTest] = useState('#777')

  return (
    <VStack align="stretch">
      <OptionsCaption caption='Text Color' />
      <AppColorPicker onChange={(color) => setTest(color)} value={Test} />
    </VStack>
  )
}

export default ColorDescription