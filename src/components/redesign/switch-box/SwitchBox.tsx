import { Badge, Flex, Switch, Text } from "@chakra-ui/react"
import React, { ChangeEvent, PropsWithChildren, ReactNode } from "react"

/**
 * A component that combines a toggle switch with descriptive content
 * 
 * @param {object} props - Component props
 * @param {boolean} props.isChecked - Whether the switch is checked
 * @param {function} props.onToggle - Handler for when the switch is toggled
 * @param {string} [props.title] - Main title displayed next to the switch
 * @param {string} [props.description] - Descriptive text explaining the switch functionality
 * @param {ReactNode} [props.rightContent] - Optional content displayed on the right side
 * @param {boolean} [props.isDisabled] - Whether the switch is disabled
 * @param {boolean} [props.showBetaBadge] - Whether to show a beta badge next to the title
 * @param {ReactNode} [props.children] - Additional content displayed below the description
 * 
 * @returns {JSX.Element} Combined switch and content component
 */
interface Props extends PropsWithChildren {
    isChecked: boolean
    onToggle: (e: ChangeEvent<HTMLInputElement>) => void
    title?: string
    description?: string
    rightContent?: ReactNode
    isDisabled?: boolean
    showBetaBadge?: boolean
}

const SwitchBox = ({ isChecked, onToggle, title, description, rightContent, children, isDisabled, showBetaBadge }: Props) => {
    const titleContent = showBetaBadge ? (
        <Flex alignItems="center" gap={2} marginBottom={1}>
            <Text fontSize={16} fontWeight={500} color="neutral.white">{title}</Text>
            <Badge
                borderRadius={4}
                padding="4px 8px"
                bgColor="neutral.gray.1000"
                color="text.subtext.placeholder.dark"
                fontSize={12}
                fontWeight={500}
                textTransform="capitalize"
            >
                Beta
            </Badge>
        </Flex>
    ) : (
        <Text marginBottom={1} fontSize={16} fontWeight={500} color="neutral.white">{title}</Text>
    )

    const content = (
        <Flex flex={1} alignItems="start" gap={4}>
            <Switch
                size="lg"
                isDisabled={isDisabled}
                isChecked={isChecked}
                onChange={onToggle}
                sx={{
                    ".chakra-switch__track": { width: "42px", height: "20px" },
                    ".chakra-switch__thumb": { width: "20px", height: "100%", background: "neutral.black" }
                }}
            />
            {(title || description || children) &&
                <Flex direction="column">
                    {titleContent}
                    <Text mb={children ? 4 : 0} fontSize={14} color="text.subtext.placeholder.dark">{description}</Text>
                    {children}
                </Flex>
            }
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