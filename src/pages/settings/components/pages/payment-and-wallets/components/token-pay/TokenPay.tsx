import { Box, Flex, Image, Grid } from '@chakra-ui/react';
import AppIcons from 'assest/icon/Appicons';
import Button from 'components/redesign/button/Button';
import useAppStore from 'lib/stores/app/appStore';
import SectionContainer from 'pages/settings/components/common/SectionContainer';
import SectionContent from 'pages/settings/components/common/SectionContent';
import React, { useState } from 'react';
import TokenPayInformation from './TokenPayInformation';
import PaymentToken from './PaymentToken';
import TokensModal from './tokens-modal/TokensModal';

const TokenPay: React.FC = () => {
  const { shop: { paymentMethods } } = useAppStore()
  // const [paymentList, setPaymentList] = useState([])

  return (
    <>
      <SectionContainer
        title="Tokenpay"
        rightContent={
          <Button variant="outline" border={"none"} color="#179ef8" size="sm">
            <AppIcons.BluePlus />
            Payment Token
          </Button>
        }
      >
        <SectionContent
          title="Payment Tokens"
          description="Enable checkout payments for any native ERC20, BRC20 and SPL (Solana) based tokens."
          rightContent={
            !paymentMethods?.length ?
              <Image src="/assets/images/Revenue Sharing.svg" height="100%" width="100%" />
              :
              <Grid
                templateColumns={{
                  base: "1fr",
                  md: "1fr",
                  lg: "repeat(2, 1fr)"
                }}
                gap={4}
              >
                <PaymentToken title='USDC' icon={<AppIcons.CircleUsdc />} onClick={() => console.log("hi")} />
                <PaymentToken title='USDC' icon={<AppIcons.CircleUsdc />} onClick={() => console.log("hi")} />
              </Grid>
          }
        >
          <TokenPayInformation />
          <TokensModal />
        </SectionContent>
      </SectionContainer>
    </>
  );
};

export default TokenPay;
