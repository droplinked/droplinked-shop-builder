import { Flex } from "@chakra-ui/react";
import AppIcons from "assest/icon/Appicons";
import Button from "components/redesign/button/Button";
import DefaultBadge from "pages/settings/components/common/DefaultBadge";
import NavigationLink from "pages/settings/components/common/NavigationLink";
import SectionContainer from "pages/settings/components/common/SectionContainer";
import SectionContent from "pages/settings/components/common/SectionContent";
import React from "react";
import { WalletRow } from "./WalletRow";
import { useFormikContext } from "formik";
import { ISettings } from "pages/settings/formConfigs";
import useAppStore from "lib/stores/app/appStore";
import useAppToast from "functions/hooks/toast/useToast";

export interface WalletAddress {
    destinationAddress: string;
    percent: number;
}

export default function WalletInputs({ isSolana }: { isSolana?: boolean }) {
    const { values, setFieldValue } = useFormikContext<ISettings>();
    const { shop: { circleWallets } } = useAppStore();
    const { showToast } = useAppToast()
    const circleWalletAddress = circleWallets?.find(wallet => wallet?.chain === "ETH")?.address || "";
    const walletType = isSolana ? "SOL" : "EVM";
    const description = isSolana ? "Connect a Solana-based wallet in order to accept Solana based digital assets. You can define percentage payouts across multiple wallet addresses." : "Connect one or multiple EVM-based wallets to accept Ethereum based digital assets. You can define percentage payouts across multiple wallet addresses."

    // Find existing wallet configuration or create a new one with default values
    const walletsData = values.paymentWallets?.find(wallet => wallet.type === walletType) || {
        type: walletType,
        destinationAddress: [{ destinationAddress: "", percent: 100 }]
    };

    // Add a new wallet address entry with 0% allocation
    // This allows users to add multiple wallet addresses for split payments
    const handleAddWallet = () => {
        const updatedAddresses = [...walletsData.destinationAddress, { destinationAddress: "", percent: 0 }];
        updateWallets(updatedAddresses);
    };

    // Remove a wallet address entry, preventing deletion of the last address
    // This ensures we always have at least one wallet address
    const handleDelete = (index: number) => {
        if (walletsData.destinationAddress.length <= 1) return;
        const updatedAddresses = walletsData.destinationAddress.filter((_, i) => i !== index);
        updateWallets(updatedAddresses);
    };

    // Update wallet address or percentage for a specific index
    // This function handles both text (address) and numeric (percent) updates
    const handleChange = (index: number, field: "destinationAddress" | "percent", value: string) => {
        const updatedAddresses = walletsData.destinationAddress.map((addr, i) => {
            if (i === index) {
                // Convert percent to number, keep address as string
                return {
                    ...addr,
                    [field]: field === "percent" ? Number(value) : value
                };
            }
            return addr;
        });

        updateWallets(updatedAddresses);
    };

    // Update the entire wallets array in Formik while preserving other wallet types
    const updateWallets = (addresses: { destinationAddress: string; percent: number }[]) => {
        const newWallets = values.paymentWallets?.filter(w => w.type !== walletType) || [];
        setFieldValue("paymentWallets", [...newWallets, {
            type: walletType,
            destinationAddress: addresses
        }]);
    };

    // Set the merchant's Circle wallet as the default wallet
    // This replaces all existing wallet addresses with the Circle wallet at 100%
    const handleSetDefault = () => {
        if (!circleWalletAddress) {
            showToast({
                type: "error",
                message: "Please activate your Merchant Wallet first",
            });
            return;
        }

        const updatedAddresses = [
            { destinationAddress: circleWalletAddress, percent: 100 }
        ];
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
                <Button
                    onClick={handleAddWallet}
                    color={"#179EF8"}
                    variant="outline"
                    border={"none"}
                >
                    <AppIcons.BluePlus />
                    Target Wallet
                </Button>
            }
            title={`${walletType} Wallet`}
        >
            <SectionContent
                title="Address"
                description={description}
                rightContent={
                    <Flex direction="column" gap={4}>
                        {walletsData.destinationAddress.map((wallet, index) => (
                            <WalletRow
                                key={index}
                                wallet={wallet}
                                onChange={(field, value) => handleChange(index, field, value)}
                                onDelete={() => handleDelete(index)}
                                isSingleWallet={walletsData.destinationAddress.length <= 1}
                            />
                        ))}
                    </Flex>
                }
            >
                <NavigationLink title="Learn more" to={"#"} />
            </SectionContent>
        </SectionContainer>
    );
}
