import React from 'react'
import CardsOverlay from './components/CardsOverlay'
import { BlogLg } from 'assets/icons/System/Blog/BlogLg'
import useROICalculation from '../hooks/useROICalculation';
import AppInput from 'components/redesign/input/AppInput';
import { DollarMd } from 'assets/icons/Finance/Dollar/DollarMd';
import { Grid } from '@chakra-ui/react';

interface Props {
    roiCalculationVariables: ReturnType<typeof useROICalculation>;
}

export default function ProductDetails({ roiCalculationVariables }: Props) {
    const { productDetails, updateProductDetails, handleTotalSkusChange } = roiCalculationVariables;

    return (
        <CardsOverlay title='Product Details' icon={<BlogLg color='#fff' />}>
            <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
                <AppInput
                    label='Service Fee'
                    inputProps={{
                        value: productDetails.serviceFee,
                        onChange: (e) => updateProductDetails("serviceFee", e.target.value),
                        isDisabled: true,
                        type: 'number',
                    }}
                    leftElement={<DollarMd color='#7B7B7B' />}
                    tooltipText='Baseline cost associated with plan selected'
                />
                <AppInput
                    label='Total SKUs'
                    inputProps={{
                        value: productDetails.totalSkus,
                        onChange: (e) => handleTotalSkusChange(e),
                        type: 'number',
                    }}
                />
                <AppInput
                    label='Product Record Count'
                    inputProps={{
                        value: productDetails.productRecordCount,
                        onChange: (e) => updateProductDetails("productRecordCount", e.target.value),
                        type: 'number',
                    }}
                />
                <AppInput
                    label='Transaction Count'
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
