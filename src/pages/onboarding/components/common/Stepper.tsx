import { Box, Flex } from '@chakra-ui/react'
import { PriceplanMd } from 'assets/icons/Finance/PricePlan/PriceplanMd'
import { WalletMd } from 'assets/icons/Finance/Wallet/WalletMd'
import { ShopMd } from 'assets/icons/System/Shop/ShopMd'
import IconWrapper from 'components/redesign/icon-wrapper/IconWrapper'
import React, { cloneElement, Fragment } from 'react'
import useOnboardingStore from '../../stores/useOnboardingStore'

function Stepper() {
    const { currentStep } = useOnboardingStore()

    // Render the stepper only for steps 4, 5, and 6 (where currentStep is 1-based)
    if (currentStep < 4 || currentStep > 6) return null

    const steps = [<ShopMd />, <WalletMd />, <PriceplanMd />]

    const getStepStyles = (index: number) => {
        // Adjust currentStep to 0-based and map to our 3 steps starting at step 4
        const adjustedStep = currentStep - 4 // Maps step 4 to index 0, step 5 to 1, step 6 to 2

        if (index < adjustedStep)
            return { iconColor: '#2BCFA1', borderColor: '#2BCFA11A', bg: '#2BCFA11A' } // Completed steps

        if (index === adjustedStep)
            return { iconColor: '#2BCFA1', borderColor: '#2BCFA1', bg: '#2BCFA11A' } // Current step

        return { iconColor: '#4F4F4F', borderColor: '#292929', bg: 'transparent' } // Future steps
    }

    return (
        <Flex alignItems="center" gap={3}>
            {steps.map((step, index) => {
                const { iconColor, borderColor, bg } = getStepStyles(index)

                return (
                    <Fragment key={index}>
                        <IconWrapper
                            w={10}
                            h={10}
                            icon={cloneElement(step, { color: iconColor })}
                            borderColor={borderColor}
                            bg={bg}
                        />

                        {index < steps.length - 1 && (
                            <Box
                                flex="1"
                                h="1px"
                                borderRadius="2px"
                                bg={currentStep > (index + 4) ? "#2BCFA1" : "#292929"}
                            />
                        )}
                    </Fragment>
                )
            })}
        </Flex>
    )
}

export default Stepper