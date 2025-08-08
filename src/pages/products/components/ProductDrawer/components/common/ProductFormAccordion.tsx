import { Flex, Heading } from '@chakra-ui/react'
import AccessLevelBadge, { AccessLevelBadgeProps } from 'components/redesign/access-level-badge/AccessLevelBadge'
import { AppAccordionChevron, AppAccordionItem, AppAccordionPanel, AppAccordionTrigger } from 'components/redesign/accordion/AppAccordion'
import React, { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
    label: string
    accessLevel?: AccessLevelBadgeProps['level']
    defaultOpen?: boolean
}

function ProductFormAccordion({ label, accessLevel, defaultOpen = false, children }: Props) {
    return (
        <AppAccordionItem itemId={label} defaultOpen={defaultOpen}>
            <AppAccordionTrigger
                display="flex"
                justifyContent="space-between"
                borderRadius={8}
                padding="12px 16px"
                bgColor="neutral.gray.1000"
                userSelect="none"
            >
                <Flex flex={1} alignItems="center" gap={4}>
                    <Heading as="h3" fontSize={18} fontWeight={700} color="text.white">
                        {label}
                    </Heading>
                    {accessLevel && <AccessLevelBadge level={accessLevel} />}
                </Flex>
                <AppAccordionChevron />
            </AppAccordionTrigger>

            <AppAccordionPanel
                display="flex"
                flexDirection="column"
                gap={9}
                padding="36px 16px"
            >
                {children}
            </AppAccordionPanel>
        </AppAccordionItem>
    )
}

export default ProductFormAccordion