import { Box, Flex, VStack } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import AppCard from 'components/common/card/AppCard'
import AppTypography from 'components/common/typography/AppTypography'
import { designContext } from 'pages/register-pages/pages/design/design-context'
import { IPreviewSections } from 'pages/register-pages/pages/design/reducer'
import React, { useCallback, useContext, useMemo } from 'react'

interface IProps {
    title: string
    description?: string
    children: any
    section: IPreviewSections
}

function DesignPageCard({ description, title, children, section }: IProps) {
    const { state: { optionSelected }, methods: { dispatch } } = useContext(designContext)
    const isActive = useMemo(() => optionSelected === section, [optionSelected, section])

    const setToggle = useCallback(() => dispatch({ type: "updateState", params: { optionSelected: isActive ? null : section } }), [isActive, section, optionSelected])

    return (
        <AppCard boxProps={{ padding: "30px" }}>
            <VStack align="stretch" spacing={"48px"}>
                <Flex justifyContent="space-between" cursor="pointer" onClick={setToggle} alignItems="center">
                    <VStack align="stretch" spacing="8px">
                        <AppTypography size="16px" weight="bolder">{title}</AppTypography>
                        {description && <AppTypography size="12px" color="#C2C2C2">{description}</AppTypography>}
                    </VStack>
                    <AppIcons.ArrowDown width="18px" height="18px" style={{ cursor: "pointer", transition: ".3s", transform: `rotate(${isActive ? "180deg" : '0'})` }} />
                </Flex>
                {isActive && <Box>{children}</Box>}
            </VStack>
        </AppCard>
    )
}

export default DesignPageCard