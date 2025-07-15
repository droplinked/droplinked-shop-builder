import React from 'react';
import AppInput from 'components/redesign/input/AppInput';
import AppButton from 'components/redesign/button/AppButton';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';

interface WalletAddressInputProps {
    value: string;
    onChange: (value: string) => void;
    isEditing: boolean;
    onSave: () => void;
}

export const WalletAddressInput = ({ value, onChange, isEditing, onSave }: WalletAddressInputProps) => {
    const { t } = useLocaleResources("settings")
    const isButtonDisabled = isEditing && value.trim().length > 0

    return (
        <AppInput
            inputProps={{
                placeholder: t("settings.paymentsWallets.wallets.walletAddress.placeholder"),
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
                    {t("save")}
                </AppButton>
            }
        />
    )
}

