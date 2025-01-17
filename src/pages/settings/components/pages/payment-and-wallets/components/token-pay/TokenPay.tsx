import { Image, Grid, useDisclosure } from '@chakra-ui/react';
import AppIcons from 'assest/icon/Appicons';
import Button from 'components/redesign/button/Button';
import useAppStore from 'lib/stores/app/appStore';
import SectionContainer from 'pages/settings/components/common/SectionContainer';
import SectionContent from 'pages/settings/components/common/SectionContent';
import React, { useState } from 'react';
import TokenPayInformation from './TokenPayInformation';
import PaymentToken from './PaymentToken';
import TokensModal from './tokens-modal/TokensModal';
import { useQuery } from 'react-query';
import { paymentPublicServiceV2 } from 'lib/apis/shop/shopServices';
import { IPaymentPublicService } from 'lib/apis/shop/interfaces';

const TokenPay: React.FC = () => {
  const [paymentMethodsData, setPaymentMethodsData] = useState<IPaymentPublicService[]>([]);
  const { onClose, onOpen, isOpen } = useDisclosure()
  const { shop: { paymentMethods } } = useAppStore()
  const { isFetching } = useQuery({
    queryKey: "PaymentMethods",
    queryFn: () => paymentPublicServiceV2(),
    onSuccess(data) {
      setPaymentMethodsData(data.data.data)
    },
  });

  return (
    <>
      <SectionContainer
        title="Tokenpay"
        rightContent={
          <Button onClick={onOpen} isLoading={isFetching} variant="outline" border={"none"} color="#179ef8" size="sm">
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
                <PaymentToken title='USDC' icon={<AppIcons.Usdc />} onClick={() => console.log("hi")} />
                <PaymentToken title='USDC' icon={<AppIcons.Usdc />} onClick={() => console.log("hi")} />
              </Grid>
          }
        >
          <TokenPayInformation />
          <TokensModal
            paymentMethodsData={paymentMethodsData}
            setPaymentMethodData={(value) => setPaymentMethodsData(value)}
            isOpen={isOpen}
            onClose={onClose}
          />
        </SectionContent>
      </SectionContainer>
    </>
  );
};

export default TokenPay;
