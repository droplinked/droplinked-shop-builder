import { Grid, useDisclosure, useMediaQuery } from '@chakra-ui/react';
import { IDroplinkedNFTs, IWalletNFTs } from 'lib/apis/onchain-inventory/interface';
import { ICombinedNft } from 'pages/onchain-records/utils/interface';
import { mapDroplinkedData, mapWalletData } from 'pages/onchain-records/utils/mapper';
import React from 'react';
import RecordItem from './RecordItem';
import BlueButton from 'components/redesign/button/BlueButton';
import AppIcons from 'assest/icon/Appicons';
import ConnectWalletModal from '../ConnectWalletModal';

interface Props {
  droplinkedNFTs: IDroplinkedNFTs[];
  walletNFTs: IWalletNFTs[];
}

export default function RecordsList({ droplinkedNFTs, walletNFTs }: Props) {
  const combinedNFTs: ICombinedNft[] = [...droplinkedNFTs?.map((item) => mapDroplinkedData(item)), ...walletNFTs?.map((item) => mapWalletData(item))];
  const [isSmallerThan425px] = useMediaQuery('(max-width: 425px)');
  const connectWalletModal = useDisclosure();

  return (
    <>
      <Grid
        templateColumns={{
          base: `repeat(${isSmallerThan425px ? '2' : '3'}, 1fr)`,
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
          xl: 'repeat(5, 1fr)'
        }}
        gap={6}
      >
        {combinedNFTs.map((item, index) => {
          return <RecordItem key={index} item={item} />;
        })}
      
      </Grid>
      <BlueButton
          sx={{ path: { stroke: '#2BCFA1' } }}
          leftIcon={<AppIcons.Wallet width={'16px'} height={'16px'} />}
          iconSpacing={'4px'}
          color={'#2BCFA1'}
          fontSize={12}
          fontWeight={500}
          onClick={connectWalletModal.onOpen}
        >
          Connect Wallet
        </BlueButton>
      <ConnectWalletModal connectWalletModal={connectWalletModal} />
    </>
  );
}
