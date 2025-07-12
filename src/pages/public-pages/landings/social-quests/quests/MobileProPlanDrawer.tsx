import { Box, Flex } from '@chakra-ui/react'
import { MedalstarLg } from 'assets/icons/System/MedalStar/MedalstarLg'
import Drawer from 'components/common/Drawer/Drawer'
import React from 'react'
import ProPlanCard from './pro-plan-modal/ProPlanCard'
import ProPlanFooter from './pro-plan-modal/ProPlanFooter'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

interface Props {
    isOpen: boolean
    onClose: () => void
    unlockedMonths: number
}

export default function MobileProPlanDrawer({ isOpen, onClose, unlockedMonths }: Props) {
    const { t } = useLocaleResources('public-pages/landings/social-quests');

    return (
        <Drawer
            isOpen={isOpen}
            onClose={onClose}
            icon={
                <Flex
                    width="min-content"
                    p={2}
                    bg="rgba(43, 206, 161, 0.1)"
                    borderRadius="lg"
                    border="1px solid rgba(43, 206, 161, 0.1)"
                    alignItems="center"
                    mb={4}
                >
                    <MedalstarLg color="#2BCFA1" />
                </Flex>
            }
            title={t('quests.mobileDrawer.title')}
            placement="bottom"
            description={t('quests.mobileDrawer.description')}
            drawerContentStyle={{
                background: 'url(https://upload-file-droplinked.s3.amazonaws.com/2abc65781b927044e61acccfd9eef90eca030be153053f7c2722c66a86938fcb.png)',
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                borderTopRadius: "16px",
            }}
            drawerHeaderStyle={{
                border: "none",
                padding: 4,
                marginBottom: 2
            }}
            showCloseIcon={false}
        >
            <Box paddingInline={4}>
                <ProPlanCard unlockedMonths={unlockedMonths} />
            </Box>
            <ProPlanFooter />
        </Drawer>
    )
}
