import React from 'react'
import { Wallet } from './ManualTransfer';
import { Flex } from '@chakra-ui/react';
import AppInput from 'components/redesign/input/AppInput';
import AppIcons from 'assets/icon/Appicons';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';

interface Props {
    data: Wallet[];
    setData: (values: Wallet[]) => void;
}

export default function DesktopManualTransfer({ data, setData }: Props) {
    const { t } = useLocaleResources("onchainRecords")

    const handleAddWallet = () => {
        setData([...data, { receiver: '', amount: 0 }]);
    };

    const handleRemoveWallet = (index: number) => {
        if (data.length <= 1) return; // Prevent removing last wallet
        const newData = data.filter((_, i) => i !== index);
        setData(newData);
    };

    const handleUpdateWallet = (index: number, field: keyof Wallet, value: string) => {
        const newData = [...data];
        if (field === 'amount') {
            newData[index][field] = Number(value);
        } else {
            newData[index][field] = value;
        }
        setData(newData);
    };

    return (
        <Flex flexDirection="column" gap={4} maxHeight="40dvh" overflow="auto">
            {data.map((wallet, index) => (
                <Flex key={index} gap={4} alignItems="center">
                    <AppInput
                        inputProps={{
                            placeholder: t("enter_wallet_address"),
                            value: wallet.receiver,
                            onChange: (e) => handleUpdateWallet(index, 'receiver', e.target.value)
                        }}
                    />
                    <AppInput
                        inputProps={{
                            placeholder: "0",
                            value: wallet.amount,
                            type: "number",
                            onChange: (e) => handleUpdateWallet(index, 'amount', e.target.value)
                        }}
                        inputGroupProps={{
                            width: "20%"
                        }}
                    />
                    {index === data.length - 1 ? (
                        <AppIcons.GreenPlus
                            width="36px"
                            height="36px"
                            cursor="pointer"
                            onClick={handleAddWallet}
                        />
                    ) : (
                        <AppIcons.RedTrash
                            width="36px"
                            height="36px"
                            cursor="pointer"
                            onClick={() => handleRemoveWallet(index)}
                        />
                    )}
                </Flex>
            ))}
        </Flex>
    )
}

