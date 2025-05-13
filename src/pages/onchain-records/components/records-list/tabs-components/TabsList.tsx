import { Tab, TabList } from '@chakra-ui/react';
import React from 'react'

interface Props {
    tabs: Array<{
        title: string;
        content: any;
        isDisabled?: boolean;
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
                        color={"text.subtext.placeholder.dark"}
                        fontSize={{ base: "14px", lg: "16px" }}
                        key={index}
                        width={"100%"}
                        pb={"14px"}
                        isDisabled={tab.isDisabled}
                    >
                        {tab.title}
                    </Tab>
                );
            })}
        </TabList>
    )
}
