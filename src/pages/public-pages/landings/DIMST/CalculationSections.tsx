import React from 'react'
import useROICalculation from './hooks/useROICalculation';
import HeroBrowser from './hero-browser/HeroBrowser';
import { Flex } from '@chakra-ui/react';
import RuledGrid from 'components/redesign/ruled-grid/RuledGrid';
import Plans from './sections/Plans';
import Protocols from './sections/Protocols';
import ProductDetails from './sections/ProductDetails';
import Metrics from './sections/Metrics';
import CardsOverlay from './sections/components/CardsOverlay';
import CalculationResult from './sections/CalculationResult';
import { Refresh1Lg } from 'assets/icons/Action/Refresh1/Refresh1Lg';
import HeroChildFrame from '../_shared/components/HeroChildFrame';

export default function CalculationSections() {
    const roiCalculationVariables = useROICalculation();

    return (
        <HeroChildFrame>
            <HeroBrowser>
                <Flex gap={{ base: 3, md: 6 }} p={{ base: 3, md: 6 }} flexDirection={{ base: "column", xl: "row" }}>
                    <RuledGrid columns={1} borderRadius={16} width={{ base: "100%", xl: "60%" }}>
                        <Plans roiCalculationVariables={roiCalculationVariables} />
                        <Protocols roiCalculationVariables={roiCalculationVariables} />
                        <ProductDetails roiCalculationVariables={roiCalculationVariables} />
                        <Metrics roiCalculationVariables={roiCalculationVariables} />
                    </RuledGrid>
                    <RuledGrid columns={1} borderRadius={16} width={{ base: "100%", xl: "40%" }} height="min-content">
                        <CardsOverlay title="Return on Investment" icon={<Refresh1Lg color="#fff" />} />
                        <CalculationResult roiCalculationVariables={roiCalculationVariables} />
                    </RuledGrid>
                </Flex>
            </HeroBrowser>
        </HeroChildFrame>

    )
}
