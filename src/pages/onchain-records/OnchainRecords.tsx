import { useDisclosure } from '@chakra-ui/react'
import { WalletMd } from 'assets/icons/Finance/Wallet/WalletMd'
import PageGrid from 'components/redesign/page-grid/PageGrid'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import arLocale from "locales/onchain-records/ar.json"
import enLocale from "locales/onchain-records/en.json"
import React from 'react'
import ConnectWalletModal from './components/connect-wallets-modal/ConnectWalletModal'
import { OnchainRecordsProvider } from './context/OnchainRecordsContext'
import Records from './records/Records'

export default function OnchainRecords() {
    const { onClose, isOpen, onOpen } = useDisclosure()
    const { t } = useLocaleResources("onchainRecords", { en: enLocale, ar: arLocale })

    return (
        <OnchainRecordsProvider>
            <PageGrid.Root>
                <PageGrid.Header
                    title={t("onChain_Page_Title")}
                    description={t("onChain_Page_Description")}
                    actionButtons={[
                        {
                            title: t("connect_wallet"),
                            leftIcon: <WalletMd />,
                            onClick: onOpen,
                        }
                    ]}
                />

                <PageGrid.Content>
                    <Records />
                </PageGrid.Content>

                <ConnectWalletModal isOpen={isOpen} onClose={onClose} />
            </PageGrid.Root>
        </OnchainRecordsProvider>
    )
}
