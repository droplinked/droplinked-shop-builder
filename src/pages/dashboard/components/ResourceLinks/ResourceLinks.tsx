import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import useDashboardPageStore from 'pages/dashboard/stores/useDashboardStore'
import React from 'react'
import DoubleColumnContainer from '../DoubleColumnContainer'
import ResourceCategory from './ResourceCategory'

function ResourceLinks() {
    const { blogs, helpCenterLinks } = useDashboardPageStore()
    const { t } = useLocaleResources("dashboardPage")

    const openLink = (url: string) => window.open(url, '_blank')

    return (
        <DoubleColumnContainer>
            <ResourceCategory
                items={blogs}
                sectionContainerProps={{
                    title: t('resourceLinks.blog'),
                    onNavigate: () => openLink("https://droplinked.com/blogs")
                }}
            />

            <ResourceCategory
                items={helpCenterLinks}
                sectionContainerProps={{
                    title: t('resourceLinks.helpCenter'),
                    onNavigate: () => openLink("https://droplinked.gitbook.io/droplinked-store-front-help-center")
                }}
            />
        </DoubleColumnContainer>
    )
}

export default ResourceLinks