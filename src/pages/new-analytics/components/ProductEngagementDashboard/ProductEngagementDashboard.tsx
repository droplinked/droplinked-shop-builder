import React from 'react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { getAnalyticsTopSellers } from 'lib/apis/dashboard/dashboardServices'
import useFormattedDateRange from 'pages/new-analytics/hooks/useFormattedDateRange'
import DoubleColumnContainer from 'pages/new-dashboard/components/DoubleColumnContainer'
import SectionContainer from 'pages/new-dashboard/components/SectionContainer'
import BestSellingProductsList from './BestSellingProductsList'
import MostImportedProductsList from './MostImportedProductsList'
import ProductsListLoading from './ProductsListLoading'

function ProductEngagementDashboard() {
    const navigate = useNavigate()
    const { startDate, endDate } = useFormattedDateRange()
    const { data: topSellers, isFetching } = useQuery({
        queryKey: ['analyticsTopSellers', startDate, endDate],
        queryFn: () => getAnalyticsTopSellers({ startDate, endDate })
    })

    return (
        <DoubleColumnContainer alignItems="start">
            <SectionContainer
                title="Best Selling Products"
                onLinkClick={() => navigate('/analytics/products')}
            >
                {isFetching
                    ? <ProductsListLoading />
                    : <BestSellingProductsList topSellers={topSellers} />
                }
            </SectionContainer>

            <SectionContainer title="Most Imported Products">
                {isFetching
                    ? <ProductsListLoading />
                    : <MostImportedProductsList />
                }
            </SectionContainer>
        </DoubleColumnContainer>
    )
}

export default ProductEngagementDashboard