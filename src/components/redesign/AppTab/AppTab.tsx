import { Tab, TabList, TabListProps, TabPanel, TabPanelProps, TabPanels, TabPanelsProps, TabProps, Tabs, TabsProps } from "@chakra-ui/react";
import React, { ReactNode } from "react";

interface TabItem {
    title: string;
    content: ReactNode;
}

interface AppTabProps {
    tabs: TabItem[];
    isDisabled?: boolean;
    isLazy?: boolean;
    tabsStyle?: Omit<TabsProps, 'children'>;
    tabListStyle?: TabListProps;
    tabPanelsStyle?: TabPanelsProps;
    tabPanelStyle?: TabPanelProps;
    tabStyle?: TabProps;
}

function AppTab({
    tabs,
    isDisabled = false,
    isLazy,
    tabsStyle,
    tabListStyle,
    tabPanelStyle,
    tabPanelsStyle,
    tabStyle
}: AppTabProps) {

    // TODO: Set default value for isLazy directly in destructuring: e.g., isLazy = false.
    // TODO: Extract repeated inline styles (like borderBottom) into separate constants or a styles object for consistency.

    return (
        <Tabs
            variant="unstyled"
            width="100%"
            borderTop="1px solid #292929"
            borderBottom="none"
            isLazy={isLazy || false}  // TODO: Remove this fallback; default value should be set in destructuring.
            {...tabsStyle}           // TODO: Ensure tabsStyle spreading is necessary. Make sure it doesn't override essential props unintentionally.
        >
            <TabList borderBottom="1px solid #292929" {...tabListStyle}>
                {tabs.map((tab, index) => (
                    // TODO: Extract this Tab rendering logic into a new CustomTab component for cleaner code
                    <Tab
                        key={index}
                        isDisabled={isDisabled}
                        aria-selected="false"  // TODO: Remove `aria-selected`, Chakra UI handles this internally.
                        _focusWithin={{
                            background: "transparent",
                            borderBottom: "1px solid #fff",
                        }}
                        _selected={{
                            borderBottom: "1px solid #fff",
                            color: "#fff",
                        }}
                        px={6}
                        py={4}
                        {...tabStyle}  // TODO: Ensure tabStyle prop is being spread intentionally.
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