import useDashboardPageStore from 'pages/dashboard/stores/useDashboardStore'
import React from 'react'
import DoubleColumnContainer from '../DoubleColumnContainer'
import ResourceCategory from './ResourceCategory'

function ResourceLinks() {
    const { blogs, helpCenterLinks } = useDashboardPageStore()

    const openLink = (url: string) => window.open(url, '_blank')

    return (
        <DoubleColumnContainer>
            <ResourceCategory
                items={blogs}
                sectionContainerProps={{
                    title: "Blog",
                    onNavigate: () => openLink("https://droplinked.com/blogs")
                }}
            />

            <ResourceCategory
                items={helpCenterLinks}
                sectionContainerProps={{
                    title: "Help Center",
                    onNavigate: () => openLink("https://droplinked.gitbook.io/droplinked-store-front-help-center")
                }}
            />
        </DoubleColumnContainer>
    )
}

export default ResourceLinks