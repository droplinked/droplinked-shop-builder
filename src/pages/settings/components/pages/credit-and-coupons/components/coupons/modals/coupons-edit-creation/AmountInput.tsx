import { Flex } from '@chakra-ui/react'
import Input, { InputHeader } from 'components/redesign/input/Input'
import Select from 'components/redesign/select/Select'
import { useFormikContext } from 'formik';
import React from 'react'
import { CouponFormValues } from './formConfigs';
import { useCurrencyConverter } from 'functions/hooks/useCurrencyConverter/useCurrencyConverter';

export default function AmountInput({ isEdit }: { isEdit?: boolean }) {
    const { values, handleChange, errors } = useFormikContext<CouponFormValues>();
    const { abbreviation } = useCurrencyConverter()

    return (
        <Flex flexDirection={"column"}>
            <InputHeader label="Amount" description="Select the discount type between shop’s currency or percentage." inputProps={{ isRequired: true }} />
            <Flex gap={4} width={"100%"}>
                <Input
                    inputProps={{
                        onChange: handleChange,
                        name: "balance",
                        placeholder: "0.00",
                        value: values.balance,
                        isDisabled: isEdit,
                        type: "number",
                    }}
                    {...errors.balance && { error: errors.balance, state: "error" }}
                />
                <Select
                    items={[
                        { label: "Percentage", value: "DISCOUNT" },
                        { label: abbreviation, value: "CREDIT" }
                    ]}
                    labelAccessor="label"
                    valueAccessor="value"
                    error={errors.type}
                    selectProps={{ name: "type", onChange: handleChange, value: values.type, isDisabled: isEdit }}
                />
            </Flex>
        </Flex>
    )
}
