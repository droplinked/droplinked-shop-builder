import { Box, Flex, Text, useBreakpointValue, useDisclosure } from '@chakra-ui/react'
import AppButton from 'components/redesign/button/AppButton'
import { AUTH_ROUTES } from 'constants/authRoutes'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAppStore from 'stores/app/appStore'
import useFollowStatus from '../hook/useFollowStatus'
import MobileProPlanDrawer from './MobileProPlanDrawer'

interface MobileQuestCardProps {
    followStatusHook: ReturnType<typeof useFollowStatus>
}

export default function MobileQuestCard({ followStatusHook }: MobileQuestCardProps) {
    const [loading, setLoading] = useState(false)
    const [unlockedMonths, setUnlockedMonths] = useState(0)
    const navigate = useNavigate()
    const isMobile = useBreakpointValue({ base: true, md: false })
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isLoggedIn } = useAppStore()

    const description = isLoggedIn ? 'Complete Everything Below to Unlock Level 1 Membership' : 'Register to qualify';

    const onClick = async () => {
        if (!isLoggedIn) return navigate(AUTH_ROUTES.SIGN_IN)

        setLoading(true)
        try {
            const result = await followStatusHook.grantProPlan();
            if (result.success) {
                setUnlockedMonths(result.unlockedMonths);
                onOpen()
            }
        }
        catch (error) {
            console.error('Error granting Pro Plan:', error);
        }
        finally {
            setLoading(false)
        }
    }

    if (!isMobile) return null; // Only render on mobile

    return (
        <>
            <Flex
                flexDirection="column"
                gap={3}
                padding={4}
                borderRadius="16px"
                border="1px solid"
                borderColor="neutral.gray.900"
                background="neutral.websiteBackground"
            >
                <Box>
                    <Text fontSize={18} fontWeight={500} color="text.white">Hi There 👋</Text>
                    <Text mt={1} fontSize={14} color="text.subtext.placeholder.dark">{description}</Text>
                </Box>
                <AppButton onClick={onClick} isLoading={loading}>
                    {isLoggedIn ? 'Activate Account' : 'Get Started'}
                </AppButton>
            </Flex>
            <MobileProPlanDrawer isOpen={isOpen} onClose={onClose} unlockedMonths={unlockedMonths} />
        </>
    )
}
