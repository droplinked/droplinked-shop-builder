import { Box, Divider, Flex } from '@chakra-ui/react';
import BasicButton from 'components/common/BasicButton/BasicButton';
import AppImage from 'components/common/image/AppImage';
import AppModal from 'components/common/modal/AppModal';
import AppTypography from 'components/common/typography/AppTypography';
import { motion } from 'framer-motion';
import { checkMissionCompletionService } from 'lib/apis/gamification/gamificationServices';
import { Participation } from 'lib/apis/gamification/interfaces';
import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import GamificationSpinner from './gamificationSpinner/GamificationSpinner';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    mission: Participation;
}

const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } }
}

function MissionReviewModal({ isOpen, onClose, mission }: Props) {
    const queryClient = useQueryClient()
    const { isLoading, mutateAsync } = useMutation(checkMissionCompletionService)
    const [isCompleted, setCompleted] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const missionCreditReward = mission.rewards.find(reward => reward.type === 'CREDIT')?.value ?? 0

    const closeModal = () => {
        onClose()
        if (isCompleted) {
            queryClient.invalidateQueries({ queryKey: ['participates'] })
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }

    const checkMissionCompletion = async () => {
        try {
            await mutateAsync(mission._id)
            setCompleted(true)
        } catch (err) {
            setError(err.response.data.data.message)
        }
    }

    return (
        <AppModal open={isOpen} close={closeModal} contentProps={{ padding: 4 }}>
            <Flex direction="column" gap={4}>
                <Flex alignItems="center" gap="10px">
                    <AppImage
                        width="61px"
                        height="61px"
                        borderRadius="50%"
                        src="https://upload-file-flatlay.s3.us-west-2.amazonaws.com/0b8e0a77d93d97d0f33c543dce8e35aeac0a11ffa70d6e09baadc023143c92b6.png_or.png"
                    />
                    <Flex direction="column" gap="10px" fontSize={12} fontWeight={700}>
                        <AppTypography fontSize={16} fontWeight={700} color="#2BCFA1">
                            Mission Title: <Box as="span" color="#fff">{mission.name}</Box>
                        </AppTypography>
                        <AppTypography fontSize={12} fontWeight={700} color="#2BCFA1">
                            Mission Category: <Box as="span" color="#fff">{mission.categoryId.name}</Box>
                        </AppTypography>
                    </Flex>
                </Flex>
                <Divider height="2px" borderColor="#292929" />
                {!isCompleted ? (
                    <>
                        <Box position="relative">
                            {isLoading && <GamificationSpinner />}
                            <AppTypography fontSize={16} fontWeight={500} color="#C2C2C2" filter={isLoading ? 'blur(4px)' : 'none'}>
                                <Box as="span" color="#2BCFA1" fontWeight={700}>Mission Description:</Box> {mission.description}
                            </AppTypography>
                        </Box>
                        <Divider height="2px" borderColor="#292929" />
                        {!error && (
                            <Flex direction="column" gap={4}>
                                <AppTypography fontSize={16} fontWeight={700} color="#2BCFA1">
                                    Points: <Box as="span" color="#C2C2C2">{missionCreditReward}</Box>
                                </AppTypography>
                                <BasicButton alignSelf="center" isDisabled={isLoading} onClick={checkMissionCompletion}>
                                    Review Status
                                </BasicButton>
                            </Flex>
                        )}
                    </>
                ) : (
                    <motion.div initial="hidden" animate="visible" variants={fadeIn}>
                        <Flex direction="column" sx={{ textAlign: 'center' }}>
                            <AppTypography fontSize={76} fontWeight={700} whiteSpace="nowrap" bgGradient="linear(to-b, #2EC99E1A, #2EC99EA6)" bgClip="text">
                                {`“${missionCreditReward} Points“`}
                            </AppTypography>
                            <AppTypography fontSize={28} fontWeight={700} color="#2BCFA1">Congratulations!</AppTypography>
                            <AppTypography fontSize={16} fontWeight={700} color="#2BCFA1">
                                Task completed! You've earned {missionCreditReward} points!
                            </AppTypography>
                        </Flex>
                    </motion.div>
                )}
                {error && (
                    <AppTypography fontSize={16} fontWeight={500} color="#C2C2C2">
                        <Box as="span" color="#2BCFA1" fontWeight={700}>Mission Progress:</Box> {error}
                    </AppTypography>
                )}
            </Flex>
        </AppModal>
    )
}

export default MissionReviewModal