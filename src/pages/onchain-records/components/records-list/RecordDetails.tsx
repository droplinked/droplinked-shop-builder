import { TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import Drawer from 'components/common/Drawer/Drawer'
import React from 'react'
import ActivityTab from './tabs-components/ActivityTab'
import InformationTab from './tabs-components/InformationTab'
import TabsList from './tabs-components/TabsList'
import TransferCard from './TransferCard'
import { ICombinedNft } from 'pages/onchain-records/utils/interface'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

interface Props {
    isOpen: boolean
    onClose: () => void
    item: ICombinedNft
}

export default function RecordDetails({ item, isOpen, onClose }: Props) {
    const { t } = useLocaleResources("onchainRecords")
    const { tokenId } = item ?? {}

    const tabs = [
        {
            title: t("RecordDetails.information"),
            content: <InformationTab item={item} />
        },
        {
            title: t("RecordDetails.activity"),
            content: <ActivityTab item={item} />,
            isDisabled: !tokenId
        }
    ]

    return (
        <Tabs isLazy={true}>
            <Drawer
                isOpen={isOpen}
                onClose={onClose}
                title={t("RecordDetails.recordDetails")}
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

