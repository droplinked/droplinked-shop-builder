import { VStack } from '@chakra-ui/react'
import AppColorPicker from 'components/common/colorPicker/AppColorPicker'
import { designContext } from 'pages/register-pages/pages/design/design-context'
import React, { useContext } from 'react'
import OptionsCaption from '../../../caption/OptionsCaption'

function ColorDescription() {
  const { methods: { dispatch }, state: { shop: { shopDesign: { hiroTextColor } } } } = useContext(designContext)

  return (
    <VStack align="stretch">
      <OptionsCaption caption='Text Color' />
      <AppColorPicker onChange={(color) => dispatch({ type: 'updateShop', params: { shopDesign: { hiroTextColor: color } } })} value={hiroTextColor || "#777"} />
    </VStack>
  )
}

export default ColorDescription