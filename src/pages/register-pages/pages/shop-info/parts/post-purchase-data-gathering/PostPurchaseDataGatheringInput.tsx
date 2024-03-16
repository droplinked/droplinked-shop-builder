import { Flex } from '@chakra-ui/react'
import AppInput from 'components/common/form/textbox/AppInput'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'
import { IShopInfoChildProps } from '../../ShopInfo'

function PostPurchaseDataGatheringInput({ States, updateStates }: IShopInfoChildProps) {
    return (
        <Flex direction={"column"} gap={"36px"}>
            <AppTypography fontSize='18px' fontWeight='bold'>Post-purchase Data Gathering</AppTypography>
            <AppInput
                name="post-purchase-gata-gathering"
                placeholder="Add a note for your purchase"
                value={States.pre_purchase_data_fetch?.title}
                onChange={({ currentTarget: { value } }) => updateStates("pre_purchase_data_fetch", !value ? null : { active: true, title: value })}
            />
        </Flex>
    )
}

export default PostPurchaseDataGatheringInput