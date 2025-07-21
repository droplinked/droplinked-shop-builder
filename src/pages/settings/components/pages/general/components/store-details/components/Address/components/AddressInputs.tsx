import { Flex } from "@chakra-ui/react";
import { useFormikContext } from "formik";
import useLocaleResources from "hooks/useLocaleResources/useLocaleResources";
import React, { useEffect } from "react";
import { IAddressInputs } from "../formConfigs";
import AppInput from "components/redesign/input/AppInput";
import CountriesField from "./CountriesField";
import StatesField from "./StatesField";
import CitiesField from "./CitiesField";
import FormActions from "./FormActions";

interface Props {
    onClose: () => void;
}

export default function AddressInputs({ onClose }: Props) {
    const { values, errors, setFieldValue, handleChange } = useFormikContext<IAddressInputs>();
    const { t } = useLocaleResources('settings');

    useEffect(() => {
        setFieldValue("state", "")
        setFieldValue("city", "")
    }, [values.country, setFieldValue])

    useEffect(() => {
        setFieldValue('state', values.state);
        setFieldValue('city', values.city);
    }, [values.state, setFieldValue])

    return (
        <Flex
            gap={4}
            borderRadius={"8px"}
            border={"1px solid"}
            borderColor="neutral.gray.800"
            flexDirection={"column"}
            p={4}
        >
            <Flex gap={4} flexDirection={{ base: "column", md: "row" }}>
                <AppInput
                    message={errors.firstName}
                    {...(errors.firstName && { state: "error" })}
                    inputProps={{
                        placeholder: t("Address.fields.firstName"),
                        name: "firstName",
                        value: values.firstName,
                        onChange: handleChange,
                    }}
                />
                <AppInput
                    message={errors.lastName}
                    {...(errors.lastName && { state: "error" })}
                    inputProps={{
                        placeholder: t("Address.fields.lastName"),
                        name: "lastName",
                        value: values.lastName,
                        onChange: handleChange,
                    }}
                />
            </Flex>
            <Flex gap={4} flexDirection={{ base: "column", md: "row" }}>
                <AppInput
                    message={errors.addressLine1}
                    {...(errors.addressLine1 && { state: "error" })}
                    inputProps={{
                        placeholder: t("Address.fields.addressLine1"),
                        name: "addressLine1",
                        value: values.addressLine1,
                        onChange: handleChange,
                    }}
                />
                <AppInput
                    message={errors.addressLine2}
                    {...(errors.addressLine2 && { state: "error" })}
                    inputProps={{
                        placeholder: t("Address.fields.addressLine2"),
                        name: "addressLine2",
                        value: values.addressLine2,
                        onChange: handleChange,
                    }}
                />
            </Flex>
            <Flex gap={4} flexDirection={{ base: "column", md: "row" }}>
                <CountriesField />
                <StatesField />
                <CitiesField />
                <AppInput
                    message={errors.zip}
                    {...(errors.zip && { state: "error" })}
                    inputProps={{
                        placeholder: t("Address.fields.zip"),
                        name: "zip",
                        value: values.zip,
                        onChange: handleChange,
                    }}
                />
            </Flex>
            <FormActions onClose={onClose} />
        </Flex>
    );
}
