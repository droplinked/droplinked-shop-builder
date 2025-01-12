import { Box } from '@chakra-ui/react';
import React from 'react';
import FinancialServices from './components/financial-services/FinancialServices';
import MerchantWallet from './components/merchant-wallet/MerchantWallet';
import StoreDisplay from './components/store-display/StoreDisplay';
import TokenPay from './components/token-pay/TokenPay';
import EVMWallet from './components/evm-wallet/EVMWallet';
import SolanaWallet from './components/solana-wallet/SolanaWallet';

function PaymentAndWallets() {
  return (
    <Box px={{ base: 4, md: 6 }}>
      <StoreDisplay />
      <FinancialServices />
      <MerchantWallet />
      <EVMWallet />
      <SolanaWallet />
      <TokenPay />
    </Box>
  );
}

export default PaymentAndWallets;
