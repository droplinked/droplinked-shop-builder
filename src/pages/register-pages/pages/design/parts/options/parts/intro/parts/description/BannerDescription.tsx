import { VStack } from '@chakra-ui/react'
import AppInput from 'components/common/form/textbox/AppInput'
import { designContext } from 'pages/register-pages/pages/design/design-context'
import React, { useContext } from 'react'
import OptionsCaption from '../../../caption/OptionsCaption'

function BannerDescription() {
  const { methods: { dispatch }, state: { shop: { backgroundText } } } = useContext(designContext)

  return (
    <VStack align="stretch">
      <OptionsCaption caption='Hero Text' isRequired />
      <AppInput name='' value={backgroundText} onChange={(e) => dispatch({ type: 'updateShop', params: { backgroundText: e.target.value } })} placeholder='Enter hero text' isRequired />
    </VStack>
  )
}

export default BannerDescription