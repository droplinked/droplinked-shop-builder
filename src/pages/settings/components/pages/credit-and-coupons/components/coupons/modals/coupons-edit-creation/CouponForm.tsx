import { useFormikContext } from "formik";
import React from "react";
import { CouponFormValues } from "./formConfigs";
import { Box, Flex } from "@chakra-ui/react";
import Input, { InputHeader } from "components/redesign/input/Input";
import AppDatePicker from "components/redesign/date-picker/AppDatePicker";
import AmountInput from "./AmountInput";
import QuantityInput from "./QuantityInput";

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
            <AmountInput isEdit={isEdit} />
            <QuantityInput isEdit={isEdit} />
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
