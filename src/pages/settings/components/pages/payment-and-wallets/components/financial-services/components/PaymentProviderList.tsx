import { Flex } from "@chakra-ui/react";
import React, { ReactElement, useState } from "react";
import PaymentProviderCard from "./PaymentProviderCard";
import AppIcons from "assest/icon/Appicons";

interface Provider {
  title: string;
  isChecked: boolean;
  buttonText: string;
  link: string;
  tooltip: string;
  icon: ReactElement;
}

const PaymentProviderList: React.FC = () => {
  const [providers, setProviders] = useState<Provider[]>([
    {
      title: "Stripe",
      isChecked: true,
      buttonText: "View Account",
      link: "https://dashboard.stripe.com/login",
      tooltip:
        "Connect a Stripe account to receive deposits directly into an existing account.",
      icon: <AppIcons.StripeS />,
    },
    // { title: "Coinbase Commerce", isChecked: true, buttonText: "Learn More", link: "#", tooltip: "The easy way to accept payments from around the world. Instant settlement, low fees, and broad support for over +200 digital assets." },
  ]);

  const handleToggle = (title: string) => {
    setProviders((prevProviders) =>
      prevProviders.map((provider) =>
        provider.title === title
          ? { ...provider, isChecked: !provider.isChecked }
          : provider
      )
    );
  };

  return (
    <Flex gap="4" height="128px" overflow="hidden">
      {providers.map(
        ({ title, buttonText, isChecked, link, tooltip, icon }) => (
          <PaymentProviderCard
            key={title}
            title={title}
            buttonText={buttonText}
            isChecked={isChecked}
            onToggle={() => handleToggle(title)}
            link={link}
            tooltip={tooltip}
            icon={icon}
          />
        )
      )}
    </Flex>
  );
};

export default PaymentProviderList;
