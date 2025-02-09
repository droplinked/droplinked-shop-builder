import React from 'react'
import { Wallet } from './ManualTransfer';
import { Flex } from '@chakra-ui/react';
import Input from 'components/redesign/input/Input';
import AppIcons from 'assest/icon/Appicons';
import BlueButton from 'components/redesign/button/BlueButton';
import AppTypography from 'components/common/typography/AppTypography';

interface Props {
    data: Wallet[];
    setData: (values: Wallet[]) => void
}

export default function MobileManualTransfer({ data, setData }: Props) {
    const handleAddWallet = () => {
        setData([...data, { address: '', percent: 0 }]);
    };

    const handleRemoveWallet = (index: number) => {
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
        <Flex flexDirection={"column"} gap={6} maxHeight={"40dvh"} overflow={"auto"}>
            {data.map((wallet, index) => (
                <Flex
                    key={index}
                    flexDirection={"column"}
                    border={"1px solid #292929"}
                    borderRadius={8}
                >
                    <Flex gap={3} flexDirection={"column"} p={3}>
                        <Input
                            inputProps={{
                                placeholder: "Enter your wallet address",
                                onChange: (e) => handleUpdateWallet(index, 'address', e.target.value),
                                value: wallet.address
                            }}
                        />
                        <Input
                            inputProps={{
                                placeholder: "0",
                                onChange: (e) => handleUpdateWallet(index, 'percent', e.target.value),
                                value: wallet.percent
                            }}
                            rightElement={<AppIcons.GrayPercent />}
                        />
                    </Flex>
                    <Flex
                        py={"10px"}
                        borderTop={"1px solid #292929"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        gap={1.5}
                        cursor="pointer"
                        onClick={() => handleRemoveWallet(index)}
                    >
                        <AppIcons.RedTrash />
                        <AppTypography color={"#f24"} fontSize={14} fontWeight={500}>
                            Remove
                        </AppTypography>
                    </Flex>
                </Flex>
            ))}
            <BlueButton
                fontSize={14}
                iconSpacing={"6px"}
                border={"1px solid #292929"}
                borderRadius={8}
                leftIcon={<AppIcons.BluePlus />}
                onClick={handleAddWallet}
            >
                Target Wallet
            </BlueButton>
        </Flex>
    )
}
