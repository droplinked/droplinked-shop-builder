import { Grid } from "@chakra-ui/react";
import { CoinbaseLogo } from "assets/logo/NetworkAndTokens/Coinbase/Coinbase/CoinbaseLogo";
import { PaymobLogo } from "assets/logo/NetworkAndTokens/Paymob/PaymobLogo";
import { StripeLogo } from "assets/logo/NetworkAndTokens/Stripe/StripeLogo";
import { useFormikContext } from "formik";
import useLocaleResources from "hooks/useLocaleResources/useLocaleResources";
import { ISettings } from "pages/settings/utils/formConfigs";
import React, { ReactElement } from "react";
import { useQuery } from "react-query";
import { getStripeOnboardingUrl } from "services/stripe/services";
import useAppStore from "stores/app/appStore";
import PaymentProviderCard from "./PaymentProviderCard";

export interface Provider {
  title: string;
  buttonText: string;
  link?: string;
  tooltip?: string;
  icon: ReactElement;
  type: "stripe" | "coinbase" | "paymob";
  isExternal: boolean;
  isDisabled?: boolean;
  isLinkDisabled?: boolean;
  isFetching?: boolean;
}

const PaymentProviderList: React.FC = () => {
  const { values, setFieldValue } = useFormikContext<ISettings>();
  const { shop: { onboardedExpressStripeAccount } } = useAppStore();
  const { t } = useLocaleResources('settings');

  const { isFetching, data: stripeOnboardingUrl } = useQuery({
    queryKey: ['stripeOnboardingUrl'],
    queryFn: () => getStripeOnboardingUrl(),
    enabled: !onboardedExpressStripeAccount,
    retry: false,
    select(data) {
      return data.data.url;
    },
  });

  // Define payment providers with their details
  const providers: Provider[] = [
    {
      title: t('FinancialServices.providers.stripe.title'),
      type: "stripe",
      buttonText: onboardedExpressStripeAccount
                    ? t('FinancialServices.providers.stripe.buttonTextConnected')
            : t('FinancialServices.providers.stripe.buttonTextNotConnected'),
      link: stripeOnboardingUrl || "https://dashboard.stripe.com/login",
      isExternal: true,
      isFetching: isFetching,
              tooltip: t('FinancialServices.providers.stripe.tooltip'),
      icon: <StripeLogo />,
    },
    {
      title: t('FinancialServices.providers.coinbase.title'),
      type: "coinbase",
      buttonText: t('FinancialServices.providers.coinbase.buttonText'),
      link: "#",
      isExternal: true,
      tooltip: t('FinancialServices.providers.coinbase.tooltip'),
      icon: <CoinbaseLogo />,
    },
    {
      title: t('FinancialServices.providers.paymob.title'),
      type: "paymob",
      buttonText: t('FinancialServices.providers.paymob.buttonText'),
      isExternal: false,
      isDisabled: true,
      tooltip: t('FinancialServices.providers.paymob.tooltip'),
      icon: <PaymobLogo />,
    },
  ];

  // Handle toggle for enabling/disabling payment methods
  const handleToggle = (isActive: boolean, type: string) => {
    const upperType = type.toUpperCase();

    if (!isActive) {
      // Simply deactivate the current provider
      const updatedMethods = values.paymentMethods.map(item =>
        item.type === upperType
          ? { ...item, isActive: false }
          : item
      );

      setFieldValue("paymentMethods", updatedMethods);
      return;
    }

    let updatedMethods = [...values.paymentMethods];

    // If activating Stripe or Paymob, deactivate the other one
    if (upperType === 'STRIPE' || upperType === 'PAYMOB') {
      updatedMethods = updatedMethods.map(item => ({
        ...item,
        isActive: (item.type === 'STRIPE' || item.type === 'PAYMOB')
          ? item.type === upperType
          : item.isActive
      }));
    }

    // Add or update the current provider
    const existingIndex = updatedMethods.findIndex(item => item.type === upperType);
    if (existingIndex === -1) updatedMethods.push({ type: upperType, isActive: true });
    else updatedMethods[existingIndex].isActive = true;

    setFieldValue("paymentMethods", updatedMethods);
  };

  return (
    <Grid
      templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
      gap={4}
      overflow="hidden"
    >
      {providers.map((provider) => (
        <PaymentProviderCard
          key={provider.type}
          item={provider}
          onToggle={(e) => handleToggle(e.target.checked, provider.type)}
        />
      ))}
    </Grid>
  );
};

export default PaymentProviderList;
