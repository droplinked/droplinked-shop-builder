import { Flex, VStack } from '@chakra-ui/react'
import AppSwitch from 'components/common/swich'
import AppTypography from 'components/common/typography/AppTypography'
import { designContext } from 'pages/register-pages/pages/design/design-context'
import React, { useContext } from 'react'
import ActiveBox from '../../../active/ActiveBox'
import OptionsCaption from '../../../caption/OptionsCaption'
import OptionLayoutModel from './model'

function OptionLayout() {
    const { methods: { dispatch }, state: { shop: { shopDesign: { hiroLayout }, fullWidthHero } } } = useContext(designContext)

    return (
        <VStack align="stretch" spacing="24px">
            <VStack align="stretch">
                <OptionsCaption caption='Display Layout' isRequired />
                <Flex justifyContent="space-between">
                    {OptionLayoutModel.items[fullWidthHero ? 'full' : 'mini'].map((el, key) => (
                        <ActiveBox active={el.key === hiroLayout} key={key} props={{ padding: "8px", borderWidth: "2px", width: "52px", display: "flex", justifyContent: "center", borderRadius: "8px", onClick: () => dispatch({ type: 'updateShop', params: { shopDesign: { hiroLayout: el.key } } }), cursor: "pointer" }}>{el.icon}</ActiveBox>
                    ))}
                </Flex>
            </VStack>
            <Flex alignItems="center" gap="16px">
                <AppSwitch isChecked={fullWidthHero} onChange={e => dispatch({ type: "updateShop", params: { fullWidthHero: e.target.checked } })} />
                <AppTypography size="14px">Full with Background</AppTypography>
            </Flex>
        </VStack>
    )
}

export default OptionLayout