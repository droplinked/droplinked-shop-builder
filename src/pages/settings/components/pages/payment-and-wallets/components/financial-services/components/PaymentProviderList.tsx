import { Grid } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import PaymentProviderCard from "./PaymentProviderCard";
import AppIcons from "assets/icon/Appicons";
import { useFormikContext } from "formik";
import { ISettings } from "pages/settings/formConfigs";

interface Provider {
  title: string;
  buttonText: string;
  link?: string;
  tooltip?: string;
  icon: ReactElement;
  type: "stripe" | "coinbase" | "paymob";
  isExternal: boolean;
  isDisabled?: boolean;
}

const PaymentProviderList: React.FC = () => {
  const { values, setFieldValue } = useFormikContext<ISettings>();

  // Define payment providers with their details
  const providers: Provider[] = [
    {
      title: "Stripe",
      type: "stripe",
      buttonText: "View Account",
      link: "https://dashboard.stripe.com/login",
      isExternal: true,
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

  return (
    <Grid
      templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
      gap={4}
      overflow="hidden"
    >
      {providers.map(({ title, buttonText, link, type, tooltip, icon, isExternal, isDisabled }) => (
        <PaymentProviderCard
          key={type}
          isDisabled={isDisabled}
          type={type}
          title={title}
          buttonText={buttonText}
          onToggle={(e) => handleToggle(e, type)}
          link={link}
          tooltip={tooltip}
          icon={icon}
          isExternal={isExternal}
        />
      ))}
    </Grid>
  );
};

export default PaymentProviderList;
