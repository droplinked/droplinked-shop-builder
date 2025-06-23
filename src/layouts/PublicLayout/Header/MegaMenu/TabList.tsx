import { Flex } from '@chakra-ui/react'
import React from 'react'
import TabButton from './TabButton'

interface Props {
    items: Array<{
        label: string
        icon: (props: { color: string }) => React.ReactElement
    }>
    activeTab: number
    onTabChange: (index: number) => void
}

function TabList({ items, activeTab, onTabChange }: Props) {
    return (
        <Flex
            width="354px"
            direction="column"
            gap={2}
            borderRight="1px solid"
            borderColor="neutral.gray.900"
            padding={{ xl: 4, "2xl": 6 }}
            bgColor="neutral.websiteBackground"
        >
            {items.map((item, index) => (
                <TabButton
                    key={item.label}
                    item={item}
                    isActive={activeTab === index}
                    onClick={() => onTabChange(index)}
                />
            ))}
        </Flex>
    )
}

export default TabList