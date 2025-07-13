import { Tab, TabList } from "@chakra-ui/react"
import React from 'react'

interface TabsListProps {
    tabs: Array<{
        title: string
        content: any
        isDisabled?: boolean
    }>
}

export function TabsList({ tabs }: TabsListProps) {
    return (
        <TabList borderBottom="none" width="100%">
            {tabs.map((tab, index) => {
                return (
                    <Tab
                        key={index}
                        width="100%"
                        pb="16px"
                        color="#7B7B7B"
                        fontSize={{ base: "14px", lg: "16px" }}
                        _selected={{
                            borderBottom: `1px solid #fff`,
                            color: "#fff",
                            fontWeight: 500,
                        }}
                        _focusWithin={{
                            background: "transparent",
                            borderBottom: "1px solid #fff",
                        }}
                        isDisabled={tab.isDisabled}
                        aria-selected="false"
                    >
                        {tab.title}
                    </Tab>
                )
            })}
        </TabList>
    )
}