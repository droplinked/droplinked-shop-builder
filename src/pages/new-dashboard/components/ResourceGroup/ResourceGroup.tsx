import { Flex } from "@chakra-ui/react"
import React from "react"
import SectionContainer, { SectionContainerProps } from "../SectionContainer"
import ResourceItem, { ResourceItemProps } from "./ResourceItem"

interface ResourceGroupProps extends SectionContainerProps {
    title: string
    items: Partial<ResourceItemProps>[]
}

// Used for the Blog and Help Center sections in the Dashboard page.
function ResourceGroup({ title, items }: ResourceGroupProps) {
    return (
        <SectionContainer title={title}>
            <Flex direction="column">
                {items.map((item, index) =>
                    <ResourceItem
                        key={index}
                        title={item.title}
                        description={item.description}
                        isLastItem={index === items.length - 1}
                        link={item.link}
                    />
                )}
            </Flex>
        </SectionContainer>
    )
}

export default ResourceGroup
