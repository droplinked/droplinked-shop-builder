import { Text } from '@chakra-ui/react'
import { GlobeLg } from 'assets/icons/Sign/Globe/GlobeLg'
import RuledGrid from 'components/redesign/ruled-grid/RuledGrid'
import useAnalyticsStore from 'pages/analytics/stores/useAnalyticsStore'
import React from 'react'
import DataPointCard from '../DataPointCard'

function VisitorStats() {
    const { data, isLoading } = useAnalyticsStore(state => state.performanceReportResponse)

    return (
        <RuledGrid columns={1} borderRadius={16}>
            <DataPointCard
                icon={<GlobeLg color='white' />}
                title='Visitors'
                isLoading={isLoading}
            >
                <Text fontSize={{ base: 18, xl: 20 }} fontWeight={500} color="text.white">{data.visitors}</Text>
            </DataPointCard>

            {/* <Flex direction="column" gap={{ base: 4, xl: 6 }} padding={{ base: 4, lg: 6 }}>
                {[].map((countryStat, index) => (
                    <Flex key={index} justifyContent="space-between" alignItems="center">
                        <Flex alignItems="center" gap={2}>
                            <CountryFlag countryName={countryStat.country} />
                            <Text fontSize={14} color="text.white">{countryStat.country}</Text>
                        </Flex>
                    </Flex>
                ))}
            </Flex> */}
        </RuledGrid>
    )
}

export default VisitorStats