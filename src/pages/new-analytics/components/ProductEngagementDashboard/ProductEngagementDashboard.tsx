import { getAnalyticsTopSellers } from 'lib/apis/dashboard/dashboardServices'
import useFormattedDateRange from 'pages/new-analytics/hooks/useFormattedDateRange'
import DoubleColumnContainer from 'pages/new-dashboard/components/DoubleColumnContainer'
import SectionContainer from 'pages/new-dashboard/components/SectionContainer'
import React from 'react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import BestSellingProductsList from './BestSellingProductsList'
import MostImportedProductsList from './MostImportedProductsList'

function ProductEngagementDashboard() {
    const navigate = useNavigate()
    const { startDate, endDate } = useFormattedDateRange()
    const { isFetching, isError, data } = useQuery({
        queryFn: () => getAnalyticsTopSellers({ startDate, endDate })
    })

    const topSellers = data

    return (
        <>
            <DoubleColumnContainer alignItems="start">
                <SectionContainer
                    title='Best Selling Products'
                    onLinkClick={() => navigate("/analytics/products")}
                >
                    <BestSellingProductsList topSellers={topSellers} />
                </SectionContainer>

                <SectionContainer title='Most Imported Products'>
                    <MostImportedProductsList />
                </SectionContainer>
            </DoubleColumnContainer>

            {/* <EngagementMetrics /> */}
        </>
    )
}

export default ProductEngagementDashboard