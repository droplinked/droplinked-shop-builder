import ExternalLink from 'components/redesign/external-link/ExternalLink';
import React from 'react'
import ContainerCard from '../ContainerCard';
import AppSkeleton from 'components/common/skeleton/AppSkeleton';
import DateFormatter from '../records-list/tabs-components/DateFormatter';

export default function ContainerCardSkelton() {
    const airdropData = [
        {
            title: "Quantity",
            content: "12",
        },
        {
            title: "ID",
            content: (
                <ExternalLink fontSize={14} fontWeight={500} hasArrow={true}>
                    0x3D56165154
                </ExternalLink>
            ),
        },
        {
            title: "Transaction Hash 1",
            content: (
                <ExternalLink fontSize={14} fontWeight={500} hasArrow={true}>
                    0x3D56165154
                </ExternalLink>
            ),
        },
        {
            title: "Transaction Hash",
            content: (
                <ExternalLink fontSize={14} fontWeight={500} hasArrow={true}>
                    0x3D56165154
                </ExternalLink>
            ),
        },
    ];

    return (
        <AppSkeleton borderRadius={16} isLoaded={false}>
            <ContainerCard title="Transfer" items={airdropData} hasBorder={true} titleRightContent={<DateFormatter date={new Date().toISOString()} />} />
        </AppSkeleton>
    )
}
