import { Flex } from '@chakra-ui/react'
import AppInput from 'components/common/form/textbox/AppInput'
import AppSwitch from 'components/common/swich'
import AppTypography from 'components/common/typography/AppTypography'
import { productContext } from 'pages/product/single/context'
import React, { useContext } from 'react'

export default function AffiliateMarketing() {
    const { state: { commission, canBeAffiliated }, methods: { updateState } } = useContext(productContext)

    const handleCommissionChange = ({ target: { value, validity } }) => {
        if (!validity.valid) return
        const parsedValue = parseInt(value)
        updateState('commission', isNaN(parsedValue) ? 0 : parsedValue)
    }

    return (
        <Flex gap={3}>
            <AppSwitch
                isChecked={canBeAffiliated}
                onChange={(e) => updateState('canBeAffiliated', e.target.checked)}
            />

            <Flex width="100%" direction="column" gap={4}>
                <Flex flexDirection="column" gap={1} color="#C2C2C2">
                    <AppTypography fontSize={14} fontWeight="bold">Affiliate Market</AppTypography>
                    <AppTypography fontSize={14}>Enable to allow co-sellers to import and sell your products.</AppTypography>
                </Flex>

                {canBeAffiliated && (
                    <CommissionDetails
                        commission={commission}
                        onCommissionChange={handleCommissionChange}
                    />
                )}
            </Flex>
        </Flex>
    )
}

function CommissionDetails({ commission, onCommissionChange }) {
    const preventInvalidKeys = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const invalidKeys = ['+', '-', 'e']
        if (invalidKeys.includes(e.key)) e.preventDefault()
    }

    return (
        <Flex justifyContent="space-between" gap={4}>
            <Flex flex={1} direction="column" gap={1}>
                <AppTypography fontSize={14} fontWeight={500}>Commission</AppTypography>
                <AppTypography fontSize={14}>Set the commission percentage affiliates will earn for each sale.</AppTypography>
            </Flex>

            <Flex alignItems="center" gap={1} color="#7B7B7B">
                <AppInput
                    type="number"
                    min={1}
                    max={99}
                    value={commission}
                    width="64px"
                    color="#7B7B7B"
                    name="commission"
                    placeholder="0"
                    onChange={onCommissionChange}
                    onKeyDown={preventInvalidKeys}
                />
                <AppTypography fontSize={14}>%</AppTypography>
            </Flex>
        </Flex>
    )
}