import { Flex, HStack, Text } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import AppTooltip from 'components/common/tooltip/AppTooltip'
import React, { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
    label: string
    tooltip?: string
}

function DetailRow({ label, tooltip, children }: Props) {
    return (
        <Flex
            justifyContent="space-between"
            alignItems="center"
            gap={2}
        >
            <HStack spacing={1} align="center">
                <Text fontSize={14} color="text.subtext.placeholder.dark">{label}</Text>
                {tooltip && (
                    <AppTooltip label={tooltip}>
                        <AppIcons.Info />
                    </AppTooltip>
                )}
            </HStack>

            {children}
        </Flex>
    )
}

export default DetailRow