import { Box, Flex, useDisclosure } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import Drawer from 'components/common/Drawer/Drawer'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'
import { styles } from '../styles'
import { MobileMenuItem } from './MobileMenuItem'

interface Props {
    items: {
        label: string
        value: string
    }[]
}

export default function MultiSelectMenuMobile({ items }: Props) {
    const { isOpen, onClose, onOpen } = useDisclosure()

    return (
        <Box width="100%">
            <Flex {...styles.menuButton} onClick={onOpen} justifyContent="space-between" alignItems="center" cursor="pointer">
                <AppTypography color="text.subtext.placeholder.dark" fontSize={14} fontWeight={400}>
                    Type
                </AppTypography>
                <AppIcons.SelectChevronDown />
            </Flex>

            <Drawer
                isOpen={isOpen}
                onClose={onClose}
                title="Type"
                placement="bottom"
                drawerHeaderStyle={{ padding: 0, px: 4, py: 4, paddingBottom: 4, gap: 4, mb: 0.5 }}
                headingStyle={{ fontSize: 14, fontWeight: 700, color: "#FFF" }}
            >
                <Flex p={4} flexDirection="column" gap={2}>
                    {items.map(({ label, value }) => {
                        return (
                            <MobileMenuItem
                                key={value}
                                label={label}
                                value={value}
                            />
                        )
                    })}
                </Flex>
            </Drawer>
        </Box>
    )
}
