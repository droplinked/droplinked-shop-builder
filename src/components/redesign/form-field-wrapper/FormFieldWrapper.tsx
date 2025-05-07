import { Box, BoxProps, Flex, FormLabel, FormLabelProps, Text } from "@chakra-ui/react"
import AppIcons from "assets/icon/Appicons"
import ErrorMessage from "components/redesign/error-message/ErrorMessage"
import React, { ReactNode } from "react"

/**
 * FormFieldWrapper Component - Consistent layout for form fields
 * 
 * Provides standardized structure for form fields with label, optional description,
 * required indicator, error message, and customizable right content area.
 * 
 * @param {object} props - Component props
 * @param {string} props.label - Label text for the form field
 * @param {FormLabelProps} [props.labelProps] - Additional props for the form label
 * @param {string} [props.description] - Optional description text under the label
 * @param {boolean} [props.isRequired=false] - Whether to show the required indicator
 * @param {string} [props.errorMessage] - Error message to display below the field
 * @param {ReactNode} [props.rightContent] - Content to display in the top right area
 * @param {ReactNode} props.children - Form input or control to wrap
 * @param {BoxProps} props - Additional styling properties for the container
 */
interface Props extends BoxProps {
    label: string
    labelProps?: FormLabelProps
    description?: string
    isRequired?: boolean
    errorMessage?: string
    rightContent?: ReactNode
}

function FormFieldWrapper({ label, labelProps, description, isRequired = false, errorMessage, rightContent, children, ...props }: Props) {
    return (
        <Box {...props}>
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
                    {description && <Text fontSize={14} fontWeight={400} color="text.subtext.placeholder.dark">{description}</Text>}
                </Flex>
                {rightContent}
            </Flex>

            {children}

            {errorMessage && <ErrorMessage mt={2}>{errorMessage}</ErrorMessage>}
        </Box>
    )
}

export default FormFieldWrapper