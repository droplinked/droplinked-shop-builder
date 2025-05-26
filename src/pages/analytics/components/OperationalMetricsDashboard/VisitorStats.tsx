import { Text } from '@chakra-ui/react'
import { GlobeLg } from 'assets/icons/Sign/Globe/GlobeLg'
import RuledGrid from 'components/redesign/ruled-grid/RuledGrid'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import useAnalyticsStore from 'pages/analytics/stores/useAnalyticsStore'
import React from 'react'
import DataPointCard from '../DataPointCard'

function VisitorStats() {
    const { data, isLoading } = useAnalyticsStore(state => state.performanceReportResponse)
    const { t } = useLocaleResources("analyticsPage")

    return (
        <RuledGrid columns={1} borderRadius={16}>
            <DataPointCard
                icon={<GlobeLg color='white' />}
                title={t('visitors')}
                isLoading={isLoading}
            >
                <Text fontSize={{ base: 18, xl: 20 }} fontWeight={500} color="text.white">{data.visitors}</Text>
            </DataPointCard>
        </RuledGrid>
    )
}

export default VisitorStats