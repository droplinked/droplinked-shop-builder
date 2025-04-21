import { Flex, useDisclosure } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import Button from 'components/redesign/button/Button'
import PageGrid from 'components/redesign/page-grid/PageGrid'
import React from 'react'
import Records from './records/Records'
import ConnectWalletModal from './components/ConnectWalletModal'
import { OnchainRecordsProvider } from './context/OnchainRecordsContext'

export default function OnchainRecords() {
    const { onClose, isOpen, onOpen } = useDisclosure()

    return (
        <OnchainRecordsProvider>
            <PageGrid.Root>
                <PageGrid.Header
                    title="Onchain Records"
                    description="View inventory records and onchain activity."
                    rightContent={
                        <Flex>
                            <Button
                                fontSize={14}
                                fontWeight={500}
                                iconSpacing="6px"
                                paddingInline="14px"
                                leftIcon={<AppIcons.Wallet width="20px" height="20px" />}
                                sx={{ path: { stroke: "#000" } }}
                                onClick={onOpen}
                            >
                                Connect Wallet
                            </Button>
                        </Flex>
                    }
                />

                <PageGrid.Content>
                    <Records />
                </PageGrid.Content>

                <ConnectWalletModal isOpen={isOpen} onClose={onClose} />
            </PageGrid.Root>
        </OnchainRecordsProvider>
    )
}
