import React from 'react';
import { Coupon } from '../../interface';
import AppModal from 'components/redesign/modal/AppModal';
import ModalHeaderData from 'components/redesign/modal/ModalHeaderData';
import { ModalBody, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import InformationTab from './tabs/InformationTab';
import ModalHeaderContent from './ModalHeaderContent';
import TabsList from './TabsList';
import CodesTab from './tabs/CodesTab';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    coupon: Coupon;
}

export default function CouponsInformationModal({ isOpen, onClose, coupon }: Props) {
    const { createdAt, isExpired, name } = coupon
    const tabs = [
        {
            title: "Information",
            content: <InformationTab coupon={coupon} />
        },
        {
            title: "Codes",
            content: <CodesTab coupon={coupon} onClose={onClose} />
        },
    ];

    return (
        <AppModal modalRootProps={{ isOpen, onClose, isCentered: true, size: "2xl" }} modalContentProps={{ background: "#141414" }}>
            <Tabs variant={"unstyled"} width={"100%"} borderBottom={"none"}>
                <ModalHeaderData
                    backgroundColor='#141414'
                    modalHeaderProps={{ px: { lg: "48px !important", md: "32px !important", base: "16px !important" }, padding: "0px", paddingBlock: "0px" }}
                    title={name}
                    description=''
                >
                    <ModalHeaderContent createdAt={createdAt} isExpired={isExpired} />
                    <TabsList tabs={tabs} />
                </ModalHeaderData>
                <ModalBody>
                    <TabPanels width={"100%"}>
                        {tabs.map((tab, index) => (
                            <TabPanel py={9} px={0} key={index}>
                                {tab.content}
                            </TabPanel>
                        ))}
                    </TabPanels>
                </ModalBody>
            </Tabs>
        </AppModal>
    )
}
