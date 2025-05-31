import { Flex } from '@chakra-ui/react'
import { getParticipatesService } from 'services/gamification/gamificationServices'
import React from 'react'
import { useQuery } from 'react-query'
import CompletedMissions from './_components/completed-missions/CompletedMissions'
import MissionList from './_components/mission-list/MissionList'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import arLocale from 'locales/gamification/ar.json'
import enLocale from 'locales/gamification/en.json'

function Gamification() {
    const { isFetching, data } = useQuery({
        queryKey: ["participates"],
        queryFn: () => getParticipatesService(),
    })

    const { t } = useLocaleResources("gamification", {
        ar: arLocale,
        en: enLocale
    })

    const missions = data?.data.data ?? []

    return (
        <Flex direction={"column"} gap={"10px"}>
            <CompletedMissions isLoading={isFetching} missions={missions} t={t} />
            <MissionList isLoading={isFetching} missions={missions} t={t} />
        </Flex>
    )
}

export default Gamification