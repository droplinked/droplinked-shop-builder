import RuledGrid from "components/redesign/ruled-grid/RuledGrid"
import { DashboardPageLink } from "pages/dashboard/stores/useDashboardStore"
import React from "react"
import SectionContainer, { SectionContainerProps } from "../SectionContainer"
import ResourceItem from "./ResourceItem"

interface Props {
    items: DashboardPageLink[]
    sectionContainerProps: SectionContainerProps
}

// Used for the Blog and Help Center sections in the Dashboard page.
function ResourceCategory({ items, sectionContainerProps }: Props) {
    return (
        <SectionContainer {...sectionContainerProps}>
            <RuledGrid columns={1} nested>
                {items.map((item) => <ResourceItem key={item.title} {...item} />)}
            </RuledGrid>
        </SectionContainer>
    )
}

export default ResourceCategory