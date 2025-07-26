import { Box, Input as ChakraInput, Flex, FlexProps, FormLabel, FormLabelProps, InputGroup, InputGroupProps, InputProps, Text } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import { TooltipMd } from 'assets/icons/Sign/Tooltip/TooltipMd'
import AppTooltip from 'components/common/tooltip/AppTooltip'
import AnimatedBox from 'pages/products/components/ProductDrawer/components/common/AnimatedBox'
import React, { KeyboardEvent, ReactNode } from 'react'
import AnimatedLoadingText from '../../../pages/products/components/ProductDrawer/components/common/AnimatedLoadingText/AnimatedLoadingText'

/**
 * Custom input component with support for labels, validation states, and additional elements
 * 
 * @param {object} props - Component props
 * @param {InputGroupProps} [props.inputGroupProps] - Props for the input group wrapper
 * @param {string} [props.label] - Input field label
 * @param {string} [props.description] - Additional description below label
 * @param {FlexProps} [props.inputContainerProps] - Props for the input container
 * @param {InputProps & {numberType?: 'int' | 'float'}} [props.inputProps] - Props for the input element
 * @param {FormLabelProps} [props.labelProps] - Props for the form label
 * @param {ReactNode} [props.leftElement] - Element to display before input
 * @param {ReactNode} [props.rightElement] - Element to display after input
 * @param {ReactNode} [props.actionButton] - Action button to display
 * @param {'success' | 'error'} [props.state] - Validation state 
 * @param {string} [props.stateColor] - Color for state messages
 * @param {boolean} [props.showErrorIcon] - Whether to show error icon
 * @param {string} [props.message] - Validation or help message
 * @param {number} [props.maxCharacters] - Maximum character count
 * @param {boolean} [props.showAnimatedLoading] - Whether to show loading animation
 * 
 * @returns {JSX.Element} Custom input component
 */
interface Props {
    inputGroupProps?: InputGroupProps
    label?: string
    description?: string
    inputContainerProps?: FlexProps
    inputProps?: InputProps & {
        numberType?: 'int' | 'float'
    }
    labelProps?: FormLabelProps;
    leftElement?: ReactNode
    rightElement?: ReactNode
    actionButton?: ReactNode
    state?: 'success' | 'error'
    stateColor?: string;
    showErrorIcon?: boolean;
    message?: string
    maxCharacters?: number
    showAnimatedLoading?: boolean
    tooltipText?: string
}

export default function AppInput(props: Props) {
    return (
        <InputGroup
            display="flex"
            flexDirection="column"
            {...props.inputGroupProps}
        >
            <AppInputHeader {...props} />
            <InputContainer {...props} />
            <InputFooter {...props} />
        </InputGroup>
    )
}

export function AppInputHeader({ label, description, inputProps, labelProps, tooltipText }: Props) {
    return (
        <>
            {label && (
                <Flex gap={2} alignItems={"center"} mb={description ? 1 : 4}>
                    <FormLabel
                        display="flex"
                        alignItems="center"
                        gap={1}
                        fontSize={16}
                        fontWeight={500}
                        color="#FFF"
                        {...labelProps}
                    >
                        {label} {inputProps?.isRequired && <AppIcons.Required />}
                    </FormLabel>
                    {tooltipText && <AppTooltip label={tooltipText}>
                        <Box>
                            <TooltipMd color='#292929' />
                        </Box>
                    </AppTooltip>
                    }
                </Flex>
            )}
            {description && <Text mb={4} fontSize={14} color="text.subtext.placeholder.dark">{description}</Text>}
        </>
    )
}

function InputContainer(props: Props) {
    const { leftElement, rightElement, inputContainerProps, inputProps, maxCharacters, state, showAnimatedLoading } = props
    const borderColorMap = { success: "#2BCFA1", error: "#F24" }

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (inputProps?.type === 'number') {
            const invalidChars = ['e', 'E', '+', '-', ',']
            if (inputProps.numberType === 'int') invalidChars.push('.')
            if (invalidChars.includes(event.key)) event.preventDefault()
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (inputProps?.isDisabled) return

        const { value, validity } = event.target

        if (inputProps?.type !== 'number') return inputProps?.onChange?.(event)

        const numericValue = inputProps.numberType === 'float' ? parseFloat(value) : parseInt(value, 10)

        if (!isNaN(numericValue) && validity.valid) inputProps?.onChange?.(event)
    }

    return (
        <AnimatedBox
            flexProps={{
                ...showAnimatedLoading ?
                    {
                        _before: {
                            width: "calc(100% + 0.1px) !important",
                            height: "calc(100% + 0.1px) !important"
                        },
                        _after: {
                            width: "calc(100% + 0.1px) !important",
                            height: "calc(100% + 0.1px) !important",
                        },
                        padding: "0.1px !important"
                    } :
                    {
                        _before: { display: "none" },
                        _after: { display: "none" },
                        background: "transparent !important"
                    }
            }}
        >
            <Flex
                width="100%"
                alignItems="center"
                gap={2}
                border="1px solid"
                borderRadius={8}
                borderColor={borderColorMap[state] || "neutral.gray.800"}
                padding="12px 16px"
                transition="border-color 0.1s ease-out"
                _hover={{ borderColor: borderColorMap[state] || "neutral.gray.700" }}
                _focus={{ borderColor: borderColorMap[state] || "text.subtext.placeholder.dark" }}
                {...showAnimatedLoading && { background: "neutral.background" }}
                {...inputContainerProps}
            >
                {leftElement}
                {!showAnimatedLoading &&
                    <ChakraInput
                        height="auto"
                        outline="none"
                        border="none"
                        borderRadius={0}
                        padding={0}
                        fontSize={14}
                        fontWeight={400}
                        color="neutral.white"
                        maxLength={maxCharacters}
                        spellCheck={false}
                        _placeholder={{ color: "text.subtext.placeholder.dark" }}
                        _focusVisible={{}}
                        sx={{
                            "&:-webkit-autofill": {
                                WebkitTextFillColor: "#fff",
                                WebkitBoxShadow: "0 0 0px 1000px transparent inset",
                                transition: "background-color 5000s ease-in-out 0s"
                            }
                        }}
                        onKeyDown={handleKeyDown}
                        {...inputProps}
                        onChange={handleChange}
                    />
                }
                {showAnimatedLoading &&
                    <AnimatedLoadingText
                        text={inputProps.value}
                        fontSize={inputProps.fontSize ?? 14}
                        fontWeight={inputProps.fontWeight ?? 400}
                        color={inputProps.color ?? "#fff"}
                    />
                }
                {rightElement}
            </Flex>
        </AnimatedBox>
    )
}

function InputFooter({ message, maxCharacters, inputProps, stateColor = "#fff", showErrorIcon = true }: Props) {
    return (
        <>
            {(message || maxCharacters) && (
                <Flex
                    mt={2}
                    paddingInline={4}
                    css={{ p: { fontSize: 12, color: stateColor } }}
                >
                    {message && (
                        <Flex alignItems="center" gap={2}>
                            {showErrorIcon && <AppIcons.WhiteWarning />}
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