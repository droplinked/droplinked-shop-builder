import { Center, LinkBox } from "@chakra-ui/react"
import { QuickAction } from "pages/dashboard/types/dashboard.types"
import React from "react"
import { Link as RouterLink } from "react-router-dom"

interface Props {
    action: QuickAction
}

function QuickActionButton({ action }: Props) {
    const { icon, label, url } = action

    return (
        <LinkBox
            as={RouterLink}
            to={url}
            display="flex"
            alignItems="center"
            gap={3}
            border="1px solid"
            borderColor="neutral.gray.800"
            borderRadius={16}
            padding={4}
            fontSize={{ base: 14, xl: 16 }}
            fontWeight={500}
            color="text.white"
        >
            <Center borderRadius={8} padding={2} bgColor="neutral.gray.800">
                {icon}
            </Center>

            {label}
        </LinkBox>
    )
}

export default QuickActionButton