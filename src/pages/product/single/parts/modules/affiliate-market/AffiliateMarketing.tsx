import { Flex } from '@chakra-ui/react'
import AppInput from 'components/common/form/textbox/AppInput'
import AppSwitch from 'components/common/swich'
import AppTypography from 'components/common/typography/AppTypography'
import { productContext } from 'pages/product/single/context'
import React, { ChangeEvent, useContext, useState } from 'react'

export default function AffiliateMarketing() {
    const { state: { commision }, methods: { updateState } } = useContext(productContext)
    const [isCommissionEnabled, setCommissionEnabled] = useState(!!commision)

    const handleSwitchChange = (e: ChangeEvent<HTMLInputElement>) => {
        const isEnabled = e.target.checked
        setCommissionEnabled(isEnabled)
        if (!isEnabled) updateState('commision', 0)
    }

    const handleCommissionChange = ({ target: { value, validity } }) => {
        if (validity.valid) updateState('commision', parseInt(value))
    }

    return (
        <Flex gap={3}>
            <AppSwitch isChecked={isCommissionEnabled} onChange={handleSwitchChange} />

            <Flex width="100%" direction="column" gap={4}>
                <Flex flexDirection="column" gap={1} color="#C2C2C2">
                    <AppTypography fontSize={14} fontWeight="bold">Affiliate Market</AppTypography>
                    <AppTypography fontSize={14}>Enable to allow co-sellers to import and sell your products.</AppTypography>
                </Flex>

                {isCommissionEnabled && (
                    <CommissionDetails
                        commision={commision}
                        onCommissionChange={handleCommissionChange}
                    />
                )}
            </Flex>
        </Flex>
    )
}

function CommissionDetails({ commision, onCommissionChange }) {
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
                    value={commision}
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