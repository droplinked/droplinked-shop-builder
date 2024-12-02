import { Input as ChakraInput, Flex, FormLabel, InputGroup, InputGroupProps, InputProps } from '@chakra-ui/react';
import AppTypography from 'components/common/typography/AppTypography';
import React from 'react';
import Button from 'components/redesign/button/Button';

interface Props {
    label?: string;
    inputProps?: InputProps;
    inputGroupProps?: InputGroupProps;
    icon?: React.ReactNode;
    actionButton?: {
        label: string;
        onClick: () => void;
        isDisabled?: boolean;
        isLoading?: boolean;
    };
    error?: string;
}

export default function Input({ label, inputProps, inputGroupProps, icon, actionButton, error }: Props) {
    const baseInputProps = {
        borderRadius: 8,
        py: 3,
        fontSize: 16,
        fontWeight: 400,
        color: "#7B7B7B",
        spellCheck: false,
        _hover: {},
        _focusVisible: {},
        _placeholder: { color: "#7B7B7B" },
        ...inputProps
    }

    const baseInputGroupProps = {
        display: "flex",
        alignItems: "center",
        gap: 2,
        border: "1.5px solid #292929",
        borderRadius: 8,
        py: actionButton ? 2 : 3,
        pl: 4,
        pr: actionButton ? 2 : 4,
        ...inputGroupProps
    }

    const actionButtonElement = (
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

    const inputElement = (
        <ChakraInput
            border={icon || actionButton ? "none" : "1.5px solid #292929"}
            px={icon || actionButton ? 0 : 4}
            {...baseInputProps}
        />
    )

    if (!label) {
        if (!icon && !actionButton && !error) return inputElement

        return (
            <>
                <Flex {...baseInputGroupProps}>
                    {icon}
                    {inputElement}
                    {actionButton && actionButtonElement}
                </Flex>
                {error && <AppTypography mt={2} fontSize={14} color={"#E53E3E"}>{error}</AppTypography>}
            </>
        )
    }

    return (
        <InputGroup display="flex" flexDirection="column" gap={2}>
            <FormLabel width="fit-content" m={0} fontSize={14} fontWeight={500} color="white">
                {label}
            </FormLabel>
            {!icon && !actionButton ?
                inputElement
                :
                <Flex {...baseInputGroupProps}>
                    {icon}
                    {inputElement}
                    {actionButton && actionButtonElement}
                </Flex>
            }
            {error && <AppTypography fontSize={14} color="#E53E3E">{error}</AppTypography>}
        </InputGroup>
    )
}