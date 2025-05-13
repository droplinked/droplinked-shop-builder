import { Tab, TabList, TabListProps, TabPanel, TabPanelProps, TabPanels, TabPanelsProps, TabProps, Tabs, TabsProps } from "@chakra-ui/react";
import React, { ReactNode } from "react";

/**
 * A tabbed interface component with customizable styling
 *  
 * @param {object} props - Component props
 * @param {TabItem[]} props.tabs - Array of tab items with title and content
 * @param {boolean} [props.isDisabled=false] - Whether all tabs are disabled
 * @param {boolean} [props.isLazy=false] - Whether to render tab panels only when they're selected
 * @param {Omit<TabsProps, 'children'>} [props.tabsStyle] - Custom styles for the Tabs wrapper
 * @param {TabListProps} [props.tabListStyle] - Custom styles for the TabList
 * @param {TabPanelsProps} [props.tabPanelsStyle] - Custom styles for the TabPanels wrapper
 * @param {TabPanelProps} [props.tabPanelStyle] - Custom styles for each TabPanel
 * @param {TabProps} [props.tabStyle] - Custom styles for each Tab button
 * 
 * @returns {JSX.Element} Tabbed interface component
 */
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

const defaultStyles = {
    border: {
        borderColor: "#292929",
    },
    tab: {
        focus: {
            background: "transparent",
            borderBottom: "1px solid #fff",
        },
        selected: {
            borderBottom: "1px solid #fff",
            color: "#fff",
            fontWeight: 500
        },
        default: {
            px: 6,
            py: 4,
            color: "#7b7b7b",
            fontWeight: 400,
            fontSize: 14,
        }
    }
} as const;

function AppTab({
    tabs,
    isDisabled = false,
    isLazy = false,
    tabsStyle,
    tabListStyle,
    tabPanelStyle,
    tabPanelsStyle,
    tabStyle
}: AppTabProps) {
    return (
        <Tabs
            variant="unstyled"
            width="100%"
            borderTop={`1px solid ${defaultStyles.border.borderColor}`}
            borderBottom="none"
            isLazy={isLazy}
            {...tabsStyle}
        >
            <TabList
                borderBottom={`1px solid ${defaultStyles.border.borderColor}`}
                {...tabListStyle}
            >
                {tabs.map((tab, index) => (
                    <Tab
                        key={index}
                        isDisabled={isDisabled}
                        _focusWithin={defaultStyles.tab.focus}
                        _selected={defaultStyles.tab.selected}
                        {...defaultStyles.tab.default}
                        {...tabStyle}
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