import { Divider, Flex, useDisclosure } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import AppImage from 'components/common/image/AppImage'
import AppTypography from 'components/common/typography/AppTypography'
import { Participation } from 'lib/apis/gamification/interfaces'
import React, { useState } from 'react'
import GamificationCard from '../../GamificationCard'
import MissionReviewModal from './MissionReviewModal'

function Mission({ mission }: { mission: Participation }) {
    const [selectedMission, setSelectedMission] = useState(null)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const missionCreditReward = mission.rewards.find(reward => reward.type === "CREDIT").value

    return (
        <>
            <GamificationCard
                padding="12px 40px"
                background={mission.isCompleted ? "linear-gradient(180deg, rgba(0, 20, 14, 0.698039) 0%, #0B2E24 100%)" : "linear-gradient(180deg, #262626 0%, #1A1A1A 100%)"}
                boxShadow="0px 4px 4px 0px #00000040"
            >
                <Flex direction={"column"} gap={10} width={"100%"}>
                    <Flex direction={"column"} gap={"10px"}>
                        <Flex alignItems={"center"} gap={"10px"}>
                            <AppImage width={"61px"} height={"61px"} borderRadius={"50%"} src="https://upload-file-flatlay.s3.us-west-2.amazonaws.com/0b8e0a77d93d97d0f33c543dce8e35aeac0a11ffa70d6e09baadc023143c92b6.png_or.png" />
                            <Flex direction={"column"} gap={"10px"} fontSize={12} fontWeight={700}>
                                <AppTypography fontSize={12} fontWeight={700} color={mission.isCompleted ? "#2BCFA1" : "#fff"}>{mission.name}</AppTypography>
                                <AppTypography fontSize={12} fontWeight={700} color={"#2BCFA1"}>Points: {missionCreditReward}</AppTypography>
                            </Flex>
                        </Flex>
                        <Divider height={mission.isCompleted ? "1px" : "2px"} borderColor={mission.isCompleted ? "#80EDCF" : "#292929"} />
                        <AppTypography 
                            fontSize={12} 
                            fontWeight={400} 
                            color={mission.isCompleted ? "#2BCFA1" : "#fff"} 
                            whiteSpace={"pre-line"} 
                            style={{display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: 2, overflow: "hidden", textOverflow: "ellipsis"}}
                        >
                            {mission.description}
                        </AppTypography>
                    </Flex>
                    <Flex flexGrow={1} direction="column" justifyContent="flex-end">
                        {
                            mission.isCompleted ?
                                <AppTypography textAlign={"center"} fontSize={20} fontWeight={900} color={"#2BCFA1"}>Mission completed!</AppTypography> :
                                <BasicButton
                                    onClick={() => {
                                        setSelectedMission(mission)
                                        onOpen()
                                    }}
                                >
                                    Details
                                </BasicButton>
                        }
                    </Flex>
                </Flex>
            </GamificationCard>
            {isOpen && <MissionReviewModal isOpen={isOpen} onClose={onClose} mission={selectedMission} />}
        </>
    )
}

export default Mission