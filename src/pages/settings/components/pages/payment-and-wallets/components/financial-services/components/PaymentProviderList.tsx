import { Grid } from "@chakra-ui/react";
import React, { ReactElement, useEffect } from "react";
import PaymentProviderCard from "./PaymentProviderCard";
import AppIcons from "assets/icon/Appicons";
import { useFormikContext } from "formik";
import { ISettings } from "pages/settings/formConfigs";
import useAppStore from "lib/stores/app/appStore";
import { getStripeOnboardingUrl } from "lib/apis/stripe/services";
import { useQuery } from "react-query";

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

  const { onboardedExpressStripeAccount } = shop ?? {};

  const { isFetching, data: stripeOnboardingUrl } = useQuery({
    queryKey: ['stripeOnboardingUrl'],
    queryFn: () => getStripeOnboardingUrl(),
    enabled: !onboardedExpressStripeAccount,
    select(data) {
      return data.data.url;
    },
  });

  // Define payment providers with their details
  const providers: Provider[] = [
    {
      title: "Stripe",
      type: "stripe",
      buttonText: onboardedExpressStripeAccount ? "View Account" : "Connect",
      link: stripeOnboardingUrl || "https://dashboard.stripe.com/login",
      isExternal: true,
      isLinkDisabled: true,
      isFetching: isFetching,
      tooltip: "Connect a Stripe account to receive deposits directly into an existing account.",
      icon: <AppIcons.StripeS />,
    },
    {
      title: "Coinbase Commerce",
      type: "coinbase",
      buttonText: "Learn More",
      link: "#",
      isExternal: true,
      tooltip: "The easy way to accept payments from around the world. Instant settlement, low fees, and broad support for over +200 digital assets.",
      icon: <AppIcons.Coinbase />,
    },
    {
      title: "Paymob",
      type: "paymob",
      buttonText: "Connect",
      isExternal: false,
      isDisabled: true,
      tooltip: "Connect a Paymob account to receive deposits directly into an existing account.",
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
