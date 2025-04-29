import { Box, Flex, FormLabel, FormLabelProps, Text } from "@chakra-ui/react"
import AppIcons from "assets/icon/Appicons"
import ErrorMessage from "components/redesign/error-message/ErrorMessage"
import React, { PropsWithChildren, ReactNode } from "react"

interface Props extends PropsWithChildren {
    label: string
    labelProps?: FormLabelProps
    description?: string
    isRequired?: boolean
    errorMessage?: string
    rightContent?: ReactNode
}

function FormFieldWrapper({ label, labelProps, description, isRequired = false, errorMessage, rightContent, children }: Props) {
    return (
        <Box>
            <Flex
                mb={children ? 4 : 0}
                align="flex-start"
                gap={4}
            >
                <Flex flex={1} direction="column" gap={1}>
                    <FormLabel
                        display="flex"
                        alignItems="center"
                        gap="6px"
                        fontSize={16}
                        fontWeight={500}
                        color="#FFF"
                        {...labelProps}
                    >
                        {label} {isRequired && <AppIcons.Required />}
                    </FormLabel>
                    {description && <Text fontSize={14} fontWeight={400} color="text.subtextPlaceholder.dark">{description}</Text>}
                </Flex>
                {rightContent}
            </Flex>

            {children}

            {errorMessage && <ErrorMessage mt={2}>{errorMessage}</ErrorMessage>}
        </Box>
    )
}

export default FormFieldWrapper