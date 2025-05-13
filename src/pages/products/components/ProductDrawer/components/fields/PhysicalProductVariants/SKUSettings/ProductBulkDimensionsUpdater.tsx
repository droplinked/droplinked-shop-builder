import { Flex } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import FormFieldWrapper from 'components/redesign/form-field-wrapper/FormFieldWrapper'
import AppInput from 'components/redesign/input/AppInput'
import useProductForm from 'pages/products/hooks/useProductForm'
import React from 'react'

export default function ProductBulkDimensionsUpdater() {
    const { values: { sku }, setFieldValue } = useProductForm()

    const updateSkus = (field: string, value: string) => {
        const updatedSKUs = sku.map((s) => {
            if (['width', 'length', 'height'].includes(field)) {
                return {
                    ...s,
                    dimensions: { ...s.dimensions, [field]: value === '' ? '' : parseFloat(value) },
                }
            }
            return { ...s, [field]: value === '' ? '' : parseFloat(value) }
        })
        setFieldValue('sku', updatedSKUs)
    }

    return (
        <Flex wrap="wrap" gap={9} css={{ input: { fontSize: 16 } }}>
            <FormFieldWrapper label="Packaging" isRequired>
                <Flex gap={4}>
                    <SkuAttributeInput field="width" placeholder="Width" updateSkus={updateSkus} initialValue={sku[0]?.dimensions?.width || ''} />
                    <SkuAttributeInput field="length" placeholder="Length" updateSkus={updateSkus} initialValue={sku[0]?.dimensions?.length || ''} />
                    <SkuAttributeInput field="height" placeholder="Height" updateSkus={updateSkus} initialValue={sku[0]?.dimensions?.height || ''} />
                    <ConvertUnitButton label="Inch" />
                </Flex>
            </FormFieldWrapper>

            <FormFieldWrapper label="Weight" isRequired>
                <Flex gap={4}>
                    <SkuAttributeInput field="weight" placeholder="Weight" updateSkus={updateSkus} initialValue={sku[0]?.weight || ''} />
                    <ConvertUnitButton label="kg" />
                </Flex>
            </FormFieldWrapper>
        </Flex>
    )
}

const SkuAttributeInput = ({ field, placeholder, updateSkus, initialValue }) => (
    <AppInput
        inputContainerProps={{ width: '92px' }}
        inputProps={{
            type: 'number',
            step: 0.01,
            placeholder,
            numberType: 'float',
            value: initialValue,
            onChange: (e) => updateSkus(field, e.target.value)
        }}
    />
)

const ConvertUnitButton = ({ label }: { label: string }) => (
    <Flex
        as="button"
        type="button"
        minW="92px"
        alignItems="center"
        gap={2}
        border="1px solid"
        borderColor="neutral.gray.800"
        borderRadius={8}
        padding="12px 16px"
        color="#fff"
        transition="border-color 0.1s ease-out"
        _hover={{ borderColor: 'neutral.gray.700' }}
        css={{ path: { stroke: '#BCBCBC' } }}
    >
        {label}
        <AppIcons.Convert />
    </Flex>
)