import React from 'react';
import { Box, Divider } from '@chakra-ui/react';
import WalletConfig from './components/WalletConfig';

function WalletsList() {
  const wallets = [
    {
      title: 'EVM Wallet',
      description: 'Connect one or multiple EVM-based wallets to accept Ethereum-based digital assets. You can define percentage payouts across multiple wallet addresses.',
      badgeText: 'Set As Default',
      badgeBg: '#282828',
      buttonText: 'Target Wallet',
      inputPlaceholder: 'Enter your wallet address'
    },
    {
      title: 'Solana Wallet',
      description: 'Connect a Solana-based wallet to accept Solana-based digital assets. You can define percentage payouts across multiple wallet addresses.',
      badgeText: 'Set As Default',
      badgeBg: '#282828',
      buttonText: 'Target Wallet',
      inputPlaceholder: 'Enter a Solana wallet address'
    }
  ];
  return (
    <Box>
      {wallets.map((wallet, index) => (
        <React.Fragment key={wallet.title}>
          <WalletConfig
            title={wallet.title}
            description={wallet.description}
            badgeText={wallet.badgeText}
            badgeBg={wallet.badgeBg}
            buttonText={wallet.buttonText}
            inputPlaceholder={wallet.inputPlaceholder}
          />
          <Divider borderColor="#292929" />
        </React.Fragment>
      ))}
    </Box>
  );
}

export default WalletsList;
