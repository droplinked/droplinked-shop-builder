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
    onSave: () => void;
    isSingleWallet: boolean;
}

export const WalletRow = ({ wallet, onChange, onDelete, onSave, isSingleWallet }: WalletRowProps) => {
    const [isEditing, setIsEditing] = useState(!wallet.destinationAddress);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        setIsEditing(false);
        onSave();
    };

    return (
        <Flex alignItems={"center"} gap={4}>
            <WalletAddressInput
                value={wallet.destinationAddress}
                onChange={(value) => onChange("destinationAddress", value)}
                isEditing={isEditing}
                onSave={handleSave}
            />
            <PercentageInput
                value={wallet.percent}
                onChange={(value) => onChange("percent", value)}
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
