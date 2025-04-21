import { Flex } from "@chakra-ui/react";
import React from 'react';

interface TabsListProps {
    tabs: Array<{
        title: string;
        content: any;
        isDisabled?: boolean;
    }>;
}

export function TabsList({ tabs }: TabsListProps) {
    return (
        tabs.map((tab, index) => {
            return (
                <Flex
                    as="button"
                    key={index}
                    width="100%"
                    pb="16px"
                    color="#7B7B7B"
                    fontSize={{ base: "14px", lg: "16px" }}
                    justifyContent="center"
                    _selected={{
                        borderBottom: `1px solid #fff`,
                        color: "#fff",
                        fontWeight: 500,
                    }}
                    _focusWithin={{
                        background: "transparent",
                        borderBottom: "1px solid #fff",
                    }}
                    disabled={tab.isDisabled}
                >
                    {tab.title}
                </Flex>
            )
        })
    )
}