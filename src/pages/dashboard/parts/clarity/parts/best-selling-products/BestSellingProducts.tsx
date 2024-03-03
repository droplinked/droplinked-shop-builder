import { Flex } from '@chakra-ui/react'
import CountryFlag from 'assest/icon/flags/icons'
import AppCard from 'components/common/card/AppCard'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'
import { ITableRows } from 'components/common/table/AppTable'
import AppTypography from 'components/common/typography/AppTypography'
import DashboardTable from 'pages/dashboard/parts/parts/table/DashboardTable'
import React, { useContext } from 'react'
import clarityContext from '../../context'

function BestSellingProducts() {
    const { isLoading, clarityData } = useContext(clarityContext)
    const items: Array<ITableRows> = Object.keys(clarityData?.topCountries || {}).map(country => ({
        country: {
            value: <Flex alignItems={"center"} gap={2}>
                <CountryFlag countryName={country} />
                <AppTypography fontSize={12} fontWeight={500}>{country}</AppTypography>
            </Flex>,
            props: {
                width: "100%"
            }
        },
        users: {
            value: <AppTypography fontSize={12} fontWeight={500}>{clarityData?.topCountries[country]}</AppTypography>,
            props: {
                width: "auto",
                style: { paddingRight: "0" }
            }
        },
    }))

    return (
        <AppCard>
            <Flex direction={"column"} gap={1}>
                <AppTypography fontSize={16} color={"#fff"}>Top Countries</AppTypography>
                <AppSkeleton isLoaded={!isLoading}>
                    <DashboardTable items={items} />
                </AppSkeleton>
            </Flex>
        </AppCard >
    )
}

export default BestSellingProducts