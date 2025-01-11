import { useFormikContext } from "formik";
import React from "react";
import { CouponFormValues } from "./formConfigs";
import { Box, Flex } from "@chakra-ui/react";
import Input, { InputHeader } from "components/redesign/input/Input";
import Select from "components/redesign/select/Select";
import AppDatePicker from "components/redesign/date-picker/AppDatePicker";

export default function CouponForm({ isEdit }: { isEdit?: boolean }) {
    const { values, handleChange, errors, setFieldValue } = useFormikContext<CouponFormValues>();

    return (
        <Flex flexDirection={"column"} gap={9} px={9}>
            <Input
                label="Title"
                description="Enter a unique name for the discount."
                maxCharacters={100}
                inputProps={{
                    isRequired: true,
                    onChange: handleChange,
                    name: "name",
                    placeholder: "e.g., Summer Sale",
                    value: values.name,
                    isDisabled: isEdit
                }}
                {...errors.name && { error: errors.name, state: "error" }}
            />
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
                        {...errors.name && { error: errors.balance, state: "error" }}
                    />
                    <Select
                        items={[
                            { label: "Percentage", value: "DISCOUNT" },
                            { label: "USD", value: "CREDIT" }
                        ]}
                        labelAccessor="label"
                        valueAccessor="value"
                        error={errors.type}
                        selectProps={{ name: "type", onChange: handleChange, value: values.type, isDisabled: isEdit }}
                    />
                </Flex>
            </Flex>
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
                        {...errors.name && { error: errors.quantity, state: "error" }}
                    />
                </Box>
            </Flex>
            <Flex flexDirection={"column"}>
                <InputHeader label="Expiration Date" description="Select a specific expiration date for discount." inputProps={{ isRequired: true }} />
                <Box {...errors.expiryDate && { border: "1px solid #F24" }} width={"min-content"} borderRadius={"8px"}>
                    <AppDatePicker
                        minDate={new Date()}
                        onChange={(date: Date) => setFieldValue("expiryDate", date.toISOString())}
                        value={values.expiryDate ? new Date(values.expiryDate) : new Date()}
                        showTimeInput
                    />
                </Box>
            </Flex>
        </Flex>
    );
}
