import React from 'react'
import useROICalculation from '../hooks/useROICalculation';
import CardsOverlay from './components/CardsOverlay';
import { DashboardLg } from 'assets/icons/System/Dashboard/DashboardLg';
import { Grid } from '@chakra-ui/react';
import AppInput from 'components/redesign/input/AppInput';
import { DollarMd } from 'assets/icons/Finance/Dollar/DollarMd';
import { PercentMd } from 'assets/icons/Sign/Percent/PercentMd';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';


interface Props {
    roiCalculationVariables: ReturnType<typeof useROICalculation>;
}

export default function Metrics({ roiCalculationVariables }: Props) {
    const { t } = useLocaleResources('public-pages/landings/DIMST')

    const { metrics, updateMetrics } = roiCalculationVariables;

    return (
        <CardsOverlay title={t('metrics.title')} icon={<DashboardLg color='#fff' />}>
            <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
                <AppInput
                    label={t('metrics.averageOrderValue')}
                    inputProps={{
                        value: metrics.averageOrderValue,
                        onChange: (e) => updateMetrics("averageOrderValue", e.target.value),
                        type: 'number',
                    }}
                    leftElement={<DollarMd color='#7B7B7B' />}
                    tooltipText={t('metrics.averageOrderValueTooltip')}
                />
                <AppInput
                    label={t('metrics.royaltyPercentage')}
                    inputProps={{
                        value: metrics.royaltyPercentage,
                        onChange: (e) => updateMetrics("royaltyPercentage", e.target.value),
                        type: 'number',
                    }}
                    leftElement={<PercentMd color='#7B7B7B' />}
                    tooltipText={t('metrics.royaltyPercentageTooltip')}
                />
            </Grid>
            <AppInput
                label={t('metrics.capturedSecondarySalesPercentage')}
                inputProps={{
                    value: metrics.CapturedSecondarySalesPercentage,
                    onChange: (e) => updateMetrics("CapturedSecondarySalesPercentage", e.target.value),
                    type: 'number',
                }}
                leftElement={<PercentMd color='#7B7B7B' />}
                tooltipText={t('metrics.capturedSecondarySalesPercentageTooltip')}
            />
        </CardsOverlay>
    )
}
