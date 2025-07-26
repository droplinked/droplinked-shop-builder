import { Flex, TabPanel, TabPanels, Tabs, useMediaQuery } from '@chakra-ui/react';
import AppIcons from 'assets/icon/Appicons';
import Drawer from 'components/common/Drawer/Drawer';
import AppButton from 'components/redesign/button/AppButton';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import { TabsList } from 'pages/purchase-history/components/drawer-components/TabList';
import React, { useState } from 'react';
import { ShopSubscriptionData } from 'services/subscription/interfaces';
import CurrentPlanBanner from './components/CurrentPlanBanner';
import DetailsTab from './components/DetailsTab';
import StatisticTab from './components/StatisticTab';

interface IProps {
    data: ShopSubscriptionData
}

function StatisticModal({ data }: IProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const currentPlan = data.subscriptionId.type
    const status = data.status
    const [isSmallerThan768] = useMediaQuery("(max-width: 768px)");
    const { t, isRTL } = useLocaleResources('subscription');

    const tabs = [
        {
            title: t('StatisticModal.tabs.statistics'),
            content: <StatisticTab data={data} />
        },
        {
            title: t('StatisticModal.tabs.details'),
            content: <DetailsTab data={data} />
        }
    ]

    return (
        <>
            <AppButton
                variant="outlined"
                color="neutral.white"
                borderColor="neutral.gray.800"
                onClick={() => setIsOpen(true)}
                leftIcon={<AppIcons.Statistics />}
            >
                {t('StatisticModal.manageSubscription')}
            </AppButton>

            <Tabs variant="unstyled" width="100%">
                <Drawer
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    title={t('StatisticModal.title')}
                    placement={isSmallerThan768 ? "bottom" : isRTL ? "left" : "right"}
                    description={t('StatisticModal.description')}
                    headerContent={
                        <Flex width="100%" flexDirection="column" gap={6}>
                            <CurrentPlanBanner currentPlan={currentPlan} status={status} />
                            <TabsList tabs={tabs} />
                        </Flex>
                    }
                    drawerHeaderStyle={{
                        padding: { base: "16px 16px 0px 16px", md: "36px 36px 0px 36px" },
                        background: "#141414"
                    }}
                >
                    <TabPanels height="full" background="#1c1c1c">
                        {tabs.map((tab, index) => (
                            <TabPanel
                                key={index}
                                background="#1c1c1c"
                                p={{ base: 4, md: 9 }}
                            >
                                {tab.content}
                            </TabPanel>
                        ))}
                    </TabPanels>
                </Drawer>
            </Tabs>
        </>
    );
}

export default StatisticModal;