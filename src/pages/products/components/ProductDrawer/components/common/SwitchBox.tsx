import { Flex, FlexProps, Switch, SwitchProps, Text } from "@chakra-ui/react"
import ErrorMessage from "components/redesign/error-message/ErrorMessage"
import React, { PropsWithChildren, ReactNode } from "react"

interface Props extends PropsWithChildren {
    title: string
    description: string
    switchProps: SwitchProps
    containerProps?: FlexProps
    rightContent?: ReactNode
    errorMessage?: string
}

const SwitchBox = ({ title, description, switchProps, containerProps, rightContent, errorMessage, children }: Props) => {
    return (
        <Flex
            gap={4}
            {...containerProps}
        >
            <Switch
                flexShrink={0}
                size="lg"
                {...switchProps}
                sx={{
                    ".chakra-switch__track": { width: "42px", height: "20px" },
                    ".chakra-switch__thumb": { width: "20px", height: "100%" }
                }}
            />
            <Flex flex={1} direction="column" gap={4}>
                <Flex flex={1} gap={4}>
                    <Flex flex={1} direction="column" gap={1}>
                        <Text fontSize={16} fontWeight={500} color="#FFF">{title}</Text>
                        <Text fontSize={14} color="#7B7B7B">{description}</Text>
                    </Flex>
                    {rightContent}
                </Flex>
                {children}
                {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            </Flex>
        </Flex>
    )
}

export default SwitchBox