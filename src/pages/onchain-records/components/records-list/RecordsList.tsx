import React from 'react'
import RecordItem from './RecordItem'
import { Grid } from '@chakra-ui/react'
import { IDroplinkedNFTs, IWalletNFTs } from 'lib/apis/onchain-inventory/interface'
import { ICombinedNft } from 'pages/onchain-records/utils/interface';

interface Props {
    droplinkedNFTs: IDroplinkedNFTs[];
    walletNFTs: IWalletNFTs[];
}

export default function RecordsList({ droplinkedNFTs, walletNFTs }: Props) {
    const combinedNFTs: ICombinedNft[] = [...droplinkedNFTs, ...walletNFTs];

    return (
        <Grid
            templateColumns={{
                base: 'repeat(2, 1fr)',
                lg: 'repeat(4, 1fr)',
                xl: 'repeat(5, 1fr)',
            }}
            gap={6}
        >
            {
                combinedNFTs.map((item, index) => {
                    return (
                        <RecordItem />
                    )
                })
            }
        </Grid>
    )
}
