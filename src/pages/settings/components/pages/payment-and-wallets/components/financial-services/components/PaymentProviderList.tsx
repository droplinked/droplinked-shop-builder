import { Flex } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import PaymentProviderCard from "./PaymentProviderCard";
import AppIcons from "assest/icon/Appicons";
import { useFormikContext } from "formik";
import { ISettings } from "pages/settings/formConfigs";

interface Provider {
  title: string;
  buttonText: string;
  link: string;
  tooltip: string;
  icon: ReactElement;
  type: "stripe" | "coinbase";
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
      tooltip: "Connect a Stripe account to receive deposits directly into an existing account.",
      icon: <AppIcons.StripeS />,
    },
    {
      title: "Coinbase Commerce",
      type: "coinbase",
      buttonText: "Learn More",
      link: "#",
      tooltip: "The easy way to accept payments from around the world. Instant settlement, low fees, and broad support for over +200 digital assets.",
      icon: <AppIcons.Coinbase />,
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
    <Flex flexDir={{ base: "column", sm: "row" }} gap={4} height="128px" overflow="hidden">
      {providers.map(({ title, buttonText, link, type, tooltip, icon }) => (
        <PaymentProviderCard
          key={type}
          type={type}
          title={title}
          buttonText={buttonText}
          onToggle={(e) => handleToggle(e, type)}
          link={link}
          tooltip={tooltip}
          icon={icon}
        />
      ))}
    </Flex>
  );
};

export default PaymentProviderList;
