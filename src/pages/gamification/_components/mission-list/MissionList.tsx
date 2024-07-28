import { Divider, Flex, SimpleGrid, useDisclosure } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import { Participation } from 'lib/apis/gamification/interfaces'
import React from 'react'
import GamificationCard from '../GamificationCard'
import HowGamificationWorksModal from './_components/HowGamificationWorksModal'
import Mission from './_components/Mission'
import MissionLoading from './_components/MissionLoading'

function MissionList({ isLoading, missions }: { isLoading: boolean, missions: Participation[] }) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <GamificationCard direction={"column"} gap={5} padding={5}>
                <Flex justifyContent={"space-between"} alignItems={"center"}>
                    <AppTypography fontSize={24} fontWeight={700} color={"#fff"}>Missions</AppTypography>
                    <AppTypography as={"button"} fontSize={14} fontWeight={700} color={"#2BCFA1"} onClick={onOpen}>How do missions work?</AppTypography>
                </Flex>

                <Divider height={"2px"} borderColor={"#292929"} />
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