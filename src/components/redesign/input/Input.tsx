import { Input as ChakraInput, Flex, FormLabel, InputGroup, InputGroupProps, InputProps, Text } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import Button from 'components/redesign/button/Button'
import React, { ReactNode } from 'react'

interface Props {
    label?: string
    inputProps?: InputProps
    inputGroupProps?: InputGroupProps
    icon?: ReactNode
    description?: string
    actionButton?: {
        label: string
        onClick: () => void
        isDisabled?: boolean
        isLoading?: boolean
    }
    error?: string
}

const Input = ({ label, inputProps, inputGroupProps, icon, actionButton, error, description }: Props) => {
    const baseInputProps = {
        borderRadius: 8,
        py: 3,
        fontSize: 16,
        fontWeight: 400,
        color: "#7B7B7B",
        spellCheck: false,
        _hover: {
            borderColor: error ? "#E53E3E" : "#3C3C3C",
            backgroundColor: "#1E1E1E"
        },
        _focus: { borderColor: "#7B7B7B", backgroundColor: "#1E1E1E" },
        _focusVisible: { outline: "none" },
        _placeholder: { color: "#7B7B7B" },
        ...inputProps
    }

    const baseInputGroupProps = {
        display: "flex",
        alignItems: "center",
        gap: 2,
        borderRadius: 8,
        py: actionButton ? 2 : error ? 0 : 3,
        pl: error ? 0 : 4,
        pr: actionButton ? 2 : error ? 0 : 4,
        ...inputGroupProps
    }

    const renderActionButton = actionButton && (
        <Button
            size="sm"
            borderRadius={4}
            paddingBlock={2}
            paddingInline={3}
            fontSize={12}
            fontWeight={500}
            isDisabled={actionButton?.isDisabled}
            isLoading={actionButton?.isLoading}
            onClick={actionButton?.onClick}
        >
            {actionButton?.label}
        </Button>
    )

    const renderInputElement = (
        <ChakraInput
            border={icon || actionButton ? "none" : `1.5px solid ${error ? "#E53E3E" : "#292929"}`}
            px={icon || actionButton ? 0 : 4}
            {...baseInputProps}
        />
    )

    const renderInputWithoutLabel = () => {
        if (!icon && !actionButton && !error) return renderInputElement

        return (
            <>
                <Flex {...baseInputGroupProps}>
                    {icon}
                    {renderInputElement}
                    {renderActionButton}
                </Flex>
                {error && <Text mt={2} fontSize={14} color="#E53E3E">{error}</Text>}
            </>
        )
    }

    const renderInputWithLabel = () => (
        <InputGroup display="flex" flexDirection="column">
            <FormLabel
                width="fit-content"
                mb={description ? 0 : 4}
                display="flex"
                alignItems="center"
                gap={1}
                fontSize={14}
                fontWeight={500}
                color="white"
            >
                {label} {inputProps?.isRequired && <AppIcons.Required />}
            </FormLabel>

            {description && (
                <Text mt={1} mb={4} color="#7B7B7B" fontSize={14}>
                    {description}
                </Text>
            )}

            {!icon && !actionButton ?
                renderInputElement :
                <Flex {...baseInputGroupProps}>
                    {icon}
                    {renderInputElement}
                    {renderActionButton}
                </Flex>
            }

            {error && <Text fontSize={14} color="#E53E3E">{error}</Text>}
        </InputGroup>
    )

    return label ? renderInputWithLabel() : renderInputWithoutLabel()
}

export default Input