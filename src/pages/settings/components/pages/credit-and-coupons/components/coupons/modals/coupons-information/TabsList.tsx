import { Tab, TabList } from '@chakra-ui/react';
import React from 'react'

interface Props {
    tabs: Array<{
        title: string;
        content: any;
    }>
}

export default function TabsList({ tabs }: Props) {
    return (
        <TabList borderBottom={"1px solid #292929"}>
            {tabs.map((tab, index) => {
                return (
                    <Tab
                        aria-selected={"false"}
                        _focusWithin={{
                            background: "transparent",
                            borderBottom: "1px solid #fff",
                        }}
                        _selected={{
                            borderBottom: `1px solid #fff`,
                            color: "#fff",
                            fontWeight: 500,
                        }}
                        color={"#7B7B7B"}
                        fontSize={16}
                        px={6}
                        py={4}
                        key={index}
                        width={"100%"}
                    >
                        {tab.title}
                    </Tab>
                );
            })}
        </TabList>
    )
}
