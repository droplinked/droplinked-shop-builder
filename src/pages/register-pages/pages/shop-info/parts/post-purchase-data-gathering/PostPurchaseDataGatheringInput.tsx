import { Flex } from '@chakra-ui/react'
import AppInput from 'components/common/form/textbox/AppInput'
import AppTypography from 'components/common/typography/AppTypography'
import WithPermission from 'functions/hoc/shop-permissions/WithPermission'
import { useHasPermission } from 'lib/stores/app/appStore'
import React from 'react'
import { IShopInfoChildProps } from '../../ShopInfo'

function PostPurchaseDataGatheringInput({ States, updateStates }: IShopInfoChildProps) {
    const hasPermission = useHasPermission()
    const handleInputChange = (value: string) => {
        if (hasPermission("post_purchase_data_gathering"))
            updateStates("pre_purchase_data_fetch", !value ? null : { active: true, title: value })
    }

    return (
        <Flex direction={"column"} gap={"36px"}>
            <AppTypography fontSize='18px' fontWeight='bold'>Post-Purchase Data Gathering</AppTypography>
            <WithPermission requiredPermission='post_purchase_data_gathering'>
                <AppInput
                    name="post-purchase-data-gathering"
                    placeholder="Add a note for your purchase"
                    value={States.pre_purchase_data_fetch?.title}
                    onChange={({ currentTarget: { value } }) => handleInputChange(value)}
                />
            </WithPermission>
        </Flex>
    )
}

export default PostPurchaseDataGatheringInput