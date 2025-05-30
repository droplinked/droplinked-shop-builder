import { useFormikContext } from 'formik';
import React from 'react'
import { CouponFormValues } from './formConfigs';
import { Box, Flex } from '@chakra-ui/react';
import AppInput, { AppInputHeader } from 'components/redesign/input/AppInput';
import useLocaleResources from "hooks/useLocaleResources/useLocaleResources";

export default function QuantityInput({ isEdit }: { isEdit?: boolean }) {
    const { t } = useLocaleResources('settings');
    const { values, handleChange, errors } = useFormikContext<CouponFormValues>();

    return (
        <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Flex width={"100%"} flexDirection={"column"}>
                <AppInputHeader
                    label={t("settings.coupons.form.quantityLabel")}
                    description={t("settings.coupons.form.quantityDescription")}
                    inputProps={{ isRequired: true }}
                />
            </Flex>
            <Box width={"5rem"}>
                <AppInput
                    inputProps={{
                        onChange: handleChange,
                        name: "quantity",
                        placeholder: t("settings.coupons.form.quantityPlaceholder"),
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
