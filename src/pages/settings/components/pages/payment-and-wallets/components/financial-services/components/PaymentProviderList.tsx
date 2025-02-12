import { Grid } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import PaymentProviderCard from "./PaymentProviderCard";
import AppIcons from "assest/icon/Appicons";
import { useFormikContext } from "formik";
import { ISettings } from "pages/settings/formConfigs";

interface Provider {
  title: string;
  buttonText: string;
  link: string;
  tooltip?: string;
  icon: ReactElement;
  type: "stripe" | "coinbase";
  isExternal: boolean;
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
      type: "coinbase",
      buttonText: "Connect",
      link: "#",
      isExternal: false,
      icon: <AppIcons.Paymob color="#004eff" />,
    },
  ];

  // Handle toggle for enabling/disabling payment methods
  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const isActive = e.target.checked;

    // Update payment methods array based on toggle state
    const updatedMethods = values.paymentMethods.map((item) =>
      item.type === type.toUpperCase()
        ? { ...item, isActive }
        : item
    );

    if (!values.paymentMethods.some((item) => item.type === type.toUpperCase())) {
      updatedMethods.push({ type: type.toUpperCase(), isActive });
    }

    setFieldValue("paymentMethods", updatedMethods);
  };

  return (
    <Grid
      templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
      gap={4}
      overflow="hidden"
    >
      {providers.map(({ title, buttonText, link, type, tooltip, icon, isExternal }) => (
        <PaymentProviderCard
          key={type}
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
