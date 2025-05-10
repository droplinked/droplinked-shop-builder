import React from 'react';
import AppInput from 'components/redesign/input/AppInput';
import AppButton from 'components/redesign/button/AppButton';

interface WalletAddressInputProps {
    value: string;
    onChange: (value: string) => void;
    isEditing: boolean;
    onSave: () => void;
}

export const WalletAddressInput = ({ value, onChange, isEditing, onSave }: WalletAddressInputProps) => {
    const isButtonDisabled = isEditing && value.trim().length > 0

    return (
        <AppInput
            inputProps={{
                placeholder: "Enter your wallet address",
                value,
                onChange: (e) => onChange(e.target.value),
                // Disable input when not in editing mode
                isDisabled: !isEditing
            }}
            inputContainerProps={{ padding: 2, paddingLeft: 4 }}
            rightElement={
                <AppButton
                    size='sm'
                    isDisabled={!isButtonDisabled}
                    onClick={onSave}
                    visibility={isButtonDisabled ? "visible" : "hidden"}
                >
                    Save
                </AppButton>
            }
        />
    )
}

