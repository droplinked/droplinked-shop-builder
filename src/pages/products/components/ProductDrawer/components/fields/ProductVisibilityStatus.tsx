import { Flex, useRadioGroup } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import AppTooltip from 'components/common/tooltip/AppTooltip'
import useProductForm from 'pages/products/hooks/useProductForm'
import React from 'react'
import CustomRadioCard from '../common/CustomRadioCard'
import ProductFieldWrapper from '../common/ProductFieldWrapper'

function ProductVisibilityStatus() {
    const { values, setFieldValue } = useProductForm()

    const { getRootProps, getRadioProps } = useRadioGroup({
        name: 'selected-visibility-status',
        onChange: (value: string) => setFieldValue('purchaseAvailable', value === 'public'),
        value: values.purchaseAvailable ? 'public' : 'private'
    })

    const statusList = [
        { label: 'Public', tooltipText: 'Customers will be able to add it to their cart', value: 'public' },
        { label: 'Private', tooltipText: 'Customers won’t be able to add it to their cart', value: 'private' }
    ]

    const renderRightContent = (tooltipText: string, isActive: boolean) => (
        <AppTooltip flexShrink={0} placement="bottom-start" label={tooltipText}>
            <AppIcons.TooltipIcon fill={isActive ? '#2BCEA133' : '#292929'} />
        </AppTooltip>
    )

    return (
        <ProductFieldWrapper
            label="Visibility Status"
            description="Set the visibility of this product. If deactivated, customers won’t be able to add it to their cart."
            isRequired
        >
            <Flex direction="row" gap={4} {...getRootProps()}>
                {statusList.map(({ label, tooltipText, value }) => {
                    const isActive = values.purchaseAvailable === (value === 'public')
                    return (
                        <CustomRadioCard
                            key={label}
                            label={label}
                            rightContent={renderRightContent(tooltipText, isActive)}
                            {...getRadioProps({ value })}
                        />
                    )
                })}
            </Flex>
        </ProductFieldWrapper>
    )
}

export default ProductVisibilityStatus