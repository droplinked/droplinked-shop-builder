import { Flex } from "@chakra-ui/react"
import AppIcons from "assest/icon/Appicons"
import AppTypography from "components/common/typography/AppTypography"
import React from "react"

function WalletWarningMessage() {
    return (
        <Flex alignItems="center" gap={2}>
            <AppIcons.YellowAlert />
            <AppTypography fontSize={14} color="#FFD951">
                Please note, once you select a wallet, it cannot be changed later.
            </AppTypography>
        </Flex>
    )
}

export default WalletWarningMessage