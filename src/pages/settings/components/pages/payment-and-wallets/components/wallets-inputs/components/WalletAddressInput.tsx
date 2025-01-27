import React from 'react';
import Input from 'components/redesign/input/Input';
import Button from 'components/redesign/button/Button';

interface WalletAddressInputProps {
    value: string;
    onChange: (value: string) => void;
    isEditing: boolean;
    onSave: () => void;
}

export const WalletAddressInput = ({ value, onChange, isEditing, onSave }: WalletAddressInputProps) => {
    const isButtonDisabled = isEditing && value.trim().length > 0

    return (
        <Input
            inputProps={{
                placeholder: "Enter your wallet address",
                value,
                onChange: (e) => onChange(e.target.value),
                // Disable input when not in editing mode
                isDisabled: !isEditing
            }}
            inputContainerProps={{ padding: 2, paddingLeft: 4 }}
            rightElement={
                <Button
                    borderRadius={4}
                    fontSize={12}
                    fontWeight={500}
                    paddingBlock={2}
                    px={3}
                    height={"min-content"}
                    isDisabled={!isButtonDisabled}
                    onClick={onSave}
                    visibility={isButtonDisabled ? "visible" : "hidden"}
                >
                    Save
                </Button>
            }
        />
    )
}

