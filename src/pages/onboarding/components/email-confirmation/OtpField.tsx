import { Flex, PinInput, PinInputField } from "@chakra-ui/react"
import React from "react"

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
    }],
])

export default function OtpField({ value, onChange, isLoading, state = "default" }: Props) {
    const colors = stateColorMap.get(state)

    return (
        <Flex
            alignItems="center"
            justifyContent="center"
            marginTop={{ base: "0px", md: "38px" }}
            marginBottom={{ base: "48px", md: "80px" }}
            gap={{ base: 4, md: 6 }}
        >
            <PinInput otp placeholder="*" onChange={onChange} value={value} isDisabled={isLoading}>
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