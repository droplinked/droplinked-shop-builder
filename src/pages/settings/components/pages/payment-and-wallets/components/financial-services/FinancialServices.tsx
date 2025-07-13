import { Divider } from '@chakra-ui/react';
import SectionContainer from 'pages/settings/components/common/SectionContainer';
import SectionContent from 'pages/settings/components/common/SectionContent';
import React from 'react';
import PaymentProviderList from './components/PaymentProviderList';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';

const FinancialServices: React.FC = () => {
  const { t } = useLocaleResources('settings');

  return (
    <>
      <SectionContainer title={t('settings.financialServices.title')}>
        <SectionContent
          title={t('settings.financialServices.paymentProviders.title')}
          description={t('settings.financialServices.paymentProviders.description')}
          rightContent={<PaymentProviderList />}
        />
      </SectionContainer>
      <Divider borderColor={'neutral.gray.800'} />
    </>
  );
};

export default FinancialServices;
