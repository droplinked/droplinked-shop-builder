import { Flex } from "@chakra-ui/react";
import AppTypography from "components/common/typography/AppTypography";
import React from "react";

function ModalBodyHeadline({ isFirstCircleRecord }: { isFirstCircleRecord: boolean }) {
    return (
        <Flex direction="column" gap={2}>
            <AppTypography fontSize={24} fontWeight={700} color="white">
                {isFirstCircleRecord ? "Select Preferred Wallet For Record" : "Recording Product"}
            </AppTypography>
            <AppTypography fontSize={14} color="#B1B1B1">
                {isFirstCircleRecord ?
                    "Choose the wallet where your products will be recorded." :
                    "You are recording your product on the following Circle wallet."
                }
            </AppTypography>
        </Flex>
    )
}

export default ModalBodyHeadline