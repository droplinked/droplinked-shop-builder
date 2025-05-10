import { Box, ModalBody } from '@chakra-ui/react';
import AppIcons from 'assets/icon/Appicons';
import AppButton from 'components/redesign/button/AppButton';
import AppModal from 'components/redesign/modal/AppModal';
import ModalHeaderData from 'components/redesign/modal/ModalHeaderData';
import { ShopSubscriptionData } from 'lib/apis/subscription/interfaces';
import React, { useState } from 'react';
import Charts from './_components/Charts';
import UsageExceededAlert from './_components/UsageExceededAlert';
interface IProps {
    data: {
        data: ShopSubscriptionData
    };
}
function StatisticModal({ data }: IProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const UsageExceededItem = data.data.legalUsage.find((item) => item.remaining === 0)
    return (
        <>
            <AppButton
              variant="outlined"
              color="neutral.white"
              borderColor="neutral.white"
              onClick={() => setIsOpen(true)}
              leftIcon={<AppIcons.Statistics />}
            >
              View Statistics
            </AppButton>
            <AppModal
                modalRootProps={{
                    isOpen,
                    onClose: () => setIsOpen(false),
                    size: "2xl",
                    isCentered: true,
                }}
                modalContentProps={{
                    width: { base: "90%", md: "600px" },
                    height: { base: "85vh", md: "95vh" },
                    backgroundColor: "#131313"
                }}>
                <ModalHeaderData
                    modalHeaderProps={{
                        bgColor: "#131313"
                    }}
                    title='Statistics'
                    description={`Track your usage and insights here. Some features will reset in 257 days.`}
                />
                <ModalBody backgroundColor={"#131313"}>
                    {UsageExceededItem &&
                        <Box width={"100%"} pb={"2rem"} borderBottom="1px solid" borderColor="neutral.gray.800">
                            <UsageExceededAlert title={UsageExceededItem.key} />
                        </Box>
                    }
                    <Box width={"100%"} pt={"2rem"}>
                        <Charts data={data} />
                    </Box>
                </ModalBody>
            </AppModal>
        </>
    );
}

export default StatisticModal;