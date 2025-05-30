import { Grid, Image, useDisclosure } from "@chakra-ui/react";
import AppIcons from "assets/icon/Appicons";
import BlockchainDisplay from "components/common/blockchainDisplay/BlockchainDisplay";
import { useFormikContext } from "formik";
import useLocaleResources from "hooks/useLocaleResources/useLocaleResources";
import { paymentPublicServiceV2 } from "services/shop/shopServices";
import SectionContainer from "pages/settings/components/common/SectionContainer";
import SectionContent from "pages/settings/components/common/SectionContent";
import { ISettings } from "pages/settings/utils/formConfigs";
import React from "react";
import { useQuery } from "react-query";
import PaymentToken from "./PaymentToken";
import TokenPayInformation from "./TokenPayInformation";
import TokensModal from "./tokens-modal/TokensModal";
import BlueButton from "components/redesign/button/BlueButton";

const TokenPay: React.FC = () => {
  const { t } = useLocaleResources('settings');
  const { values, setFieldValue } = useFormikContext<ISettings>();
  const { onClose, onOpen, isOpen } = useDisclosure();
  const { isFetching, data } = useQuery({
    queryKey: "PaymentMethods",
    queryFn: () => paymentPublicServiceV2(),

  });
  const paymentMethodsData = data?.data?.data ?? []
  const paymentProviders = ["STRIPE", "COINBASE", "PAYMOB"];
  const isPaymentMethodsEmpty = values.paymentMethods?.filter((item) => !paymentProviders.includes(item.type)).length === 0;

  const handleRemovePaymentToken = (type: string) => {
    setFieldValue("paymentMethods", values.paymentMethods.filter((item) => item.type !== type));
  };

  return (
    <SectionContainer
      title={t('settings.paymentsWallets.tokenPay.title')}
      rightContent={
        <BlueButton
          fontSize={12}
          fontWeight={500}
          onClick={onOpen}
          isLoading={isFetching}
        >
          <AppIcons.BluePlus style={{ width: "16px", height: "16px" }} />
          {t('settings.paymentsWallets.tokenPay.paymentTokens.addButton')}
        </BlueButton>
      }
    >
      <SectionContent
        title={t('settings.paymentsWallets.tokenPay.paymentTokens.title')}
        description={t('settings.paymentsWallets.tokenPay.paymentTokens.description')}
        rightContent={
          isPaymentMethodsEmpty ? (
            <Image src="/assets/images/Revenue Sharing.svg" height="100%" width="100%" />
          ) : (
            <Grid
              templateColumns={{
                base: "1fr",
                md: "1fr",
                lg: "repeat(2, 1fr)",
              }}
              gap={4}
            >
              {values.paymentMethods.map(
                (item) => (!paymentProviders.includes(item.type)) &&
                  <PaymentToken
                    key={item.type}
                    title={item.type}
                    icon={<BlockchainDisplay blockchain={item.type} show="icon" />}
                    onClick={() => handleRemovePaymentToken(item.type)}
                  />
              )}
            </Grid>
          )
        }
      >
        <TokenPayInformation />
        <TokensModal paymentMethodsData={paymentMethodsData} isOpen={isOpen} onClose={onClose} />
      </SectionContent>
    </SectionContainer>
  );
};

export default TokenPay;
