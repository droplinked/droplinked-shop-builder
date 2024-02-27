import { Flex } from '@chakra-ui/react'
import AppInput from 'components/common/form/textbox/AppInput'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'
import { IstatesShopInfo } from '../../ShopInfo'

interface Props {
    States: IstatesShopInfo,
    updateStates: (key: string, value: any) => void
}

function PrepurchaseDataGatheringInput({ States, updateStates }: Props) {
    return (
        <Flex direction={"column"} gap={"36px"}>
            <AppTypography fontSize='18px' fontWeight='bold'>Pre-purchase Data Gathering</AppTypography>
            <AppInput
                name="pre-purchase data gathering"
                placeholder="christmas cat mug"
                value={States.pre_purchase_data_fetch?.title}
                onChange={({ currentTarget: { value } }) => updateStates("pre_purchase_data_fetch", !value ? null : { active: true, title: value })}
            />
        </Flex>
    )
}

export default PrepurchaseDataGatheringInput