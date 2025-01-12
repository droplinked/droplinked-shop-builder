import { Divider } from '@chakra-ui/react';
import SectionContainer from 'pages/settings/components/common/SectionContainer';
import SectionContent from 'pages/settings/components/common/SectionContent';
import React from 'react';
import WalletFeatures from './components/WalletFeatures';
import WalletInput from './components/WalletInput';
import ManageRechargeButtons from './components/manage-recharge/ManageRechargeButtons';
import DefaultBadge from '../../../../common/DefaultBadge';

const MerchantWallet: React.FC = () => {
  return (
    <>
      <SectionContainer
        title=" Merchant Wallet"
        badge={
          <DefaultBadge isDefault={true} onClick={() => console.log("hi")} />
        }
        rightContent={
          <ManageRechargeButtons />
        }
      >
        <SectionContent
          title="Address"
          description="The merchant wallet enables USDC acceptance for all businesses. It offers a secure and seamless way to manage revenue while minimizing merchant processing fees."
          rightContent={
            <WalletInput />
          }
        >
          <WalletFeatures />
        </SectionContent>
      </SectionContainer>
      <Divider borderColor={'#292929'} />
    </>
  );
};

export default MerchantWallet;
