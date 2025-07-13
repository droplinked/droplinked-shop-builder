import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import useFormattedDateRange from 'pages/analytics/hooks/useFormattedDateRange'
import DoubleColumnContainer from 'pages/dashboard/components/DoubleColumnContainer'
import SectionContainer from 'pages/dashboard/components/SectionContainer'
import React from 'react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { getAnalyticsTopSellers } from 'services/dashboard/dashboardServices'
import BestSellingProductsList from './BestSellingProductsList'
import MostImportedProductsList from './MostImportedProductsList'
import ProductsListLoading from './ProductsListLoading'

function ProductEngagementDashboard() {
    const navigate = useNavigate()
    const { t } = useLocaleResources("analyticsPage")
    const { startDate, endDate } = useFormattedDateRange()
    const { data: topSellers, isFetching } = useQuery({
        queryKey: ['analyticsTopSellers', startDate, endDate],
        queryFn: () => getAnalyticsTopSellers({ startDate, endDate })
    })

    return (
        <DoubleColumnContainer alignItems="start">
            <SectionContainer
                title={t('bestSellingProducts')}
                onNavigate={() => navigate('/analytics/products')}
            >
                {isFetching
                    ? <ProductsListLoading />
                    : <BestSellingProductsList topSellers={topSellers} />
                }
            </SectionContainer>

            <SectionContainer title={t('mostImportedProducts')}>
                {isFetching
                    ? <ProductsListLoading />
                    : <MostImportedProductsList />
                }
            </SectionContainer>
        </DoubleColumnContainer>
    )
}

export default ProductEngagementDashboard