import { useFormikContext } from 'formik';
import React from 'react'
import { CouponFormValues } from './formConfigs';
import { Box, Flex } from '@chakra-ui/react';
import Input, { InputHeader } from 'components/redesign/input/Input';

export default function QuantityInput({ isEdit }: { isEdit?: boolean }) {
    const { values, handleChange, errors } = useFormikContext<CouponFormValues>();

    return (
        <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Flex width={"100%"} flexDirection={"column"}>
                <InputHeader label="Quantity" description="Number of times this discount can be used." inputProps={{ isRequired: true }} />
            </Flex>
            <Box width={"5rem"}>
                <Input
                    inputProps={{
                        onChange: handleChange,
                        name: "quantity",
                        placeholder: "9999",
                        type: "number",
                        value: values.quantity,
                        isDisabled: isEdit
                    }}
                    {...errors.quantity && { error: errors.quantity, state: "error" }}
                />
            </Box>
        </Flex>
    )
}
