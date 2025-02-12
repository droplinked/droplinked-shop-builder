import { TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import Drawer from 'components/common/Drawer/Drawer'
import React from 'react'
import ActivityTab from './tabs-components/ActivityTab'
import InformationTab from './tabs-components/InformationTab'
import TabsList from './tabs-components/TabsList'
import TransferCard from './TransferCard'
import { ICombinedNft } from 'pages/onchain-records/utils/interface'

interface Props {
    isOpen: boolean
    onClose: () => void
    item: ICombinedNft
}

export default function RecordDetails({ item, isOpen, onClose }: Props) {

    const tabs = [
        {
            title: "Information",
            content: <InformationTab item={item} />
        },
        {
            title: "Activity",
            content: <ActivityTab item={item} />
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
                    <>
                        <TransferCard item={item} />
                        <TabsList tabs={tabs} />
                    </>
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
