import { Flex } from '@chakra-ui/react'
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
                bgColor="#1C1C1C"
                padding="12px 16px"
                userSelect="none"
            >
                <Flex
                    flex={1}
                    alignItems="center"
                    gap={4}
                    fontSize={18}
                    fontWeight={700}
                    color="#fff"
                >
                    {label}
                    {accessLevel && <AccessLevelBadge level={accessLevel} />}
                </Flex>
                <AppAccordionChevron width="24px" height="24px" />
            </AppAccordionTrigger>

            <AppAccordionPanel
                display="flex"
                flexDirection="column"
                gap={9}
                mt={9}
                paddingInline={4}
            >
                {children}
            </AppAccordionPanel>
        </AppAccordionItem>
    )
}

export default ProductFormAccordion