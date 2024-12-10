import { AppAccordionChevron, AppAccordionItem, AppAccordionPanel, AppAccordionTrigger } from 'components/redesign/accordion/AppAccordion'
import React, { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
    label: string
}

function ProductFormAccordion({ label, children }: Props) {
    return (
        <AppAccordionItem itemId={label}>
            <AppAccordionTrigger
                borderRadius={8}
                bgColor="#1C1C1C"
                padding="12px 16px"
                fontSize={18}
                fontWeight={700}
                color="#fff"
                userSelect="none"
            >
                {label}
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