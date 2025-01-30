import React from 'react';
import { Tab, TabList } from '@chakra-ui/react';

interface Props {
    tabs: { title: string; content: React.ReactNode }[];
}

export default function TabsList({ tabs }: Props) {
    return (
        <TabList borderBottom={"none"}>
            {tabs.map((tab) => (
                <Tab
                    key={tab.title}
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
                    fontSize={14}
                    width={"100%"}
                >
                    {tab.title}
                </Tab>
            ))}
        </TabList>
    );
}
