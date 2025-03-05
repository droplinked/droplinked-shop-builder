import { Divider, Flex } from '@chakra-ui/react'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'
import React from 'react'
import GamificationCard from '../../GamificationCard'

function MissionLoading() {
    return (
        <>
            {Array.from({ length: 3 }).map((_, index) => (
                <GamificationCard
                    key={index}
                    padding="12px 40px"
                    background={"linear-gradient(180deg, neutral.gray.850 0%, #1A1A1A 100%)"}
                    boxShadow="0px 4px 4px 0px #00000040"
                >
                    <Flex flex={1} direction={"column"} gap={"10px"}>
                        <Flex alignItems={"center"} gap={"10px"}>
                            <AppSkeleton width={"61px"} height={"61px"} borderRadius={"50%"} isLoaded={false}>{""}</AppSkeleton>
                            <Flex direction={"column"} gap={"10px"}>
                                <AppSkeleton width={100} isLoaded={false} height={18}>{""}</AppSkeleton>
                                <AppSkeleton width={100} isLoaded={false} height={18}>{""}</AppSkeleton>
                            </Flex>
                        </Flex>
                        <Divider height={"2px"} borderColor={"neutral.gray.800"} />
                        <Flex direction={"column"} gap={1}>
                            <AppSkeleton width={"100%"} height={18} isLoaded={false}>{""}</AppSkeleton>
                            <AppSkeleton width={"100%"} height={18} isLoaded={false}>{""}</AppSkeleton>
                            <AppSkeleton width={"100%"} height={18} isLoaded={false}>{""}</AppSkeleton>
                        </Flex>
                    </Flex>
                </GamificationCard>
            ))}
        </>
    )
}

export default MissionLoading