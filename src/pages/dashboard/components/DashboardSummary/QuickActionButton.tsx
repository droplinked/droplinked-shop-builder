import { Center, Flex } from "@chakra-ui/react"
import { QuickAction } from "pages/dashboard/types/dashboard.types"
import React from "react"
import { useNavigate } from "react-router-dom"

interface Props {
    action: QuickAction
}

function QuickActionButton({ action }: Props) {
    const navigate = useNavigate()

    const { icon, label, url } = action
    const handleClick = () => navigate(url)

    return (
        <Flex
            as="button"
            alignItems="center"
            gap={3}
            border="1px solid"
            borderColor="neutral.gray.800"
            borderRadius={16}
            padding={4}
            fontSize={{ base: 14, xl: 16 }}
            fontWeight={500}
            color="text.white"
            onClick={handleClick}
        >
            <Center borderRadius={8} padding={2} bgColor="neutral.gray.800">
                {icon}
            </Center>

            {label}
        </Flex>
    )
}

export default QuickActionButton