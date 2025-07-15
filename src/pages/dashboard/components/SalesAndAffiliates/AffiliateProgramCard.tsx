import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import SectionContainer from '../SectionContainer'
import AffiliateProgramEmptyState from './EmptyState/AffiliateProgramEmptyState'

interface Props {
    isLoading: boolean
}

function AffiliateProgramCard({ isLoading }: Props) {
    const navigate = useNavigate()
    const { t } = useLocaleResources("dashboardPage")

    return (
        <SectionContainer
            title={t('AffiliateProgramCard.title')}
            onNavigate={() => navigate("/analytics/affiliate/products")}
        >
            <AffiliateProgramEmptyState />
        </SectionContainer>
    )
}

export default AffiliateProgramCard