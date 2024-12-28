import { Flex } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import Input from 'components/redesign/input/Input'
import useProductForm from 'pages/products/hooks/useProductForm'
import React from 'react'
import ProductFieldWrapper from '../../../common/ProductFieldWrapper'

export default function BulkDimensionsAdjuster() {
    const { values: { sku }, setFieldValue } = useProductForm()

    const updateSkus = (field: string, value: string, isDimensionField: boolean) => {
        const updatedSkus = sku.map((s) => {
            if (isDimensionField) {
                return {
                    ...s,
                    dimensions: { ...s.dimensions, [field]: value === '' ? '' : parseFloat(value) },
                }
            }
            return { ...s, [field]: value === '' ? '' : parseFloat(value) }
        })
        setFieldValue('sku', updatedSkus)
    }

    const handleInputChange = (field: string, isDimensionField: boolean = false) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value
            isValidNumber(value) && updateSkus(field, value, isDimensionField)
        }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (['e', 'E', '+', '-'].includes(e.key)) e.preventDefault()
    }

    const isValidNumber = (value: string) => !isNaN(Number(value)) && /^[0-9]*\.?[0-9]*$/.test(value)

    return (
        <Flex wrap="wrap" gap={9} css={{ input: { fontSize: 16 } }}>
            <ProductFieldWrapper label="Packaging" isRequired>
                <Flex gap={4}>
                    <DimensionInput field="width" placeholder="Width" handleInputChange={handleInputChange} handleKeyDown={handleKeyDown} />
                    <DimensionInput field="length" placeholder="Length" handleInputChange={handleInputChange} handleKeyDown={handleKeyDown} />
                    <DimensionInput field="height" placeholder="Height" handleInputChange={handleInputChange} handleKeyDown={handleKeyDown} />
                    <ConvertUnitButton label="Inch" />
                </Flex>
            </ProductFieldWrapper>

            <ProductFieldWrapper label="Weight" isRequired>
                <Flex gap={4}>
                    <Input
                        inputContainerProps={{ width: '92px' }}
                        inputProps={{
                            type: 'number',
                            step: '0.01',
                            placeholder: 'Weight',
                            onChange: handleInputChange('weight'),
                            onKeyDown: handleKeyDown,
                        }}
                    />
                    <ConvertUnitButton label="kg" />
                </Flex>
            </ProductFieldWrapper>
        </Flex>
    )
}

const DimensionInput = ({
    field,
    placeholder,
    handleInputChange,
    handleKeyDown,
}: {
    field: string
    placeholder: string
    handleInputChange: (field: string, isDimensionField: boolean) => (e: React.ChangeEvent<HTMLInputElement>) => void
    handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
}) => (
    <Input
        inputContainerProps={{ width: '92px' }}
        inputProps={{
            type: 'number',
            step: '0.01',
            placeholder,
            onChange: handleInputChange(field, true),
            onKeyDown: handleKeyDown,
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
        border="1px solid #292929"
        borderRadius={8}
        padding="12px 16px"
        color="#fff"
        transition="border-color 0.1s ease-out"
        _hover={{ borderColor: '#3C3C3C' }}
        css={{ path: { stroke: '#BCBCBC' } }}
    >
        {label}
        <AppIcons.Convert />
    </Flex>
)