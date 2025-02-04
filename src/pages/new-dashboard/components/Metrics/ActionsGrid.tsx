import { Center, Flex, Grid } from '@chakra-ui/react'
import { Action } from 'pages/new-dashboard/types/Metrics'
import React from 'react'

interface ActionsGridProps {
    actions: Action[]
}

export default function ActionsGrid({ actions }: ActionsGridProps) {
    return (
        <Grid
            templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
            gap={{ base: 4, xl: 6 }}
        >
            {actions.map((action) => <ActionButton key={action.label} action={action} />)}
        </Grid>
    )
}

function ActionButton({ action }: { action: Action }) {
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
            onClick={action.onClick}
        >
            <Center
                borderRadius={8}
                padding={2}
                bgColor="#292929"
                sx={{ svg: { width: 5, height: 5 } }}
            >
                {action.icon}
            </Center>
            {action.label}
        </Flex>
    )
}