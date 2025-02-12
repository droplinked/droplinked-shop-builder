import React from 'react'
import RecordItem from './RecordItem'
import { Grid } from '@chakra-ui/react'
import { IDroplinkedNFTs, IWalletNFTs } from 'lib/apis/onchain-inventory/interface'
import { ICombinedNft } from 'pages/onchain-records/utils/interface';
import { mapDroplinkedData, mapWalletData } from 'pages/onchain-records/utils/mapper';

interface Props {
    droplinkedNFTs: IDroplinkedNFTs[];
    walletNFTs: IWalletNFTs[];
}

export default function RecordsList({ droplinkedNFTs, walletNFTs }: Props) {
    const combinedNFTs: ICombinedNft[] = [
        ...droplinkedNFTs.map((item) => mapDroplinkedData(item)),
        ...walletNFTs.map((item) => mapWalletData(item))
    ];

    return (
        <Grid
            templateColumns={{
                base: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
                lg: 'repeat(4, 1fr)',
                xl: 'repeat(5, 1fr)',
            }}
            gap={6}
        >
            {combinedNFTs.map((item, index) => {
                return (
                    <RecordItem key={index} item={item} />
                )
            })}
        </Grid>
    )
}
