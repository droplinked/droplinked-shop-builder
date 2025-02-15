import { Text } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import RuledGrid from 'components/redesign/ruled-grid/RuledGrid'
import useAnalyticsStore from 'pages/analytics/stores/useAnalyticsStore'
import React from 'react'
import DataPointCard from '../DataPointCard'

function VisitorStats() {
    const { data, isLoading } = useAnalyticsStore(state => state.performanceReportResponse)

    return (
        <RuledGrid
            width={{ base: "100%", lg: "444px" }}
            columns={1}
            borderRadius={16}
        >
            <DataPointCard
                icon={<AppIcons.Globe />}
                title='Visitors'
                isLoading={isLoading}
            >
                <Text fontSize={{ base: 18, lg: 20 }} fontWeight={500} color="#FFF">{data.visitors}</Text>
            </DataPointCard>

            {/* <Flex direction="column" gap={{ base: 4, xl: 6 }} padding={{ base: 4, lg: 6 }}>
                {[].map((countryStat, index) => (
                    <Flex key={index} justifyContent="space-between" alignItems="center">
                        <Flex alignItems="center" gap={2}>
                            <CountryFlag countryName={countryStat.country} />
                            <Text fontSize={14} color="#FFF">{countryStat.country}</Text>
                        </Flex>

                        <StatIndicator percentage={countryStat.percentage}>
                            <Text fontSize={14} color="#FFF">{countryStat.value}</Text>
                        </StatIndicator>
                    </Flex>
                ))}
            </Flex> */}
        </RuledGrid>
    )
}

export default VisitorStats