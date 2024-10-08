import { Flex, Image, ModalBody, ModalFooter, ModalHeader } from '@chakra-ui/react'
import AppModal from 'components/redesign/modal/AppModal'
import useAppToast from 'functions/hooks/toast/useToast'
import { useCustomNavigate } from 'functions/hooks/useCustomeNavigate/useCustomNavigate'
import { deployCircleContract } from 'lib/apis/shop/shopServices'
import Button from 'pages/invoice-management/components/Button'
import React, { useEffect, useState } from 'react'
import ModalBodyHeadline from './ModalBodyHeadline'
import WalletSelect from './WalletSelect'
import WalletWarningMessage from './WalletWarningMessage'

interface Props {
    isOpen: boolean
    onClose: () => void
    selectedChain: string
    recordFunction?: () => Promise<any>
}

export default function CircleRecordModal({ isOpen, onClose, selectedChain, recordFunction }: Props) {
    const [isLoading, setLoading] = useState(false)
    const [hasSelectedCircleWallet, setHasSelectedCircleWallet] = useState(false)
    const [selectedWallet, setSelectedWallet] = useState(null)
    const { showToast } = useAppToast()
    const { shopNavigate } = useCustomNavigate()

    useEffect(() => {
        if (selectedWallet) {
            setHasSelectedCircleWallet(selectedWallet.circleChain ? true : false)
        }
    }, [selectedWallet, setHasSelectedCircleWallet])

    const handleRecord = async () => {
        try {
            setLoading(true)
            if (hasSelectedCircleWallet) {
                await deployCircleContract(selectedChain)
                // await recordSKUWithCircleWallet({ chain: selectedChain, params: {} })
                return
            }
            else await recordFunction()
        }
        catch (error) {
            showToast({ type: "error", message: "Oops! Something went wrong." })
            shopNavigate("products")
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <AppModal
            modalRootProps={{ isOpen, onClose, isCentered: true, size: "2xl" }}
            modalContentProps={{ width: "625px", paddingTop: "0px !important" }}
        >
            <ModalHeader paddingInline="0px !important">
                <Image
                    src='https://upload-file-droplinked.s3.amazonaws.com/80d827e5a60a6aa63e024c12d5895140147ae29e7730ab098f69b3122815979e.png'
                    alt="Circle Record Image"
                    width="100%"
                />
            </ModalHeader>

            <ModalBody display="flex" flexDirection="column" gap={9}>
                <ModalBodyHeadline isCircleRecord={isLoading && hasSelectedCircleWallet} />

                {!isLoading && (
                    <Flex direction="column" gap={4}>
                        <WalletSelect selectedChain={selectedChain} onWalletChange={setSelectedWallet} />
                        <WalletWarningMessage />
                    </Flex>
                )}

                {/* <Flex direction="column" gap={4}>
                    {isLoading && (
                        <InformationRow
                            title="Target Wallet"
                            value={`${selectedWallet?.walletAddress?.slice(0, 20)}...`}
                            tooltip="You have selected your preferred wallet on the first attempt and can no longer change it."
                        />
                    )}
                    <InformationRow title="Gas Fee" value="0.00356" />
                </Flex> */}
            </ModalBody>

            <ModalFooter
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                gap={{ xl: 6, base: 3 }}
                sx={{ button: { fontWeight: 500 } }}
            >
                <Button variant="ghost" onClick={onClose}>Cancel</Button>
                <Button
                    isDisabled={!selectedWallet || hasSelectedCircleWallet || isLoading}
                    isLoading={isLoading}
                    onClick={handleRecord}
                >
                    Record
                </Button>
            </ModalFooter>
        </AppModal>
    )
}