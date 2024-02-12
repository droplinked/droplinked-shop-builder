import { Flex, FlexProps } from '@chakra-ui/layout';
import AppIcons from 'assest/icon/Appicons';
import BasicButton from 'components/common/BasicButton/BasicButton';
import ClipboardText from 'components/common/clipboardText/ClipboardText';
import AppModal from 'components/common/modal/AppModal';
import AppTypography from 'components/common/typography/AppTypography';
import { ShopDNSInformation } from 'lib/apis/shop/interfaces';
import { getShopDNSStatusService } from 'lib/apis/shop/shopServices';
import React, { ReactNode, useMemo, useState } from 'react';
import { useMutation } from 'react-query';

interface Props {
    isOpen: boolean;
    close: Function;
    dnsData: any;
}

function DNSInformationModal({ isOpen, close, dnsData }: Props) {
    const [visibleButton, setButtonVisibility] = useState(true)
    const { isLoading, data, mutate } = useMutation((params: ShopDNSInformation) => getShopDNSStatusService(params), {
        onSuccess: (response) => {
            if (response.data.data.status === "Finalized") setButtonVisibility(false)
        }
    })
    const response = useMemo(() => data?.data?.data, [data])
    const statusMap: { [key: string]: { containerProperties: FlexProps, icon: ReactNode } } = {
        "Finalized": { containerProperties: { borderColor: "#2BCFA1", color: "#2BCFA1" }, icon: <AppIcons.GreenAlert /> },
        "NSsetup": { containerProperties: { borderColor: "#F6C30D", color: "#F6C30D" }, icon: <AppIcons.YellowAlert /> },
        "Failed": { containerProperties: { borderColor: "#E63F43", color: "#FFFFFF", backgroundColor: "#E63F43" }, icon: <AppIcons.WhiteAlert /> },
    };

    return (
        <AppModal open={isOpen} close={close} isCentered={true} contentProps={{ padding: 8 }}>
            <Flex direction={"column"} gap={"36px"}>
                <AppTypography fontSize={"16px"} fontWeight={600} color={"#FFFFFF"}>DNS Information</AppTypography>

                <Flex direction={"column"} gap={"12px"}>
                    {dnsData?.NS_records.map((dns, index) =>
                        <Flex key={index} justifyContent={"space-between"} alignItems={"center"}>
                            <AppTypography fontSize={"14px"} color="#C2C2C2">DNS {index + 1}</AppTypography>
                            <Flex alignItems={"center"} gap="16px">
                                <AppTypography fontSize={"14px"} fontWeight={500} color="#FFFFFF">{dns}</AppTypography>
                                <ClipboardText text={dns} />
                            </Flex>
                        </Flex>
                    )}
                </Flex>

                <Flex direction={"column"} gap={"16px"}>
                    {visibleButton && <BasicButton
                        sizes='medium'
                        isLoading={isLoading}
                        onClick={() => mutate({ domain_name: dnsData?.domain_name })}>
                        Check DNS Status
                    </BasicButton>}

                    {response &&
                        <Flex alignItems={"center"} gap={"8px"} padding="16px" border={"1px solid"} borderRadius={"8px"} {...statusMap[response.status].containerProperties}>
                            {statusMap[response.status].icon}
                            <AppTypography fontSize={"14px"}>{response.message}</AppTypography>
                        </Flex>
                    }
                </Flex>
            </Flex >
        </AppModal >
    )
}

export default DNSInformationModal