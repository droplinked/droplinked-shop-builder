import { Flex, Switch, Text } from "@chakra-ui/react"
import React, { ChangeEvent, PropsWithChildren, ReactNode } from "react"

interface Props extends PropsWithChildren {
    isChecked: boolean
    onToggle: (e: ChangeEvent<HTMLInputElement>) => void
    title?: string
    description?: string
    rightContent?: ReactNode
    isDisabled?: boolean
}

const SwitchBox = ({ isChecked, onToggle, title, description, rightContent, children, isDisabled }: Props) => {
    const content = (
        <Flex flex={1} alignItems="start" gap={4}>
            <Switch
                size="lg"
                isDisabled={isDisabled}
                isChecked={isChecked}
                onChange={onToggle}
                sx={{
                    ".chakra-switch__track": {
                        width: "42px",
                        height: "20px",
                        ...(!isChecked && { background: "#333333" })
                    },
                    ".chakra-switch__thumb": {
                        width: "20px",
                        height: "100%",
                        background: "#000000"
                    }
                }}
            />
            <Flex direction="column">
                <Text mb={1} fontSize={16} fontWeight={500} color="#FFF">{title}</Text>
                <Text mb={children ? 4 : 0} fontSize={14} color="#7B7B7B">{description}</Text>
                {children}
            </Flex>
        </Flex>
    )

    return (
        <Flex align="flex-start" gap={4}>
            {content}
            {rightContent}
        </Flex>
    )
}

export default SwitchBox