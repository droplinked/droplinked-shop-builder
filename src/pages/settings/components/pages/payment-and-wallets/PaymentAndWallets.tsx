import { Box, Divider } from '@chakra-ui/react';
import React from 'react';
import FinancialServices from './components/financial-services/FinancialServices';
import MerchantWallet from './components/merchant-wallet/MerchantWallet';
import StoreDisplay from './components/store-display/StoreDisplay';
import TokenPay from './components/token-pay/TokenPay';
import WalletInputs from './components/wallets-inputs/WalletsInputs';


function PaymentAndWallets() {
  return (
    <Box>
      <StoreDisplay />
      <FinancialServices />
      <MerchantWallet />
      <WalletInputs />
      <Divider borderColor={"#292929"} />
      <WalletInputs isSolana />
      <Divider borderColor={"#292929"} />
      <TokenPay />
    </Box>
  );
}

export default PaymentAndWallets;
