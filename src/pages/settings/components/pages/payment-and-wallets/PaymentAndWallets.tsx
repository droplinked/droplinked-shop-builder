import { Box } from '@chakra-ui/react';
import React from 'react';
import FinancialServices from './components/financial-services/FinancialServices';
import MerchantWallet from './components/merchant-wallet/MerchantWallet';
import StoreDisplay from './components/store-display/StoreDisplay';
import TokenPay from './components/token-pay/TokenPay';
import WalletInputs from './components/wallets-inputs/WalletsInputs';


function PaymentAndWallets() {
  return (
    <Box px={{ base: 4, md: 6 }}>
      <StoreDisplay />
      <FinancialServices />
      <MerchantWallet />
      <WalletInputs />
      <WalletInputs isSolana />
      <TokenPay />
    </Box>
  );
}

export default PaymentAndWallets;
