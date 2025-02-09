import { useMediaQuery } from '@chakra-ui/react';
import React from 'react'
import MobileManualTransfer from './MobileManualTransfer';
import DesktopManualTransfer from './DesktopManualTransfer';

export interface Wallet {
    address: string;
    percent: number;
}

interface Props {
    data: Wallet[];
    setData: (values: Wallet[]) => void
}

export default function ManualTransfer({ data, setData }: Props) {
    const [isSmallerThan768] = useMediaQuery("(max-width: 768px)");

    return (
        isSmallerThan768 ? (
            <MobileManualTransfer data={data} setData={setData} />
        ) : (
            <DesktopManualTransfer data={data} setData={setData} />
        )
    );
}
