import { Divider } from '@chakra-ui/react';
import SectionContainer from 'pages/settings/components/common/SectionContainer';
import SectionContent from 'pages/settings/components/common/SectionContent';
import React from 'react';
import WalletFeatures from './components/WalletFeatures';
import WalletInput from './components/WalletInput';
import ManageRechargeButtons from './components/manage-recharge/ManageRechargeButtons';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';

const MerchantWallet: React.FC = () => {
  const { t } = useLocaleResources('settings');

  return (
    <>
      <SectionContainer
        title={t("MerchantWallet.title")}
        rightContent={<ManageRechargeButtons />}
      >
        <SectionContent
          title={t("MerchantWallet.address.title")}
          description={t("MerchantWallet.address.description")}
          rightContent={<WalletInput />}
        >
          <WalletFeatures />
        </SectionContent>
      </SectionContainer>
      <Divider borderColor={'neutral.gray.800'} />
    </>
  );
};

export default MerchantWallet;
