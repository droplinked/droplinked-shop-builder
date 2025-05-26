import { Flex } from '@chakra-ui/react'
import { getParticipatesService } from 'services/gamification/gamificationServices'
import React from 'react'
import { useQuery } from 'react-query'
import CompletedMissions from './_components/completed-missions/CompletedMissions'
import MissionList from './_components/mission-list/MissionList'

function Gamification() {
    const { isFetching, data } = useQuery({
        queryKey: ["participates"],
        queryFn: () => getParticipatesService(),
    })
    const missions = data?.data.data ?? []

    return (
        <Flex direction={"column"} gap={"10px"}>
            <CompletedMissions isLoading={isFetching} missions={missions} />
            <MissionList isLoading={isFetching} missions={missions} />
        </Flex>
    )
}

export default Gamification