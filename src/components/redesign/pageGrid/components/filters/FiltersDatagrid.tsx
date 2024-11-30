import { Box, HStack, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import React, { useCallback, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export interface IFiltersDataGridItems {
    title: string
    list: Array<{
        title: string
        onClick: Function
        isActive: boolean
    }>
}

export interface IFiltersDatagrid {
    item: Array<IFiltersDataGridItems>
}

function FiltersDataGrid({ item }: IFiltersDatagrid) {
    const location = useLocation()
    const navigate = useNavigate()
    const existFilter = useMemo(() => item.find(el => el.list.find(item => item.isActive)), [item])
    const checkActive = useCallback((item: IFiltersDataGridItems) => item.list.find(el => el.isActive), [])

    return (
        <HStack spacing={8} alignItems="center">
            {item.map((el: IFiltersDataGridItems, key) => (
                <Box key={key}>
                    <Menu isLazy>
                        <MenuButton fontSize={"sm"}>
                            {checkActive(el) ?
                                <HStack>
                                    <AppTypography fontSize='12px'>{checkActive(el).title}</AppTypography>
                                    <Box width="6px" height="6px" backgroundColor="#2ec99e" borderRadius="100%"></Box>
                                </HStack>
                                :
                                <AppTypography fontSize='12px'>{el.title}</AppTypography>
                            }

                        </MenuButton>
                        {el.list.length ? (
                            <MenuList background={"#1a1a1a"} padding="8px 5px" borderColor="#2f2f2f" fontSize={"sm"}>
                                {el.list.map((item, key) => (
                                    <MenuItem
                                        key={key}
                                        borderRadius="4px"
                                        backgroundColor="transparent"
                                        _focus={{
                                            background: "none"
                                        }}
                                        _hover={{
                                            background: "none"
                                        }}
                                        {...item?.isActive && {
                                            background: "#353535 !important"
                                        }}
                                        onClick={() => item.onClick()}
                                    >
                                        {item.title}
                                    </MenuItem>
                                ))}
                            </MenuList>
                        ) : null}
                    </Menu>
                </Box>
            ))}
            {existFilter && <Box>
                <AppTypography color="#ff9696" onClick={() => navigate(location.pathname)} border="1px solid #ff9696" padding="2px 10px" borderRadius="100px" cursor="pointer" fontSize='12px'>Clear</AppTypography>
            </Box>}
        </HStack>
    )
}

export default FiltersDataGrid