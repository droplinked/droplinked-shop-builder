import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import React, { ReactNode } from "react";

interface TabItem {
    title: string;
    content: ReactNode;
}

interface AppTabProps {
    tabs: TabItem[];
    isDisabled?: boolean;
}

function AppTab({ tabs, isDisabled = false }: AppTabProps) {
    return (
        <Tabs
            variant={"unstyled"}
            width={"100%"}
            borderTop={"1px solid #292929"}
            borderBottom={"none"}
        >
            <TabList borderBottom={"1px solid #292929"}>
                {tabs.map((tab, index) => (
                    <Tab
                        key={index}
                        isDisabled={isDisabled}
                        aria-selected={"false"}
                        _focusWithin={{
                            background: "transparent",
                            borderBottom: "1px solid #fff",
                        }}
                        _selected={{
                            borderBottom: `1px solid #fff`,
                            color: "#fff",
                            fontWeight: 500
                        }}
                        px={6}
                        py={4}
                        color={"#7b7b7b"}
                        fontWeight={400}
                        fontSize={14}
                    >
                        {tab.title}
                    </Tab>
                ))}
            </TabList>
            <TabPanels>
                {tabs.map((tab, index) => (
                    <TabPanel padding={0} key={index}>
                        {tab.content}
                    </TabPanel>
                ))}
            </TabPanels>
        </Tabs>
    );
}

export default AppTab;
