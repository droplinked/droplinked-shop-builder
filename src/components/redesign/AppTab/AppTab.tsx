import { Tab, TabList, TabListProps, TabPanel, TabPanelProps, TabPanels, TabPanelsProps, Tabs, TabsProps } from "@chakra-ui/react";
import React, { ReactNode } from "react";

interface TabItem {
    title: string;
    content: ReactNode;
}

interface AppTabProps {
    tabs: TabItem[];
    isDisabled?: boolean;
    isLazy?: boolean;
    tabsStyle?: TabsProps,
    tabListStyle?: TabListProps,
    tabPanelsStyle?: TabPanelsProps,
    tabPanelStyle?: TabPanelProps,
}

function AppTab({ tabs, isDisabled = false, isLazy, tabsStyle, tabListStyle, tabPanelStyle, tabPanelsStyle }: AppTabProps) {
    return (
        <Tabs
            variant={"unstyled"}
            width={"100%"}
            borderTop={"1px solid #292929"}
            borderBottom={"none"}
            isLazy={isLazy || false}
            {...tabsStyle}
        >
            <TabList borderBottom={"1px solid #292929"} {...tabListStyle}>
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
            <TabPanels {...tabPanelsStyle}>
                {tabs.map((tab, index) => (
                    <TabPanel padding={0} key={index} {...tabPanelStyle}>
                        {tab.content}
                    </TabPanel>
                ))}
            </TabPanels>
        </Tabs>
    );
}

export default AppTab;
