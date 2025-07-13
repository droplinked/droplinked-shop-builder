import { useFormikContext } from "formik";
import React from "react";
import { CouponFormValues } from "./formConfigs";
import { Box, Flex } from "@chakra-ui/react";
import AppInput, { AppInputHeader } from "components/redesign/input/AppInput";
import AppDatePicker from "components/redesign/date-picker/AppDatePicker";
import AmountInput from "./AmountInput";
import QuantityInput from "./QuantityInput";
import useLocaleResources from "hooks/useLocaleResources/useLocaleResources";

export default function CouponForm({ isEdit }: { isEdit?: boolean }) {
    const { t } = useLocaleResources('settings');
    const { values, handleChange, errors, setFieldValue } = useFormikContext<CouponFormValues>();

    return (
        <Flex flexDirection={"column"} gap={9}>
            <AppInput
                label={t("settings.coupons.form.titleLabel")}
                description={t("settings.coupons.form.titleDescription")}
                maxCharacters={100}
                inputProps={{
                    isRequired: true,
                    onChange: handleChange,
                    name: "name",
                    placeholder: t("settings.coupons.form.titlePlaceholder"),
                    value: values.name,
                    isDisabled: isEdit
                }}
                {...errors.name && { error: errors.name, state: "error" }}
            />
            <AmountInput isEdit={isEdit} />
            <QuantityInput isEdit={isEdit} />
            <Flex flexDirection={"column"}>
                <AppInputHeader
                    label={t("settings.coupons.form.expirationDateLabel")}
                    description={t("settings.coupons.form.expirationDateDescription")}
                    inputProps={{ isRequired: true }}
                />
                <Box {...errors.expiryDate && { border: "1px solid #F24" }} width={"min-content"} borderRadius={"8px"}>
                    <AppDatePicker
                        minDate={new Date()}
                        dateFormat="d MMM, yyyy"
                        onChange={(date: Date) => setFieldValue("expiryDate", date.toISOString())}
                        value={values.expiryDate ? new Date(values.expiryDate) : new Date()}
                    />
                </Box>
            </Flex>
        </Flex>
    );
}
