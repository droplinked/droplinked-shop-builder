import React from 'react'
import CardsOverlay from './components/CardsOverlay'
import { BlogLg } from 'assets/icons/System/Blog/BlogLg'
import useROICalculation from '../hooks/useROICalculation';
import AppInput from 'components/redesign/input/AppInput';
import { DollarMd } from 'assets/icons/Finance/Dollar/DollarMd';
import { Grid } from '@chakra-ui/react';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';

interface Props {
    roiCalculationVariables: ReturnType<typeof useROICalculation>;
}

export default function ProductDetails({ roiCalculationVariables }: Props) {
    const { t } = useLocaleResources('public-pages/landings/DIMST')

    const { productDetails, updateProductDetails, handleTotalSkusChange } = roiCalculationVariables;

    return (
        <CardsOverlay title={t('productDetails.title')} icon={<BlogLg color='#fff' />}>
            <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
                <AppInput
                    label={t('productDetails.serviceFee')}
                    inputProps={{
                        value: productDetails.serviceFee,
                        onChange: (e) => updateProductDetails("serviceFee", e.target.value),
                        isDisabled: true,
                        type: 'number',
                    }}
                    leftElement={<DollarMd color='#7B7B7B' />}
                    tooltipText={t('productDetails.serviceFeeTooltip')}
                />
                <AppInput
                    label={t('productDetails.totalSkus')}
                    inputProps={{
                        value: productDetails.totalSkus,
                        onChange: (e) => handleTotalSkusChange(e),
                        type: 'number',
                    }}
                />
                <AppInput
                    label={t('productDetails.productRecordCount')}
                    inputProps={{
                        value: productDetails.productRecordCount,
                        onChange: (e) => updateProductDetails("productRecordCount", e.target.value),
                        type: 'number',
                    }}
                />
                <AppInput
                    label={t('productDetails.transactionCount')}
                    inputProps={{
                        value: productDetails.transactionCount,
                        onChange: (e) => updateProductDetails("transactionCount", e.target.value),
                        type: 'number',
                    }}
                />
            </Grid>
        </CardsOverlay>
    )
}
