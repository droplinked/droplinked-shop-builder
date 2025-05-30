import { Flex } from "@chakra-ui/react";
import AppButton from "components/redesign/button/AppButton";
import { useFormikContext } from "formik";
import useLocaleResources from "hooks/useLocaleResources/useLocaleResources";
import React, { MouseEvent } from "react";

export default function FormActions({ onClose }: { onClose: () => void }) {
    const { handleSubmit, isSubmitting, resetForm } = useFormikContext();
    const { t } = useLocaleResources("settings");

    const handleCloseForm = () => {
        onClose();
        resetForm();
    };

    const handleFormSubmit = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        handleSubmit();
    };

    return (
        <Flex width={"100%"} gap={4} justifyContent={"end"}>
            <AppButton
                variant="secondary"
                isDisabled={isSubmitting}
                onClick={handleCloseForm}
            >
                {t("settings.address.buttons.discard")}
            </AppButton>
            <AppButton onClick={handleFormSubmit} isLoading={isSubmitting}>
                {t("settings.address.buttons.save")}
            </AppButton>
        </Flex>
    );
}
