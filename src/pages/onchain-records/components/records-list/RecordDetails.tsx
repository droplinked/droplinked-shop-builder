import { TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import Drawer from 'components/common/Drawer/Drawer'
import React from 'react'
import ActivityTab from './tabs-components/ActivityTab'
import InformationTab from './tabs-components/InformationTab'
import TabsList from './tabs-components/TabsList'

interface Props {
    isOpen: boolean
    onClose: () => void
}

export default function RecordDetails({ isOpen, onClose }: Props) {

    const tabs = [
        {
            title: "Information",
            content: <InformationTab />
        },
        {
            title: "Activity",
            content: <ActivityTab />
        }
    ]

    return (
        <Tabs isLazy={true}>
            <Drawer
                isOpen={isOpen}
                onClose={onClose}
                title='Record Details'
                drawerHeaderStyle={{ padding: 0, px: 9, py: 9, paddingBottom: 0 }}
                headerContent={
                    <TabsList tabs={tabs} />
                }
            >
                <TabPanels>
                    {tabs.map((tab) => (
                        <TabPanel py={9} px={9} key={tab.title}>
                            {tab.content}
                        </TabPanel>
                    ))}
                </TabPanels>
            </Drawer>
        </Tabs>
    )
}
