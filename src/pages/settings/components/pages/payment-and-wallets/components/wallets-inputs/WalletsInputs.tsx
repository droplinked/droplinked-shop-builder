import { Flex } from "@chakra-ui/react";
import AppIcons from "assets/icon/Appicons";
import BlueButton from "components/redesign/button/BlueButton";
import InteractiveText from "components/redesign/interactive-text/InteractiveText";
import { useFormikContext } from "formik";
import useAppToast from "hooks/toast/useToast";
import useLocaleResources from "hooks/useLocaleResources/useLocaleResources";
import DefaultBadge from "pages/settings/components/common/DefaultBadge";
import SectionContainer from "pages/settings/components/common/SectionContainer";
import SectionContent from "pages/settings/components/common/SectionContent";
import { ISettings } from "pages/settings/utils/formConfigs";
import React, { useEffect, useState } from "react";
import useAppStore from "stores/app/appStore";
import { getWalletsData } from "./helpers";
import { WalletData } from "./types";
import { WalletRow } from "./WalletRow";

export default function WalletInputs({ isSolana }: { isSolana?: boolean }) {
    const { t } = useLocaleResources('settings');
    const { values, setFieldValue } = useFormikContext<ISettings>();
    const { shop: { circleWallets } } = useAppStore();
    const { showToast } = useAppToast();
    const walletType = isSolana ? "SOL" : "EVM";
    const circleWalletAddress = circleWallets?.find(wallet => wallet?.chain === (isSolana ? "SOLANA" : "ETH"))?.address || "";

    const description = isSolana
        ? t("settings.paymentsWallets.wallets.solanaWallet.description")
        : t("settings.paymentsWallets.wallets.evmWallet.description");

    const walletsData = getWalletsData(values, walletType);

    // Temporarily store wallet data (we use it to prevent direct state mutation)
    const [tempData, setTempData] = useState(walletsData.destinationAddress)

    // we use UseEffect to update the tempData when the values change (like when we press discard button)
    useEffect(() => {
        setTempData(walletsData.destinationAddress)
    }, [values])

    // Add new wallet with 0% allocation
    const handleAddWallet = () => {
        setTempData((prevState) => [...prevState, { destinationAddress: "", percent: 0 }]);
    };

    // Remove wallet at specified index
    const handleDelete = (index: number) => {
        if (tempData.length <= 1) return;
        const updatedAddresses = tempData.filter((_, i) => i !== index);
        setTempData(updatedAddresses);
        updateWallets(updatedAddresses);
    };

    // Update wallet field value at index
    const handleChange = (index: number, field: "destinationAddress" | "percent", value: string) => {
        const updatedAddresses = tempData.map((addr, i) => {
            if (i === index) {
                return {
                    ...addr,
                    [field]: field === "percent" ? Number(value) : value
                };
            }
            return addr;
        });
        setTempData(updatedAddresses);
    };

    // Save current wallet config
    const handleSave = () => {
        updateWallets(tempData);
    };

    // Update wallets while keeping other types
    const updateWallets = (addresses: WalletData[]) => {
        const newWallets = values.paymentWallets?.filter(w => w.type !== walletType) || [];
        setFieldValue("paymentWallets", [...newWallets, { type: walletType, destinationAddress: addresses }]);
    };

    // Set Circle wallet as default
    const handleSetDefault = () => {
        if (!circleWalletAddress) {
            showToast({ type: "error", message: t("settings.merchantWallet.manage.errors.walletNotConnected") });
            return;
        }
        const updatedAddresses = [{ destinationAddress: circleWalletAddress, percent: 100 }];
        setTempData(updatedAddresses)
        updateWallets(updatedAddresses);
    };

    return (
        <SectionContainer
            badge={
                <DefaultBadge
                    onClick={handleSetDefault}
                    isDefault={tempData[0].destinationAddress === circleWalletAddress}
                />
            }
            rightContent={
                <BlueButton
                    fontSize={12}
                    fontWeight={500}
                    onClick={handleAddWallet}
                >
                    <AppIcons.BluePlus style={{ width: "16px", height: "16px" }} />
                    {t("settings.paymentsWallets.wallets.addTargetWallet")}
                </BlueButton>
            }
            title={isSolana ? t("settings.paymentsWallets.wallets.solanaWallet.title") : t("settings.paymentsWallets.wallets.evmWallet.title")}
        >
            <SectionContent
                title={t("settings.address.title")}
                description={description}
                rightContent={renderWalletRows(tempData, handleChange, handleDelete, handleSave, t)}>
                <InteractiveText
                    to="#"
                    target="_blank"
                    hasExternalIcon
                >
                    {t(isSolana ? "settings.paymentsWallets.wallets.solanaWallet.learnMore" : "settings.paymentsWallets.wallets.evmWallet.learnMore")}
                </InteractiveText>
            </SectionContent>
        </SectionContainer>
    );
}

// Render wallet input rows list
const renderWalletRows = (wallets: WalletData[], handleChange: Function, handleDelete: Function, handleSave: Function, t: Function) => (
    <Flex direction="column" gap={4}>
        {wallets.map((wallet, index) => (
            <WalletRow
                key={index}
                wallet={wallet}
                onChange={(field, value) => handleChange(index, field, value)}
                onDelete={() => handleDelete(index)}
                onSave={() => handleSave()}
                isSingleWallet={wallets.length <= 1}
            />
        ))}
    </Flex>
);