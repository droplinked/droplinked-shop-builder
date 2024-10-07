import { Flex, Image, ModalBody, ModalFooter, ModalHeader } from '@chakra-ui/react'
import AppModal from 'components/redesign/modal/AppModal'
import useAppToast from 'functions/hooks/toast/useToast'
import { deployCircleContract } from 'lib/apis/shop/shopServices'
import useAppStore from 'lib/stores/app/appStore'
import Button from 'pages/invoice-management/components/Button'
import React, { useState } from 'react'
import InformationRow from './InformationRow'
import ModalBodyHeadline from './ModalBodyHeadline'
import WalletSelect from './WalletSelect'
import WalletWarningMessage from './WalletWarningMessage'

interface Props {
    isOpen: boolean
    onClose: () => void
    selectedChain: string
}

export default function CircleRecordModal({ isOpen, onClose, selectedChain }: Props) {
    const [selectedWallet, setSelectedWallet] = useState("")
    const { shop } = useAppStore()
    const { showToast } = useAppToast()
    const isFirstCircleRecord = !shop.deployedContracts.some(
        (contract) => contract.type === selectedChain && contract.isCircle
    )

    const handleRecord = async () => {
        try {
            await deployCircleContract(selectedChain)
            // await recordSKUWithCircleWallet({ chain: selectedChain, params: {} })
        }
        catch (error) {
            showToast({ type: "error", message: "Oops! Something went wrong." })
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
                <ModalBodyHeadline isFirstCircleRecord={isFirstCircleRecord} />

                {isFirstCircleRecord && (
                    <Flex direction="column" gap={4}>
                        <WalletSelect onWalletChange={setSelectedWallet} />
                        <WalletWarningMessage />
                    </Flex>
                )}

                <Flex direction="column" gap={4}>
                    {!isFirstCircleRecord && (
                        <InformationRow
                            title="Target Wallet"
                            value="Circle"
                            tooltip="You have selected your preferred wallet on the first attempt and can no longer change it."
                        />
                    )}
                    <InformationRow title="Gas Fee" value="0.00356" />
                </Flex>
            </ModalBody>

            <ModalFooter
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                gap={{ xl: 6, base: 3 }}
                sx={{ button: { fontWeight: 500 } }}
            >
                <Button variant="ghost" onClick={onClose}>Cancel</Button>
                <Button onClick={handleRecord}>Record</Button>
            </ModalFooter>
        </AppModal>
    )
}