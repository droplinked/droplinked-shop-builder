import { Box, Flex, VStack } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import AppCard from 'components/common/card/AppCard'
import AppTypography from 'components/common/typography/AppTypography'
import React, { useState } from 'react'

interface IProps {
    title: string
    description?: string
    children: any
}

function DesignPageCard({ description, title, children }: IProps) {
    const [Toggle, setToggle] = useState(false)

    return (
        <AppCard boxProps={{ padding: "30px" }}>
            <VStack align="stretch" spacing={"48px"}>
                <Flex justifyContent="space-between" cursor="pointer" onClick={() => setToggle(prev => !prev)} alignItems="center">
                    <VStack align="stretch" spacing="8px">
                        <AppTypography size="16px" weight="bolder">{title}</AppTypography>
                        {description && <AppTypography size="12px" color="#C2C2C2">{description}</AppTypography>}
                    </VStack>
                    <AppIcons.ArrowDown width="18px" height="18px" style={{ cursor: "pointer", transition: ".3s", transform: `rotate(${Toggle ? "180deg" : '0'})` }} />
                </Flex>
                {Toggle && <Box>{children}</Box>}
            </VStack>
        </AppCard>
    )
}

export default DesignPageCard