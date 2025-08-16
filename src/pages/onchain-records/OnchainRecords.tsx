import { useDisclosure } from '@chakra-ui/react'
import { WalletMd } from 'assets/icons/Finance/Wallet/WalletMd'
import PageGrid from 'components/redesign/page-grid/PageGrid'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import UpgradePlanModalContainer from 'components/modals/upgrade-plan-modal/UpgradePlanModalContainer'
import useUpgradeHandler from 'hooks/subscription/useUpgradeHandler'
import arLocale from "locales/onchain-records/ar.json"
import enLocale from "locales/onchain-records/en.json"
import React from 'react'
import ConnectWalletModal from './components/connect-wallets-modal/ConnectWalletModal'
import { OnchainRecordsProvider } from './context/OnchainRecordsContext'
import Records from './records/Records'

export default function OnchainRecords() {
    const { onClose, isOpen, onOpen } = useDisclosure()
    const { handleFeatureAccess, isUpgradeModalOpen, closeUpgradeModal } = useUpgradeHandler('ENTERPRISE');
    const { t } = useLocaleResources("onchainRecords", { en: enLocale, ar: arLocale })

    const handleConnectWalletClick = () => {
        handleFeatureAccess(() => {
            onOpen()
        });
    }

    return (
        <OnchainRecordsProvider>
            <PageGrid.Root>
                <PageGrid.Header
                    title={t("OnchainRecords.pageTitle")}
                    description={t("OnchainRecords.pageDescription")}
                    actionButtons={[
                        {
                            title: t("ConnectWallets.connect"),
                            leftIcon: <WalletMd />,
                            onClick: handleConnectWalletClick,
                        }
                    ]}
                />

                <PageGrid.Content>
                    <Records />
                </PageGrid.Content>

                <ConnectWalletModal isOpen={isOpen} onClose={onClose} />
                
                <UpgradePlanModalContainer
                    isOpen={isUpgradeModalOpen}
                    onClose={closeUpgradeModal}
                    initialActiveTab="enterprise"
                />
            </PageGrid.Root>
        </OnchainRecordsProvider>
    )
}
