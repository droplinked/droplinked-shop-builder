import { Input as ChakraInput, Flex, FlexProps, FormLabel, FormLabelProps, InputGroup, InputGroupProps, InputProps, Text } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import React, { ReactNode } from 'react'

interface Props {
    inputGroupProps?: InputGroupProps
    label?: string
    labelProps?: FormLabelProps
    description?: string
    inputContainerProps?: FlexProps
    inputProps?: InputProps
    leftElement?: ReactNode
    rightElement?: ReactNode
    actionButton?: ReactNode
    hasError?: boolean
    message?: string
    maxCharacters?: number
}

const Input = ({ inputGroupProps, label, labelProps, description, inputContainerProps, inputProps, leftElement, rightElement, hasError, message, maxCharacters }: Props) => {
    return (
        <InputGroup display="flex" flexDirection="column" {...inputGroupProps}>
            {label && (
                <FormLabel
                    mb={description ? 1 : 4}
                    display="flex" alignItems="center" gap={1}
                    fontSize={16} fontWeight={500} color="#FFF"
                    {...labelProps}
                >
                    {label} {inputProps?.isRequired && <AppIcons.Required />}
                </FormLabel>
            )}

            {description && <Text mb={4} fontSize={14} color="#7B7B7B">{description}</Text>}

            <Flex
                alignItems="center" gap={2}
                borderRadius={8} border="1px solid" borderColor={hasError ? "#F24" : "#292929"}
                padding="12px 16px"
                transition="border-color 0.1s ease-out"
                _hover={{ borderColor: hasError ? "#F24" : "#3C3C3C" }}
                _focus={{ borderColor: hasError ? "#F24" : "#7B7B7B" }}
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
                    {...inputProps}
                />
                {rightElement}
            </Flex>

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
                            {`${inputProps?.value?.toString()?.length}/${maxCharacters}`}
                        </Text>
                    )}
                </Flex>
            )}
        </InputGroup>
    )
}

export default Input