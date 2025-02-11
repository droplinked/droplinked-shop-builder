import DoubleColumnContainer from 'pages/new-dashboard/components/DoubleColumnContainer'
import SectionContainer from 'pages/new-dashboard/components/SectionContainer'
import React from 'react'
import BestSellingProductsList from './BestSellingProductsList'
import MostImportedProductsList from './MostImportedProductsList'

function ProductEngagementDashboard() {
    return (
        <DoubleColumnContainer>
            <SectionContainer title='Best Selling Products'>
                <BestSellingProductsList />
            </SectionContainer>

            <SectionContainer title='Most Imported Products'>
                <MostImportedProductsList />
            </SectionContainer>
        </DoubleColumnContainer>
    )
}

export default ProductEngagementDashboard