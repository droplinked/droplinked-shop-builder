import { Grid } from "@chakra-ui/react";
import React, { ReactElement, useEffect } from "react";
import PaymentProviderCard from "./PaymentProviderCard";
import AppIcons from "assets/icon/Appicons";
import { useFormikContext } from "formik";
import { ISettings } from "pages/settings/utils/formConfigs";
import useAppStore from "stores/app/appStore";
import { getStripeOnboardingUrl } from "services/stripe/services";
import { useQuery } from "react-query";
import useLocaleResources from "hooks/useLocaleResources/useLocaleResources";

interface Provider {
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
  const { shop } = useAppStore();
  const { t } = useLocaleResources('settings');

  const { onboardedExpressStripeAccount } = shop ?? {};

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
      title: t('settings.financialServices.providers.stripe.title'),
      type: "stripe",
      buttonText: onboardedExpressStripeAccount
        ? t('settings.financialServices.providers.stripe.buttonTextConnected')
        : t('settings.financialServices.providers.stripe.buttonTextNotConnected'),
      link: stripeOnboardingUrl || "https://dashboard.stripe.com/login",
      isExternal: true,
      isFetching: isFetching,
      tooltip: t('settings.financialServices.providers.stripe.tooltip'),
      icon: <AppIcons.StripeS />,
    },
    {
      title: t('settings.financialServices.providers.coinbase.title'),
      type: "coinbase",
      buttonText: t('settings.financialServices.providers.coinbase.buttonText'),
      link: "#",
      isExternal: true,
      tooltip: t('settings.financialServices.providers.coinbase.tooltip'),
      icon: <AppIcons.Coinbase />,
    },
    {
      title: t('settings.financialServices.providers.paymob.title'),
      type: "paymob",
      buttonText: t('settings.financialServices.providers.paymob.buttonText'),
      isExternal: false,
      isDisabled: true,
      tooltip: t('settings.financialServices.providers.paymob.tooltip'),
      icon: <AppIcons.Paymob color="#004eff" />,
    },
  ];

  // Handle toggle for enabling/disabling payment methods
  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const isActive = e.target.checked;
    const upperType = type.toUpperCase();

    if (isActive) {
      let updatedMethods = [...values.paymentMethods];

      // If activating Stripe or Paymob, deactivate the other one
      if (upperType === 'STRIPE' || upperType === 'PAYMOB') {
        updatedMethods = updatedMethods.map(item => ({
          ...item,
          isActive: (item.type === 'STRIPE' || item.type === 'PAYMOB') ?
            item.type === upperType : item.isActive
        }));
      }

      // Add or update the current provider
      const existingIndex = updatedMethods.findIndex(item => item.type === upperType);
      if (existingIndex === -1) {
        updatedMethods.push({ type: upperType, isActive: true });
      } else {
        updatedMethods[existingIndex].isActive = true;
      }

      setFieldValue("paymentMethods", updatedMethods);
    } else {
      // Simply deactivate the current provider
      const updatedMethods = values.paymentMethods.map(item =>
        item.type === upperType ? { ...item, isActive: false } : item
      );

      setFieldValue("paymentMethods", updatedMethods);
    }
  };

  useEffect(() => {

  }, [])

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
          onToggle={(e) => handleToggle(e, provider.type)}
        />
      ))}
    </Grid>
  );
};

export default PaymentProviderList;
