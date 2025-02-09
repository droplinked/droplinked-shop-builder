import React from 'react'
import { Wallet } from './ManualTransfer';
import { Flex } from '@chakra-ui/react';
import Input from 'components/redesign/input/Input';
import AppIcons from 'assest/icon/Appicons';

interface Props {
    data: Wallet[];
    setData: (values: Wallet[]) => void;
}

export default function DesktopManualTransfer({ data, setData }: Props) {
    const handleAddWallet = () => {
        setData([...data, { address: '', percent: 0 }]);
    };

    const handleRemoveWallet = (index: number) => {
        if (data.length <= 1) return; // Prevent removing last wallet
        const newData = data.filter((_, i) => i !== index);
        setData(newData);
    };

    const handleUpdateWallet = (index: number, field: keyof Wallet, value: string) => {
        const newData = [...data];
        if (field === 'percent') {
            newData[index][field] = Number(value);
        } else {
            newData[index][field] = value;
        }
        setData(newData);
    };

    return (
        <Flex flexDirection={"column"} gap={4} maxHeight={"40dvh"} overflow={"auto"}>
            {data.map((wallet, index) => (
                <Flex key={index} gap={4} alignItems="center">
                    <Input
                        inputProps={{
                            placeholder: "Enter your wallet address",
                            value: wallet.address,
                            onChange: (e) => handleUpdateWallet(index, 'address', e.target.value)
                        }}
                    />
                    <Input
                        inputProps={{
                            placeholder: "0",
                            value: wallet.percent,
                            onChange: (e) => handleUpdateWallet(index, 'percent', e.target.value)
                        }}
                        inputGroupProps={{
                            width: "20%"
                        }}
                        rightElement={<AppIcons.GrayPercent />}
                    />
                    {index === data.length - 1 ? (
                        <AppIcons.GreenPlus
                            width={"36px"}
                            height={"36px"}
                            cursor="pointer"
                            onClick={handleAddWallet}
                        />
                    ) : (
                        <AppIcons.RedTrash
                            width={"36px"}
                            height={"36px"}
                            cursor="pointer"
                            onClick={() => handleRemoveWallet(index)}
                        />
                    )}
                </Flex>
            ))}
        </Flex>
    )
}
