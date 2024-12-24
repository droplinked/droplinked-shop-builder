import { Flex, Progress } from '@chakra-ui/react'
import AppImage from 'components/common/image/AppImage'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'
import AppTypography from 'components/common/typography/AppTypography'
import { Participation } from 'lib/apis/gamification/interfaces'
import useAppStore from 'lib/stores/app/appStore'
import React from 'react'
import GamificationCard from '../GamificationCard'

interface Props {
    isLoading: boolean,
    missions: Participation[]
}

function CompletedMissions({ isLoading, missions }: Props) {
    const { shop } = useAppStore()
    const totalPoints = missions.reduce((acc, curr) => acc + +curr.rewards.find((reward) => reward.type === "CREDIT")?.value ?? 0, 0)
    const pointsEarned = missions
        .filter(mission => mission.isCompleted)
        .reduce((acc, curr) => acc + +curr.rewards.find((reward) => reward.type === "CREDIT")?.value ?? 0, 0)

    return (
        <Flex wrap={"wrap"} gap={"10px"}>
            <GamificationCard flexGrow={1} alignItems={"center"} gap={5}>
                <AppImage objectFit={"contain"} width={"95px"} height={"95px"} borderRadius={"50%"} src={shop.logo} />
                <Flex direction={"column"} gap={3} color={"#fff"}>
                    <AppTypography fontSize={24} fontWeight={700}>Hey {shop.name}!👋</AppTypography>
                    <AppTypography fontSize={14} fontWeight={500}>Master Every Mission, Earn Your Victory!</AppTypography>
                </Flex>
            </GamificationCard>

            <GamificationCard flexGrow={1} alignItems={"center"} gap={5}>
                <AppImage width={"95px"} height={"95px"} borderRadius={"50%"} src="https://upload-file-flatlay.s3.us-west-2.amazonaws.com/1bac072951d09ae1d3fa4f8f072d69acfcecab3e3743b008153c9ae1bbb344d2.png_or.png" />
                <Flex direction={"column"}>
                    <AppTypography fontSize={14} fontWeight={500} color={"#C2C2C2"}>Points</AppTypography>
                    <AppSkeleton isLoaded={!isLoading}><AppTypography fontSize={20} fontWeight={700} bgGradient="linear(to-b, #C0FFEE, #17FFBF , #00FFB8)" bgClip="text">{pointsEarned.toFixed(2)}</AppTypography></AppSkeleton>
                </Flex>
            </GamificationCard>

            <GamificationCard flexGrow={3} alignItems={"center"} gap={5}>
                <AppImage width={"95px"} height={"95px"} borderRadius={"50%"} src="https://upload-file-flatlay.s3.us-west-2.amazonaws.com/72056faf11c295d6e9ee9e384491cec719a0fc8512c2dbc8cbcc7649f641c9c6.png_or.png" />
                <Flex
                    flex={1}
                    direction={"column"}
                    gap={2}
                    color={"#fff"}
                    sx={{
                        '&>div:has(div[role="progressbar"])': { borderRadius: "27px", bgColor: "#3C3C3C", boxShadow: "0px 4px 4px 0px #00000040 inset" },
                        '& div[role="progressbar"]': { borderRadius: "inherit", bgGradient: 'linear(to-b, #C0FFEE, #17FFBF, #00FFB8)' }
                    }}
                >
                    <AppTypography fontSize={20} fontWeight={700}>Missions Completed</AppTypography>
                    <Progress
                        width="320px"
                        isIndeterminate={isLoading}
                        min={0}
                        max={100}
                        value={(100 * pointsEarned) / totalPoints}
                        colorScheme={"linear(to-b, #C0FFEE, #17FFBF , #00FFB8)"}
                    />
                    <AppSkeleton width="fit-content" isLoaded={!isLoading}>
                        <AppTypography fontSize={20} fontWeight={700}>
                            {`${pointsEarned.toFixed(2)} / ${totalPoints.toFixed(2)}`}
                        </AppTypography>
                    </AppSkeleton>
                </Flex>
            </GamificationCard>
        </Flex>
    )
}

export default CompletedMissions