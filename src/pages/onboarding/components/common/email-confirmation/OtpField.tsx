import { Flex, PinInput, PinInputField } from "@chakra-ui/react"
import React, { useEffect, useRef } from "react"

interface Props {
    value: string
    onChange: (value: string) => void
    state?: "default" | "error" | "success"
    isLoading: boolean
}

const stateColorMap = new Map([
    ["default", {
        border: "#292929",
        focusBorder: "#fff",
        hoverBorder: "#616161",
        color: "#fff",
        backgroundColor: "transparent"
    }],
    ["error", {
        border: "#FF2244",
        focusBorder: "#FF2244",
        color: "#FF2244",
        backgroundColor: "rgba(255, 34, 68, 0.05)"
    }],
    ["success", {
        border: "#2BCFA1",
        focusBorder: "#2BCFA1",
        color: "#2BCFA1",
        backgroundColor: "rgba(43, 207, 161, 0.10)"
    }]
])

export default function OtpField({ value, onChange, isLoading, state = "default" }: Props) {
    const containerRef = useRef<HTMLDivElement>(null)
    const colors = stateColorMap.get(state)

    // Handle paste event
    useEffect(() => {
        const handlePaste = (e: ClipboardEvent) => {
            e.preventDefault()

            if (e.clipboardData) {
                // Get pasted content and remove any non-digit characters (like dashes)
                const pastedText = e.clipboardData.getData('text')
                const cleanedText = pastedText.replace(/[^0-9]/g, '')

                // Only use the first 6 digits
                const otpValue = cleanedText.slice(0, 6)

                // Update the OTP value
                onChange(otpValue)
            }
        }

        const container = containerRef.current
        container?.addEventListener('paste', handlePaste)

        return () => {
            container?.removeEventListener('paste', handlePaste)
        }
    }, [onChange])

    return (
        <Flex
            ref={containerRef}
            justifyContent="center"
            alignItems="center"
            gap={4}
            marginTop={{ base: "0px", md: "38px" }}
            marginBottom={{ base: "48px", md: "80px" }}
            style={{ direction: "ltr" }}
        >
            <PinInput
                otp
                placeholder="*"
                value={value}
                isDisabled={isLoading}
                onChange={onChange}
            >
                {Array.from({ length: 6 }).map((_, index) => (
                    <PinInputField
                        key={index}
                        width={{ base: "48px", md: "64px" }}
                        height={{ base: "48px", md: "64px" }}
                        border={`1px solid ${colors?.border}`}
                        borderRadius="8px"
                        backgroundColor={colors?.backgroundColor}
                        color={colors?.color}
                        fontSize={20}
                        fontWeight={500}
                        _placeholder={{
                            color: "#7b7b7b",
                        }}
                        _hover={{
                            border: `1px solid ${colors?.hoverBorder}`,
                        }}
                        _focus={{
                            border: `1px solid ${colors?.focusBorder}`,
                        }}
                        _focusVisible={{
                            outline: "none",
                            border: `1px solid ${colors?.focusBorder}`,
                        }}
                    />
                ))}
            </PinInput>
        </Flex>
    )
}