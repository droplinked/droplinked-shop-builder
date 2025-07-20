import { Th, Thead, Tr } from '@chakra-ui/react';
import AppTypography from 'components/common/typography/AppTypography';
import { SubscriptionPlan } from 'services/subscription/interfaces';
import * as React from 'react';
import Plan from './Plan';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';

function PlansHeading({ data }: { data: Array<SubscriptionPlan> }) {
  const { t } = useLocaleResources('subscription');

  return (
    <Thead>
      <Tr>
        <Th px={0} textTransform={"none"} border={"none"}>
          <AppTypography color={"#fff"} width={"200px"} height={"130px"} style={{ textWrap: "wrap" }} lineHeight={"30px"} fontWeight={"700"} fontSize={"18px"}>
            {t('PlansHeading.title')}
          </AppTypography>
        </Th>
        {
          data.map((item, index) => {
            return (
              <Th key={index} px={0} textTransform={"none"} border={"none"}>
                <Plan plan={item} />
              </Th>
            )
          })
        }
      </Tr>
    </Thead>
  );
}

export default PlansHeading;