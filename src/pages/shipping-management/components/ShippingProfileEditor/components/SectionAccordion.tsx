import { Flex, Text, BoxProps } from '@chakra-ui/react'
import {
    AppAccordionItem,
    AppAccordionTrigger,
    AppAccordionPanel,
    AppAccordionChevron,
} from 'components/redesign/accordion/AppAccordion'
import React, { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren, BoxProps {
    id: string
    title: string
    defaultOpen?: boolean
}

const SectionAccordion = ({ id, title, defaultOpen, children, ...rest }: Props) => (
    <AppAccordionItem itemId={id} defaultOpen={defaultOpen} {...rest}>
        <AppAccordionTrigger
            padding={4}
            backgroundColor="neutral.gray.900"
            borderRadius={8}
            width="full"
        >
            <Flex alignItems="center" justifyContent="space-between" width="full">
                <Text fontSize={16} fontWeight={600} color="neutral.white">
                    {title}
                </Text>
                <AppAccordionChevron />
            </Flex>
        </AppAccordionTrigger>

        <AppAccordionPanel padding={4} width="full">
            {children}
        </AppAccordionPanel>
    </AppAccordionItem>
)

export default React.memo(SectionAccordion)
