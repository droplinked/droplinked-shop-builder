import { Flex } from "@chakra-ui/react";
import AppIcons from "assest/icon/Appicons";
import Button from "components/redesign/button/Button";
import DefaultBadge from "pages/settings/components/common/DefaultBadge";
import NavigationLink from "pages/settings/components/common/NavigationLink";
import SectionContainer from "pages/settings/components/common/SectionContainer";
import SectionContent from "pages/settings/components/common/SectionContent";
import React, { useState } from "react";
import { WalletRow } from "./WalletRow";

export interface WalletAddress {
    id: number;
    address: string;
    percentage: string;
    isEditing: boolean;
    isNew: boolean;
}

export default function SolanaWallet() {
    const [wallets, setWallets] = useState<WalletAddress[]>([
        { id: 1, address: "0x123...", percentage: "100", isEditing: false, isNew: false }
    ]);

    const handleAddWallet = () => {
        const newWallet: WalletAddress = {
            id: Date.now(),
            address: "",
            percentage: "0",
            isEditing: false,
            isNew: true
        };
        setWallets([...wallets, newWallet]);
    };

    const handleEdit = (id: number) => {
        setWallets(wallets.map(wallet =>
            wallet.id === id ? { ...wallet, isEditing: true } : wallet
        ));
    };

    const handleDelete = (id: number) => {
        if (wallets.length <= 1) return;
        setWallets(wallets.filter(wallet => wallet.id !== id));
    };

    const handleSave = (id: number) => {
        setWallets(wallets.map(wallet =>
            wallet.id === id ? { ...wallet, isEditing: false, isNew: false } : wallet
        ));
    };

    const handleChange = (id: number, field: "address" | "percentage", value: string) => {
        setWallets(wallets.map(wallet =>
            wallet.id === id ? { ...wallet, [field]: value } : wallet
        ));
    };

    return (
        <SectionContainer
            badge={<DefaultBadge isDefault={false} />}
            rightContent={
                <Button
                    onClick={handleAddWallet}
                    color={"#179EF8"}
                    sx={{ path: { stroke: "#179EF8" } }}
                    variant="outline"
                    border={"none"}
                >
                    <AppIcons.BluePlus />
                    Target Wallet
                </Button>
            }
            title="Solana Wallet"
        >
            <SectionContent
                title="Address"
                description="Connect a Solana-based wallet in order to accept Solana based digital assets. You can define percentage payouts across multiple wallet addresses."
                rightContent={
                    <Flex direction="column" gap={4}>
                        {wallets.map(wallet => (
                            <WalletRow
                                key={wallet.id}
                                wallet={wallet}
                                onChange={handleChange}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                onSave={handleSave}
                                isSingleWallet={wallets.length <= 1}
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
