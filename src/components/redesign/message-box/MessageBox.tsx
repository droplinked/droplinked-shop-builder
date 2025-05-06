import { Box, Flex, FlexProps, Text } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import { WarningMd } from 'assets/icons/Sign/Warning/WarningMd'
import React from 'react'

type Theme = "info" | "warning" | "systemWarning" | "error"

interface Props extends FlexProps {
    title: string
    description?: string
    theme?: Theme
}

const themeMap: Record<Theme, { icon: React.ReactNode, styles: FlexProps }> = {
    "info": {
        icon: <Box sx={{ svg: { width: 5, height: 5 } }}><AppIcons.WhiteWarning /></Box>,
        styles: { bg: 'rgba(0, 0, 0, 0.05)', borderColor: '#292929' }
    },
    "warning": {
        icon: <AppIcons.YellowWarning />,
        styles: { bg: 'rgba(255, 217, 81, 0.10)', borderColor: '#FFD951' }
    },
    "systemWarning": {
        icon: <AppIcons.SystemWarning />,
        styles: { bg: 'rgba(255, 217, 81, 0.10)', borderColor: '#FFD951' }
    },
    "error": {
        icon: <WarningMd color='#F24' />,
        styles: { bg: 'rgba(255, 34, 68, 0.05)', borderColor: '#F24' }
    }
}

function MessageBox({ title, description, theme = "info", children }: Props) {
    const { icon, styles } = themeMap[theme]

    return (
        <Flex
            gap={2}
            border="1px solid"
            borderRadius={8}
            padding={4}
            {...styles}
        >
            <Box flexShrink={0}>{icon}</Box>
            <Flex direction="column" gap={1} sx={{ p: { fontSize: 14, color: "#FFF" } }}>
                <Text fontWeight={700}>{title}</Text>
                {description && <Text>{description}</Text>}
                {children}
            </Flex>
        </Flex>
    )
}

export default MessageBox