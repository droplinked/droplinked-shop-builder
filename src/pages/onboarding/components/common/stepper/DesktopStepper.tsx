import { Box, Flex } from '@chakra-ui/react'
import { PriceplanMd } from 'assets/icons/Finance/PricePlan/PriceplanMd'
import { WalletMd } from 'assets/icons/Finance/Wallet/WalletMd'
import { ShopMd } from 'assets/icons/System/Shop/ShopMd'
import IconWrapper from 'components/redesign/icon-wrapper/IconWrapper'
import React, { cloneElement, Fragment } from 'react'
import useOnboardingStore from '../../../stores/useOnboardingStore'

function DesktopStepper() {
    const { currentStep } = useOnboardingStore()

    const steps = [
        { icon: <ShopMd />, name: 'STORE_DETAILS' },
        { icon: <WalletMd />, name: 'PAYMENT_DETAILS' },
        { icon: <PriceplanMd />, name: 'PLAN_SELECTION' }
    ]

    function getStepStyles(index: number) {
        const currentIndex = steps.findIndex(step => step.name === currentStep)
        if (currentIndex === -1) {
            return { iconColor: '#4F4F4F', borderColor: '#292929', bg: 'transparent' }
        }
        if (index < currentIndex) {
            return { iconColor: '#2BCFA1', borderColor: '#2BCFA11A', bg: '#2BCFA11A' }
        }
        if (index === currentIndex) {
            return { iconColor: '#2BCFA1', borderColor: '#2BCFA1', bg: '#2BCFA11A' }
        }
        return { iconColor: '#4F4F4F', borderColor: '#292929', bg: 'transparent' }
    }

    return (
        <Flex alignItems="center" gap={3} width="100%">
            {steps.map((step, index) => {
                const { iconColor, borderColor, bg } = getStepStyles(index)
                const isPastStep = steps.findIndex(s => s.name === currentStep) > index

                return (
                    <Fragment key={step.name}>
                        <IconWrapper
                            w={10}
                            h={10}
                            icon={cloneElement(step.icon, { color: iconColor })}
                            borderColor={borderColor}
                            bg={bg}
                            transition="all 0.5s ease-in-out"
                            transitionDelay={`${index * 0.5}s`}
                        />
                        {index < steps.length - 1 && (
                            <Box position="relative" flex="1" h="1px">
                                <Box position="absolute" w="100%" h="1px" bg="#292929" />
                                <Box
                                    position="absolute"
                                    h="1px"
                                    bg="#2BCFA1"
                                    w={isPastStep ? '100%' : '0%'}
                                    transition="width 0.5s ease-in-out"
                                    transitionDelay={`${index * 0.5}s`}
                                />
                            </Box>
                        )}
                    </Fragment>
                )
            })}
        </Flex>
    )
}

export default DesktopStepper