import { Box, Flex, Text, useMediaQuery } from '@chakra-ui/react'
import { MagicwandLg } from 'assets/icons/StyleDesigner/MagicWand/MagicwandLg'
import Drawer from 'components/common/Drawer/Drawer'
import ModalHeaderIconWrapper from 'components/redesign/modal-header-icon-wrapper/ModalHeaderIconWrapper'
import React, { useState } from 'react'
import PlanList from '../components/PlanList'
import ExpandableInfo from '../components/ExpandableInfo'
import PlanFeatures from './PlanFeatures'
import { proPlanFeatures } from 'pages/onboarding/constants/plans'

interface Props {
    isOpen: boolean
    onClose: () => void
    onNextStep: () => void
    onPrevStep: () => void
}

export default function PlansDrawer({ isOpen, onClose, onNextStep }: Props) {
    const [selectedPlan, setSelectedPlan] = useState("")
    const [isSmallerThan768] = useMediaQuery("(max-width: 768px)")
    const title = "Use droplinked AI to create your shop"
    const description = "Feel free to use our AI tools to customize your shop. Subscribe below to get started."

    return (
        <Drawer
            isOpen={isOpen}
            onClose={onClose}
            drawerContentStyle={{
                borderTopRadius: 16
            }}
            drawerHeaderStyle={{
                padding: { base: 4, md: "48px" }
            }}
            placement='bottom'
            showSubmitButtons
            discardButtonText='Close'
            saveButtonText='Claim Trial Now'
            drawerFooterProps={{
                padding: { base: 4, md: "24px 48px" },
                background: "#1C1C1C",
                justifyContent: { base: "center", md: "space-between" },
                gap: 4,
                width: "100%",
            }}
            saveButtonProps={{
                width: { base: "100%", md: "auto" }
            }}
            onClick={onNextStep}
            {...isSmallerThan768 && {
                title,
                description
            }}
            {...!isSmallerThan768 && {
                icon: (
                    <Box display={{ base: "none", md: "block" }}>
                        <ModalHeaderIconWrapper>
                            <MagicwandLg color='#fff' />
                        </ModalHeaderIconWrapper>
                    </Box>
                ),
                headerContent: (
                    <Flex flexDirection="column" gap={2}>
                        <Text fontSize={24} fontWeight={700} color="#fff">
                            {title}
                        </Text>
                        <Text fontSize={14} color="#B1B1B1">
                            {description}
                        </Text>
                    </Flex>
                )
            }}
        >
            <Flex direction="column" gap={4} background="#1C1C1C">
                <PlanList
                    selectedPlan={selectedPlan}
                    setSelectedPlan={(selectedPlan) => setSelectedPlan(selectedPlan)}
                />
                <ExpandableInfo
                    icon={<MagicwandLg color='#fff' />}
                    title="Pro Plan"
                    description="For small businesses and teams ready to grow."
                >
                    <PlanFeatures features={proPlanFeatures} />
                </ExpandableInfo>
            </Flex>
        </Drawer>
    )
}
