import { Flex, Tooltip } from "@chakra-ui/react"
import AppIcons from "assest/icon/Appicons"
import AppTypography from "components/common/typography/AppTypography"
import React from "react"

interface Props {
    title: string
    value: string
    tooltip?: string
}

function InformationRow({ title, value, tooltip }: Props) {
    return (
        <Flex
            as="dl"
            justifyContent="space-between"
            alignItems="center"
            gap={2}
            sx={{ "p": { fontSize: 16 } }}
        >
            {tooltip ?
                <Flex alignItems="center" gap={2} sx={{ path: { stroke: "#B1B1B1" } }}>
                    <AppTypography color="#B1B1B1">{title}</AppTypography>
                    <Tooltip width="fit-content" label={tooltip} padding={3} borderRadius={8} bgColor="#000" color="white">
                        <AppIcons.YellowAlert />
                    </Tooltip>
                </Flex>
                :
                <AppTypography color="#B1B1B1">{title}</AppTypography>
            }
            <AppTypography color="white">{value}</AppTypography>
        </Flex>
    )
}

export default InformationRow