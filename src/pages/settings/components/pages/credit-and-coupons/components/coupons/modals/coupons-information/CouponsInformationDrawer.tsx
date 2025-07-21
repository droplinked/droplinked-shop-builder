import React from 'react';
import { Coupon } from '../../interface';
import { TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import InformationTab from './tabs/InformationTab';
import DrawerHeaderContent from './DrawerHeaderContent';
import TabsList from './TabsList';
import CodesTab from './tabs/CodesTab';
import Drawer from 'components/common/Drawer/Drawer';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    coupon: Coupon;
}

export default function CouponsInformationDrawer({ isOpen, onClose, coupon }: Props) {
    const { t } = useLocaleResources('settings');
    const { createdAt, isExpired, name } = coupon
    const tabs = [
        {
                            title: t("Coupons.information.tabs.information"),
            content: <InformationTab coupon={coupon} />
        },
        {
                            title: t("Coupons.information.tabs.codes"),
            content: <CodesTab coupon={coupon} onClose={onClose} />
        },
    ];

    return (
        <Tabs>
            <Drawer
                isOpen={isOpen}
                onClose={onClose}
                title={name}
                headerContent={
                    <>
                        <DrawerHeaderContent createdAt={createdAt} isExpired={isExpired} />
                        <TabsList tabs={tabs} />
                    </>
                }
                discardButtonText={t("Coupons.information.close")}
                saveButtonText={t("Coupons.information.saveChanges")}
                drawerHeaderStyle={{ padding: 0, px: 9, py: 9, paddingBottom: 0 }}
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
