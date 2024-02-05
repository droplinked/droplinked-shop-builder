import { Flex, useDisclosure } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import ClipboardText from 'components/common/clipboardText/ClipboardText'
import AppTypography from 'components/common/typography/AppTypography'
import React, { useContext, useState } from 'react'
import APIKeyContext from '../../context'
import ConfirmDomainDeletion from '../confirm-domain-deletion/ConfirmDomainDeletion'
import ShopAPIKeySkeleton from '../loading/ShopAPIKeySkeleton'

function RemoveAPIKey() {
    const [selectedDomain, setSelectedDomain] = useState("")
    const { getShopAPIKey, fetchedData } = useContext(APIKeyContext)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const openConfirmationDialog = (domain: string) => {
        if (fetchedData?.domains.length === 1) return
        setSelectedDomain(domain)
        onOpen()
    }

    return (
        <>
            {getShopAPIKey.isLoading ?
                <ShopAPIKeySkeleton /> :
                fetchedData && <>
                    <Flex direction={"column"} gap={"12px"}>
                        <AppTypography fontSize='16px' fontWeight={500} color={"#C2C2C2"}>Your domains</AppTypography>
                        {fetchedData.domains.map((domain, index) =>
                            <Flex key={index} justifyContent={"space-between"} alignItems={"center"}>
                                <AppTypography fontSize='16px' color={"#C2C2C2"}>{domain}</AppTypography>
                                <AppIcons.RedTrash
                                    cursor={fetchedData?.domains.length === 1 ? "not-allowed" : "pointer"}
                                    onClick={() => openConfirmationDialog(domain)} />
                            </Flex>
                        )}
                    </Flex>

                    <Flex direction={"column"} gap={"12px"}>
                        <AppTypography fontSize='16px' fontWeight={500} color={"#C2C2C2"}>API KEY</AppTypography>
                        <Flex justifyContent={"space-between"} alignItems={"center"}>
                            <AppTypography fontSize='16px' color={"#C2C2C2"}>
                                {fetchedData.clientId}
                            </AppTypography>
                            <ClipboardText text={fetchedData.clientId} />
                        </Flex>
                    </Flex>
                </>
            }
            {isOpen && <ConfirmDomainDeletion isOpen={isOpen} close={onClose} selectedDomain={selectedDomain} />}
        </>
    )
}

export default RemoveAPIKey