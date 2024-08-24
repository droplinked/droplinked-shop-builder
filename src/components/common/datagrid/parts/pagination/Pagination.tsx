import { Box, Flex, HStack } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import React, { useCallback, useMemo } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

export interface IPagination {
    current: number
    lastPage: number
    nextPage: boolean
    prevPage: boolean
}

function Pagination({ current, lastPage, nextPage, prevPage }: IPagination) {
    const [searchParams] = useSearchParams()
    const location = useLocation()
    const navigate = useNavigate()

    const getRoutePage = useCallback((page: string | number) => {
        searchParams.set("page", page.toString())
        return `${location.pathname}?${searchParams.toString()}`
    }, [searchParams, location])

    const list = useMemo(() => {
        const result = []
        for (let index = 0; index < lastPage; index++) {
            const key = index + 1
            const active = current === key
            result.push(
                <Link key={key} to={getRoutePage(key)}>
                    <Flex height="40px" width="40px" justifyContent="center" alignItems="center" color="#FFF" border={`1px solid ${active ? "#4B4B4B" : "transparent"}`} borderRadius="100px">
                        <AppTypography fontSize='14px' fontWeight={active ? 'bold' : 'normal'}>{key}</AppTypography>
                    </Flex>
                </Link>
            )
        }
        return result
    }, [lastPage])

    return (
        <>
            {lastPage > 1 && (
                <Flex justifyContent="center" alignItems="center" gap={5}>
                    <Box cursor={prevPage ? "pointer" : "auto"} color={prevPage ? "#FFF" : "#777"} onClick={() => prevPage && navigate(getRoutePage(current - 1))}><AppTypography fontSize="12px">PREV</AppTypography></Box>
                    <HStack>{list}</HStack>
                    <Box cursor={nextPage ? "pointer" : "auto"} color={nextPage ? "#FFF" : "#777"} onClick={() => nextPage && navigate(getRoutePage(current + 1))}><AppTypography fontSize="12px">NEXT</AppTypography></Box>
                </Flex>
            )}
        </>
    )
}

export default Pagination