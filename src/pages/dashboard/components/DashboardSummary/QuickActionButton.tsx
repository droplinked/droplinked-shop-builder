import { Center, Flex } from "@chakra-ui/react"
import { QuickAction } from "pages/dashboard/types/dashboard.types"
import React from "react"
import { useNavigate } from "react-router-dom"

interface Props {
    action: QuickAction
}

function QuickActionButton({ action: { icon, label, url } }: Props) {
    const navigate = useNavigate()

    const handleClick = () => navigate(url)

    return (
        <Flex
            as="button"
            alignItems="center"
            gap={3}
            border="1px solid #292929"
            borderRadius={16}
            padding={4}
            fontSize={{ base: 14, lg: 16 }}
            fontWeight={500}
            color="#fff"
            onClick={handleClick}
        >
            <Center
                as="span"
                borderRadius={8}
                padding={2}
                bgColor="#292929"
                sx={{ svg: { width: 5, height: 5 } }}
            >
                {icon}
            </Center>

            {label}
        </Flex>
    )
}

export default QuickActionButton