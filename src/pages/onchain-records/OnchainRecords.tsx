import { useDisclosure } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import PageGrid from 'components/redesign/page-grid/PageGrid'
import React from 'react'
import ConnectWalletModal from './components/connect-wallets-modal/ConnectWalletModal'
import { OnchainRecordsProvider } from './context/OnchainRecordsContext'
import Records from './records/Records'
import enLocale from "locales/onchain-records/en.json"
import arLocale from "locales/onchain-records/ar.json"
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

export default function OnchainRecords() {
    const { t } = useLocaleResources("onchainRecords", {
        en: enLocale,
        ar: arLocale
    })

    const { onClose, isOpen, onOpen } = useDisclosure()

    return (
        <OnchainRecordsProvider>
            <PageGrid.Root>
                <PageGrid.Header
                    title={t("onChain_Page_Title")}
                    description={t("onChain_Page_Description")}
                    actionButtons={[
                        {
                            title: t("connect_wallet"),
                            onClick: onOpen,
                            fontSize: 14,
                            fontWeight: 500,
                            iconSpacing: "6px",
                            paddingInline: "14px",
                            leftIcon: <AppIcons.Wallet width="20px" height="20px" />,
                            sx: { path: { stroke: "#000" } },
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
