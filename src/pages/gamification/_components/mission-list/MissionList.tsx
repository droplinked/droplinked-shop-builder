import { Divider, Flex, SimpleGrid, useDisclosure } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import { Participation } from 'services/gamification/interfaces'
import React from 'react'
import GamificationCard from '../GamificationCard'
import HowGamificationWorksModal from './_components/HowGamificationWorksModal'
import Mission from './_components/Mission'
import MissionLoading from './_components/MissionLoading'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

interface Props {
    isLoading: boolean;
    missions: Participation[];
    t: (key: string) => string;
}

function MissionList({ isLoading, missions, t }: Props) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <GamificationCard direction={"column"} gap={5} padding={5}>
                <Flex justifyContent={"space-between"} alignItems={"center"}>
                    <AppTypography fontSize={24} fontWeight={700} color={"#fff"}>{t("missionList.title")}</AppTypography>
                    <AppTypography as={"button"} fontSize={14} fontWeight={700} color={"#2BCFA1"} onClick={onOpen}>{t("missionList.howDoMissionsWork")}</AppTypography>
                </Flex>

                <Divider height={"2px"} borderColor={"neutral.gray.800"} />
                <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap={10}>
                    {
                        isLoading ?
                            <MissionLoading /> :
                            missions.map((mission) => <Mission key={mission._id} mission={mission} />)
                    }
                </SimpleGrid>
            </GamificationCard>
            <HowGamificationWorksModal isOpen={isOpen} onClose={onClose} />
        </>
    )
}

export default MissionList