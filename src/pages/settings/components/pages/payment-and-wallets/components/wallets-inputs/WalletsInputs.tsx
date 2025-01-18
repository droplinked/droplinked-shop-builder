import { Flex } from "@chakra-ui/react";
import AppIcons from "assest/icon/Appicons";
import Button from "components/redesign/button/Button";
import DefaultBadge from "pages/settings/components/common/DefaultBadge";
import NavigationLink from "pages/settings/components/common/NavigationLink";
import SectionContainer from "pages/settings/components/common/SectionContainer";
import SectionContent from "pages/settings/components/common/SectionContent";
import React, { useState } from "react";
import { WalletRow } from "./WalletRow";
import { useFormikContext } from "formik";
import { ISettings } from "pages/settings/formConfigs";
import useAppStore from "lib/stores/app/appStore";
import useAppToast from "functions/hooks/toast/useToast";
import { getDescription, getWalletsData } from "./helpers";
import { WalletData } from "./types";

export default function WalletInputs({ isSolana }: { isSolana?: boolean }) {
    const { values, setFieldValue } = useFormikContext<ISettings>();
    const { shop: { circleWallets } } = useAppStore();
    const { showToast } = useAppToast();
    const circleWalletAddress = circleWallets?.find(wallet => wallet?.chain === "ETH")?.address || "";
    const walletType = isSolana ? "SOL" : "EVM";
    const description = getDescription(isSolana);
    const walletsData = getWalletsData(values, walletType);
    const [tempData, setTempData] = useState(walletsData.destinationAddress)

    // Add a new wallet address entry with 0% allocation
    const handleAddWallet = () => {
        setTempData((prevState) => [...prevState, { destinationAddress: "", percent: 0 }]);
    };

    // Remove a wallet address entry, preventing deletion of the last address
    const handleDelete = (index: number) => {
        if (tempData.length <= 1) return;
        const updatedAddresses = tempData.filter((_, i) => i !== index);
        setTempData(updatedAddresses);
        updateWallets(updatedAddresses);
    };

    // Update wallet address or percentage for a specific index
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

    const handleSave = () => {
        updateWallets(tempData);
    };

    // Update the entire wallets array in Formik while preserving other wallet types
    const updateWallets = (addresses: WalletData[]) => {
        const newWallets = values.paymentWallets?.filter(w => w.type !== walletType) || [];
        setFieldValue("paymentWallets", [...newWallets, { type: walletType, destinationAddress: addresses }]);
    };

    // Set the merchant's Circle wallet as the default wallet
    const handleSetDefault = () => {
        if (!circleWalletAddress) {
            showToast({ type: "error", message: "Please activate your Merchant Wallet first" });
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
                    isDefault={walletsData.destinationAddress[0]?.destinationAddress === circleWalletAddress}
                />
            }
            rightContent={
                <Button onClick={handleAddWallet} color={"#179EF8"} variant="outline" border={"none"}>
                    <AppIcons.BluePlus />
                    Target Wallet
                </Button>
            }
            title={`${walletType} Wallet`}
        >
            <SectionContent title="Address" description={description} rightContent={renderWalletRows(tempData, handleChange, handleDelete, handleSave)} >
                <NavigationLink title="Learn more" to={"#"} />
            </SectionContent>
        </SectionContainer>
    );
}

const renderWalletRows = (wallets: WalletData[], handleChange: Function, handleDelete: Function, handleSave: Function) => (
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
