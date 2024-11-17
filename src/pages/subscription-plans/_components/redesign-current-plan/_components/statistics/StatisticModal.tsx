import { Button } from '@chakra-ui/react';
import AppIcons from 'assest/icon/Appicons';
import AppModal from 'components/redesign/modal/AppModal';
import ModalHeaderData from 'components/redesign/modal/ModalHeaderData';
import { ShopSubscriptionData } from 'lib/apis/subscription/interfaces';
import React, { useState } from 'react';
interface IProps {
    data: {
        data: ShopSubscriptionData
    };
}
function StatisticModal({ data }: IProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    return (
        <>
            <Button onClick={() => setIsOpen(true)} backgroundColor={"transparent"} border={"1px solid #F2F2F2"} color={"white"}><AppIcons.Statistics style={{ margin: "0px 5px" }} /> View Statistics</Button>
            <AppModal
                modalRootProps={{
                    isOpen,
                    onClose: () => setIsOpen(false),
                    size: "2xl",
                    isCentered: true
                }}
                modalContentProps={{
                    width: { base: "90%", md: "600px" },
                    height: { base: "85vh", md: "95vh" }
                }}>
                <ModalHeaderData
                    title='Statistics'
                    description={`Track your usage and insights here. Some features will reset in 257 days.`}
                />
            </AppModal>
        </>
    );
}

export default StatisticModal;