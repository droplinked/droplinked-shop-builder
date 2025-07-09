import { Box, Flex } from '@chakra-ui/react';
import FormattedPrice from 'components/redesign/formatted-price/FormattedPrice';
import React from 'react';
import useROICalculation from '../hooks/useROICalculation';
import TitledText from './components/TitledText';
import AppButton from 'components/redesign/button/AppButton';

interface Props {
    roiCalculationVariables: ReturnType<typeof useROICalculation>;
}

export default function CalculationResult({ roiCalculationVariables }: Props) {
    const { result, handleCalculation } = roiCalculationVariables
    const { ROI, grossCapturedValue, grossInvestment, grossMerchandiseValue } = result

    return (
        <Box padding={6}>
            <Flex flexDirection="column" gap={4}>
                <TitledText
                    direction='row'
                    text={<FormattedPrice price={grossInvestment} fontSize={{ base: 14, md: 16 }} fontWeight={500} />}
                    title="Gross Investment"
                />
                <TitledText
                    direction='row'
                    text={<FormattedPrice price={grossMerchandiseValue} fontSize={{ base: 14, md: 16 }} fontWeight={500} />}
                    title="Gross Merchandise Value (GMV)"
                />
                <TitledText
                    direction='row'
                    text={<FormattedPrice price={grossCapturedValue} fontSize={{ base: 14, md: 16 }} fontWeight={500} />}
                    title="Gross Captured Value"
                />
                <TitledText
                    direction='row'
                    text={<FormattedPrice price={ROI} fontSize={{ base: 14, md: 16 }} fontWeight={500} />}
                    title="Return on Investment (ROI)"
                />
            </Flex>
            <AppButton
                mt={6}
                width="100%"
                variant='outlined'
                borderColor="neutral.gray.900"
                onClick={handleCalculation}
            >
                Calculate
            </AppButton>
        </Box>
    )
}
