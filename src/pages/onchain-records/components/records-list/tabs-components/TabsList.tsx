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
        <TabList borderBottom={"none"}>
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
