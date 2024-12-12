import { Box, FormLabel, FormLabelProps, Text } from "@chakra-ui/react"
import AppIcons from "assest/icon/Appicons"
import ErrorMessage from "components/redesign/error-message/ErrorMessage"
import React, { PropsWithChildren } from "react"

interface FieldWrapperProps extends PropsWithChildren {
    label: string
    labelProps?: FormLabelProps
    description?: string
    isRequired?: boolean
    errorMessage?: string
}

function ProductFieldWrapper({ label, labelProps, description, isRequired = false, errorMessage, children }: FieldWrapperProps) {
    return (
        <Box>
            <FormLabel
                display="flex"
                alignItems="center"
                gap="6px"
                mb={description ? 1 : 4}
                fontSize="16px"
                fontWeight="500"
                color="#FFF"
                {...labelProps}
            >
                {label} {isRequired && <AppIcons.Required />}
            </FormLabel>
            {description && (
                <Text mb={4} fontSize="14px" fontWeight="400" color="#7B7B7B">
                    {description}
                </Text>
            )}
            {children}
            {errorMessage && <ErrorMessage mt={2}>{errorMessage}</ErrorMessage>}
        </Box>
    )
}

export default ProductFieldWrapper