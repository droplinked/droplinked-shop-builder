import React from 'react'
import useROICalculation from '../hooks/useROICalculation';
import CardsOverlay from './components/CardsOverlay';
import { DashboardLg } from 'assets/icons/System/Dashboard/DashboardLg';
import { Grid } from '@chakra-ui/react';
import AppInput from 'components/redesign/input/AppInput';
import { DollarMd } from 'assets/icons/Finance/Dollar/DollarMd';
import { PercentMd } from 'assets/icons/Sign/Percent/PercentMd';


interface Props {
    roiCalculationVariables: ReturnType<typeof useROICalculation>;
}

export default function Metrics({ roiCalculationVariables }: Props) {
    const { metrics, updateMetrics } = roiCalculationVariables;

    return (
        <CardsOverlay title='Product Details' icon={<DashboardLg color='#fff' />}>
            <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
                <AppInput
                    label='Average Order Value'
                    inputProps={{
                        value: metrics.averageOrderValue,
                        onChange: (e) => updateMetrics("averageOrderValue", e.target.value),
                        type: 'number',
                    }}
                    leftElement={<DollarMd color='#7B7B7B' />}
                    tooltipText='Anticipated retail price of the item sold'
                />
                <AppInput
                    label='Royalty Percentage from Resales'
                    inputProps={{
                        value: metrics.royaltyPercentage,
                        onChange: (e) => updateMetrics("royaltyPercentage", e.target.value),
                        type: 'number',
                    }}
                    leftElement={<PercentMd color='#7B7B7B' />}
                    tooltipText='The payout % of the retail price of an item sold that goes back to originator for ongoing sales'
                />
            </Grid>
            <AppInput
                label='Captured Secondary Sales Percentage'
                inputProps={{
                    value: metrics.CapturedSecondarySalesPercentage,
                    onChange: (e) => updateMetrics("CapturedSecondarySalesPercentage", e.target.value),
                    type: 'number',
                }}
                leftElement={<PercentMd color='#7B7B7B' />}
                tooltipText='The % of anticipated secondary sales captured'
            />
        </CardsOverlay>
    )
}
