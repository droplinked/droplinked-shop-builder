import { Divider } from '@chakra-ui/react';
import SectionContainer from 'pages/settings/components/common/SectionContainer';
import SectionContent from 'pages/settings/components/common/SectionContent';
import React from 'react';
import PaymentProviderList from './components/PaymentProviderList';

const FinancialServices: React.FC = () => {
  return (
    <>
      <SectionContainer title=" Financial Services">
        <SectionContent
          title=" Payment Providers"
          description="Manage payment gateways and partnered services."
          rightContent={<PaymentProviderList />}
        />
      </SectionContainer>
      <Divider borderColor={'neutral.gray.800'} />
    </>
  );
};

export default FinancialServices;
