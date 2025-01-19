import { Grid, Image, useDisclosure } from "@chakra-ui/react";
import AppIcons from "assest/icon/Appicons";
import BlockchainDisplay from "components/common/blockchainDisplay/BlockchainDisplay";
import { useFormikContext } from "formik";
import { paymentPublicServiceV2 } from "lib/apis/shop/shopServices";
import useAppStore from "lib/stores/app/appStore";
import SectionContainer from "pages/settings/components/common/SectionContainer";
import SectionContent from "pages/settings/components/common/SectionContent";
import { ISettings } from "pages/settings/formConfigs";
import React from "react";
import { useQuery } from "react-query";
import PaymentToken from "./PaymentToken";
import TokenPayInformation from "./TokenPayInformation";
import TokensModal from "./tokens-modal/TokensModal";
import BlueButton from "components/redesign/button/BlueButton";

const TokenPay: React.FC = () => {
  const { values, setFieldValue } = useFormikContext<ISettings>();
  const { onClose, onOpen, isOpen } = useDisclosure();
  const { shop: { paymentMethods } } = useAppStore();
  const { isFetching, data } = useQuery({
    queryKey: "PaymentMethods",
    queryFn: () => paymentPublicServiceV2(),

  });
  const paymentMethodsData = data?.data?.data ?? []

  const handleRemovePaymentToken = (type: string) => {
    setFieldValue("paymentMethods", values.paymentMethods.filter((item) => item.type !== type));
  };

  return (
    <SectionContainer
      title="Tokenpay"
      rightContent={
        <BlueButton
          fontSize={16}
          fontWeight={500}
          onClick={onOpen}
          isLoading={isFetching}
        >
          <AppIcons.BluePlus />
          Payment Token
        </BlueButton>
      }
    >
      <SectionContent
        title="Payment Tokens"
        description="Enable checkout payments for any native ERC20, BRC20 and SPL (Solana) based tokens."
        rightContent={
          !paymentMethods?.length ? (
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
                (item) => (item.type !== "STRIPE" && item.type !== "COINBASE") &&
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
