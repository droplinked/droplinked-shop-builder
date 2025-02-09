import { Flex, Text } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import CountryFlag from 'assest/icon/flags/icons'
import RuledGrid from 'components/redesign/ruled-grid/RuledGrid'
import React from 'react'
import DataPointCard from './DataPointCard'
import StatIndicator from './StatIndicator'

function Visitors() {
    const countryMetrics = [
        { country: "Germany", percentage: 65, value: 1345 },
        { country: "The United States", percentage: 65, value: 209 },
        { country: "United Arab Emirates", percentage: 65, value: 145 }
    ]

    return (
        <RuledGrid
            width="444px"
            columns={1}
            borderRadius={16}
        >
            <DataPointCard icon={<AppIcons.Globe />} title='Visitors'>
                <Text fontSize={20} fontWeight={500} color="#FFF">1234</Text>
            </DataPointCard>

            <Flex direction="column" gap={6} padding={6}>
                {countryMetrics.map((metric, index) => (
                    <Flex key={index} justifyContent="space-between" alignItems="center">
                        <Flex alignItems="center" gap={2}>
                            <CountryFlag countryName={metric.country} />
                            <Text fontSize={14} color="#FFF">{metric.country}</Text>
                        </Flex>

                        <StatIndicator percentage={metric.percentage}>
                            <Text fontSize={14} color="#FFF">{metric.value}</Text>
                        </StatIndicator>
                    </Flex>
                ))}
            </Flex>
        </RuledGrid>
    )
}

export default Visitors