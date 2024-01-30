import { Box } from '@chakra-ui/react'
import AppTooltip from 'components/common/tooltip/AppTooltip'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'

interface Props {
    text: string,
    colorScheme?: "gray" | "green"
}

function CartItemBadge({ text, colorScheme = "gray" }: Props) {
    const isGrayScheme = colorScheme === "gray"

    return (
        <Box
            borderRadius={"24px"}
            paddingY={"3px"}
            paddingX={"10px"}
            backgroundColor={isGrayScheme ? "#3C3C3C" : "rgba(128, 237, 207, 0.10)"}
        >
            <AppTypography
                fontSize={"10px"}
                fontWeight={isGrayScheme ? 400 : 600}
                color={isGrayScheme ? "#FFFFFF" : "#2BCFA1"}
            >
                {text.length <= 15 ?
                    text :
                    <AppTooltip label={text}>{`${text.slice(0, 16)}...`}</AppTooltip>
                }
            </AppTypography>
        </Box>
    )
}

export default CartItemBadge