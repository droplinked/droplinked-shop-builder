import { Input as ChakraInput, Flex, FlexProps, FormLabel, InputGroup, InputGroupProps, InputProps, Text } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import React, { KeyboardEvent, ReactNode } from 'react'

interface Props {
    inputGroupProps?: InputGroupProps
    label?: string
    description?: string
    inputContainerProps?: FlexProps
    inputProps?: InputProps & {
        numberType?: 'int' | 'float'
    }
    leftElement?: ReactNode
    rightElement?: ReactNode
    actionButton?: ReactNode
    state?: 'success' | 'error'
    message?: string
    maxCharacters?: number
}

export default function Input(props: Props) {
    return (
        <InputGroup
            display="flex"
            flexDirection="column"
            {...props.inputGroupProps}
        >
            <InputHeader {...props} />
            <InputContainer {...props} />
            <InputFooter {...props} />
        </InputGroup>
    )
}

export function InputHeader({ label, description, inputProps }: Props) {
    return (
        <>
            {label && (
                <FormLabel
                    mb={description ? 1 : 4}
                    display="flex"
                    alignItems="center"
                    gap={1}
                    fontSize={16}
                    fontWeight={500}
                    color="#FFF"
                >
                    {label} {inputProps?.isRequired && <AppIcons.Required />}
                </FormLabel>
            )}
            {description && <Text mb={4} fontSize={14} color="#7B7B7B">{description}</Text>}
        </>
    )
}

function InputContainer(props: Props) {
    const { leftElement, rightElement, inputContainerProps, inputProps, maxCharacters, state } = props
    const borderColorMap = { success: "#2BCFA1", error: "#F24" }

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (inputProps?.type === 'number') {
            const invalidChars = ['e', 'E', '+', '-', ',']
            if (inputProps.numberType === 'int') invalidChars.push('.')
            if (invalidChars.includes(event.key)) event.preventDefault()
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, validity } = event.target

        if (inputProps?.type === 'number') {
            const numericValue = inputProps.numberType === 'float' ? parseFloat(value) : parseInt(value, 10)
            if (!isNaN(numericValue) && validity.valid) inputProps?.onChange?.(event)
        }
        else inputProps?.onChange?.(event)

    }

    return (
        <Flex
            alignItems="center"
            gap={2}
            border="1px solid"
            borderRadius={8}
            borderColor={borderColorMap[state] || "#292929"}
            padding="12px 16px"
            transition="border-color 0.1s ease-out"
            _hover={{ borderColor: borderColorMap[state] || "#3C3C3C" }}
            _focus={{ borderColor: borderColorMap[state] || "#7B7B7B" }}
            {...inputContainerProps}
        >
            {leftElement}
            <ChakraInput
                height="auto"
                outline="none"
                border="none"
                borderRadius={0}
                padding={0}
                fontSize={14}
                fontWeight={400}
                color="#fff"
                maxLength={maxCharacters}
                spellCheck={false}
                _placeholder={{ color: "#7B7B7B" }}
                _focusVisible={{}}
                onKeyDown={handleKeyDown}
                onChange={handleChange}
                {...inputProps}
            />
            {rightElement}
        </Flex>
    )
}

function InputFooter({ message, maxCharacters, inputProps }: Props) {
    return (
        <>
            {(message || maxCharacters) && (
                <Flex
                    mt={2}
                    paddingInline={4}
                    css={{ p: { fontSize: 12, color: "#FFF" } }}
                >
                    {message && (
                        <Flex alignItems="center" gap={2}>
                            <AppIcons.WhiteWarning />
                            <Text>{message}</Text>
                        </Flex>
                    )}
                    {maxCharacters && (
                        <Text marginLeft="auto">
                            {`${inputProps?.value?.toString()?.length || 0}/${maxCharacters}`}
                        </Text>
                    )}
                </Flex>
            )}
        </>
    )
}