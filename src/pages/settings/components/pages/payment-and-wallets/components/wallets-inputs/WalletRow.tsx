import React, { useState } from 'react';
import { Flex } from '@chakra-ui/react';
import { WalletData, WalletField } from './types';
import { WalletAddressInput } from './components/WalletAddressInput';
import { PercentageInput } from './components/PercentageInput';
import { ActionButtons } from './components/ActionButtons';

interface WalletRowProps {
    wallet: WalletData;
    onChange: (field: WalletField, value: string) => void;
    onDelete: () => void;
    isSingleWallet: boolean;
}

export const WalletRow = ({
    wallet,
    onChange,
    onDelete,
    isSingleWallet
}: WalletRowProps) => {
    // Initialize editing mode if wallet address is empty
    const [isEditing, setIsEditing] = useState(!wallet.destinationAddress);
    // Temporary state to handle editing without affecting parent state immediately
    const [tempWallet, setTempWallet] = useState(wallet);

    const handleEdit = () => {
        // Enter edit mode and store current wallet data as temporary state
        setIsEditing(true);
        setTempWallet(wallet);
    };

    const handleSave = () => {
        // Update parent component with temporary state values and exit edit mode
        onChange("destinationAddress", tempWallet.destinationAddress);
        onChange("percent", tempWallet.percent.toString());
        setIsEditing(false);
    };

    const handleChange = (field: WalletField, value: string) => {
        // Convert percentage to number if the field is "percent"
        const newValue = field === "percent" ? Number(value) : value;
        // Update temporary state and parent state simultaneously
        setTempWallet(prev => ({
            ...prev,
            [field]: newValue
        }));
        onChange(field, value);
    };

    return (
        <Flex alignItems={"center"} gap={4}>
            <WalletAddressInput
                value={isEditing ? tempWallet.destinationAddress : wallet.destinationAddress}
                onChange={(value) => handleChange("destinationAddress", value)}
                isEditing={isEditing}
                onSave={handleSave}
            />
            <PercentageInput
                value={isEditing ? tempWallet.percent : wallet.percent}
                onChange={(value) => handleChange("percent", value)}
                isEditing={isEditing}
            />
            <ActionButtons
                onEdit={handleEdit}
                onDelete={onDelete}
                isEditing={isEditing}
                isSingleWallet={isSingleWallet}
            />
        </Flex>
    );
};
