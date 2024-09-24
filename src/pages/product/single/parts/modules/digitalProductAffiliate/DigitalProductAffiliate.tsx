import { Flex } from '@chakra-ui/react'
import AppSwitch from 'components/common/swich'
import AppTypography from 'components/common/typography/AppTypography'
import useAppToast from 'functions/hooks/toast/useToast'
import { productContext } from 'pages/product/single/context'
import React, { useCallback, useContext } from 'react'

function DigitalProductAffiliate() {
    const { productID, state: { sku, publish_status }, methods: { updateState } } = useContext(productContext)
    const { showToast } = useAppToast()

    const change = useCallback((checked: boolean) => {
        if (productID && publish_status === "PUBLISHED")
            return showToast({ type: "error", message: "You have already published this product" })

        const updatedSku = {
            ...sku[0],
            recordData: {
                ...sku[0].recordData,
                commision: checked ? 10 : 0
            }
        }
        updateState('sku', [updatedSku])
    }, [sku, updateState])

    return (
        <Flex gap={3} alignItems="center">
            <AppSwitch onChange={(e: any) => change(e.target.checked)} isChecked={sku.length && sku[0].recordData?.commision === 10} />
            <AppTypography fontSize='14px' color="#C2C2C2" fontWeight='bold'>Activate this product for affiliate purchase with a 10% commission for collaborators</AppTypography>
        </Flex>
    )
}

export default DigitalProductAffiliate