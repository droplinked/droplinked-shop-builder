import { Flex, FlexProps, Switch, Text } from "@chakra-ui/react"
import React, { ChangeEvent, ReactNode } from "react"

interface Props extends FlexProps {
    title: string
    description: string
    isChecked: boolean
    onToggle: (e: ChangeEvent<HTMLInputElement>) => void
    rightContent?: ReactNode
}

const SwitchBox = ({ title, description, isChecked, onToggle, rightContent, children, ...containerProps }: Props) => {
    return (
        <Flex
            gap={4}
            {...containerProps}
        >
            <Switch
                flexShrink={0}
                size="lg"
                isChecked={isChecked}
                onChange={onToggle}
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
            </Flex>
        </Flex>
    )
}

export default SwitchBox