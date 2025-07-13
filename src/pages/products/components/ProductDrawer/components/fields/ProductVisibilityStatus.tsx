import { Flex, useRadioGroup } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import AppTooltip from 'components/common/tooltip/AppTooltip'
import FormFieldWrapper from 'components/redesign/form-field-wrapper/FormFieldWrapper'
import useProductForm from 'pages/products/hooks/useProductForm'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import CustomRadioCard from '../common/CustomRadioCard'

function ProductVisibilityStatus() {
    const { t } = useLocaleResources('products');
    const { values, setFieldValue } = useProductForm()

    const { getRootProps, getRadioProps } = useRadioGroup({
        name: 'selected-visibility-status',
        onChange: (value: string) => setFieldValue('purchaseAvailable', value === 'public'),
        value: values.purchaseAvailable ? 'public' : 'private'
    })

    const statusList = [
        { label: t('fields.visibilityStatus.public.label'), tooltipText: t('fields.visibilityStatus.public.tooltip'), value: 'public' },
        { label: t('fields.visibilityStatus.private.label'), tooltipText: t('fields.visibilityStatus.private.tooltip'), value: 'private' }
    ]

    const renderRightContent = (tooltipText: string, isActive: boolean) => (
        <AppTooltip flexShrink={0} placement="bottom-start" label={tooltipText}>
            <AppIcons.TooltipIcon fill={isActive ? '#2BCEA133' : '#292929'} />
        </AppTooltip>
    )

    return (
        <FormFieldWrapper
            label={t('fields.visibilityStatus.label')}
            description={t('fields.visibilityStatus.description')}
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
        </FormFieldWrapper>
    )
}

export default ProductVisibilityStatus