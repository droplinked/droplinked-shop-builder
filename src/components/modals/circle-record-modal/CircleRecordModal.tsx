import { Flex, Image, ModalBody, ModalFooter, ModalHeader } from '@chakra-ui/react'
import Button from 'components/redesign/button/Button'
import AppModal from 'components/redesign/modal/AppModal'
import useAppToast from 'functions/hooks/toast/useToast'
import { useCustomNavigate } from 'functions/hooks/useCustomeNavigate/useCustomNavigate'
import { deployCircleContract } from 'lib/apis/shop/shopServices'
import React, { useState } from 'react'
import ModalBodyHeadline from './ModalBodyHeadline'
import WalletSelect from './WalletSelect'
import WalletWarningMessage from './WalletWarningMessage'

interface CircleRecordModalProps {
    isOpen: boolean
    onClose: () => void
    selectedChain: string
    recordFunction?: () => Promise<any>
}

export default function CircleRecordModal({ isOpen, onClose, selectedChain, recordFunction }: CircleRecordModalProps) {
    const [isProcessing, setIsProcessing] = useState(false)
    const [selectedWallet, setSelectedWallet] = useState(null)
    const { showToast } = useAppToast()
    const { shopNavigate } = useCustomNavigate()
    const hasSelectedCircleWallet = !!selectedWallet?.circleChain

    const handleRecordSubmission = async () => {
        try {
            setIsProcessing(true)
            if (hasSelectedCircleWallet) {
                await deployCircleContract(selectedChain)
            }
            else await recordFunction?.()
        }
        catch (error) {
            showToast({ type: "error", message: "Oops! Something went wrong." })
            shopNavigate("products")
        }
        finally {
            setIsProcessing(false)
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
                    alt="Circle Record"
                    width="100%"
                />
            </ModalHeader>

            <ModalBody display="flex" flexDirection="column" gap={9}>
                <ModalBodyHeadline isCircleRecord={isProcessing && hasSelectedCircleWallet} />

                {!isProcessing && (
                    <Flex direction="column" gap={4}>
                        <WalletSelect selectedChain={selectedChain} onWalletChange={setSelectedWallet} />
                        <WalletWarningMessage />
                    </Flex>
                )}
            </ModalBody>

            <ModalFooter
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                gap={{ xl: 6, base: 3 }}
                sx={{ button: { fontWeight: 500 } }}
            >
                <Button variant="secondary" onClick={onClose}>Cancel</Button>
                <Button
                    isDisabled={!selectedWallet || hasSelectedCircleWallet || isProcessing}
                    isLoading={isProcessing}
                    onClick={handleRecordSubmission}
                >
                    Record
                </Button>
            </ModalFooter>
        </AppModal>
    )
}