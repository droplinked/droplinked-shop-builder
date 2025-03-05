import { Box, Flex, useDisclosure } from '@chakra-ui/react';
import AppIcons from 'assets/icon/Appicons';
import AppTypography from 'components/common/typography/AppTypography';
import { useCheckPermission } from 'lib/stores/app/appStore';
import React, { useState } from 'react';
import ConfirmationModal from './ConfirmationModal';
import ClientIdDisplay from './ClientIdDisplay';

interface Props {
    domains: string[];
    clientId: string;
    refetch: () => void;
}

export default function Domains({ domains, clientId, refetch }: Props) {
    const [selectedDomain, setSelectedDomain] = useState("")
    const checkPermissionAndShowToast = useCheckPermission()
    const { isOpen, onClose, onOpen } = useDisclosure()

    const handleDeleteDomain = (domain: string) => {
        if (!checkPermissionAndShowToast("shopfront_apis")) return
        setSelectedDomain(domain)
        onOpen()
    }

    return (
        <Flex gap={3} flexDirection={"column"} width={"100%"}>
            {domains?.map((domain, index) => (
                <Flex key={index} borderRadius={"8px"} border={"1px solid"} borderColor="neutral.gray.800" p={4} justifyContent={"space-between"} alignItems={"center"}>
                    <Flex flexDirection={"column"} gap={2}>
                        <AppTypography fontSize={"16px"} fontWeight={"500"} color={"neutral.white"}>
                            {domain}
                        </AppTypography>
                        <ClientIdDisplay clientId={clientId} />
                    </Flex>
                    <Box cursor={"pointer"} onClick={() => handleDeleteDomain(domain)}>
                        <AppIcons.RedTrash />
                    </Box>
                </Flex>
            ))}
            <ConfirmationModal
                selectedDomain={selectedDomain}
                isOpen={isOpen}
                onClose={onClose}
                refetch={refetch}
                domains={domains}
            />
        </Flex>
    )
}
