import React from 'react'
import { Wallet } from './ManualTransfer';
import { Flex } from '@chakra-ui/react';
import AppInput from 'components/redesign/input/AppInput';
import AppIcons from 'assets/icon/Appicons';
import BlueButton from 'components/redesign/button/BlueButton';
import AppTypography from 'components/common/typography/AppTypography';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';

interface Props {
    data: Wallet[];
    setData: (values: Wallet[]) => void
}

export default function MobileManualTransfer({ data, setData }: Props) {
    const { t } = useLocaleResources("onchainRecords")

    const handleAddWallet = () => {
        setData([...data, { receiver: '', amount: 0 }]);
    };

    const handleRemoveWallet = (index: number) => {
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
        <Flex flexDirection="column" gap={6} maxHeight="40dvh" overflow="auto">
            {data.map((wallet, index) => (
                <Flex
                    key={index}
                    flexDirection="column"
                    border="1px solid"
                    borderColor="neutral.gray.800"
                    borderRadius={8}
                >
                    <Flex gap={3} flexDirection="column" p={3}>
                        <AppInput
                            inputProps={{
                                placeholder: t("enter_wallet_address"),
                                onChange: (e) => handleUpdateWallet(index, 'receiver', e.target.value),
                                value: wallet.receiver
                            }}
                        />
                        <AppInput
                            inputProps={{
                                placeholder: "0",
                                type: "number",
                                onChange: (e) => handleUpdateWallet(index, 'amount', e.target.value),
                                value: wallet.amount
                            }}
                        />
                    </Flex>
                    <Flex
                        py="10px"
                        borderTop="1px solid"
                        borderColor="neutral.gray.800"
                        justifyContent="center"
                        alignItems="center"
                        gap={1.5}
                        cursor="pointer"
                        onClick={() => handleRemoveWallet(index)}
                    >
                        <AppIcons.RedTrash />
                        <AppTypography color="#f24" fontSize={14} fontWeight={500}>
                            Remove
                        </AppTypography>
                    </Flex>
                </Flex>
            ))}
            <BlueButton
                fontSize={14}
                iconSpacing="6px"
                border="1px solid"
                borderColor="neutral.gray.800"
                borderRadius={8}
                leftIcon={<AppIcons.BluePlus />}
                onClick={handleAddWallet}
            >
                Target Wallet
            </BlueButton>
        </Flex>
    )
}
