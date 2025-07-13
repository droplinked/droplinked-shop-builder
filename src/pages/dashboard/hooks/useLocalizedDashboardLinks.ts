import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import { BLOG_LINKS, HELP_CENTER_LINKS } from 'pages/dashboard/data/dashboardLinks'

export interface DashboardPageLink {
    title: string
    summary?: string
    url: string
}

/**
 * Provide localized blog & help-center links.
 * Translations live under dashboardLinks.* in the i18n resources; URLs live in the static catalogue.
 */
function useLocalizedDashboardLinks() {
    const { t } = useLocaleResources('dashboardPage')

    const blogs: DashboardPageLink[] = BLOG_LINKS.map(({ id, url }) => ({
        title: t(`dashboardLinks.blogs.${id}`),
        url
    }))

    const helpCenterLinks: DashboardPageLink[] = HELP_CENTER_LINKS.map(({ id, url }) => ({
        title: t(`dashboardLinks.helpCenter.${id}.title`),
        summary: t(`dashboardLinks.helpCenter.${id}.summary`),
        url
    }))

    return { blogs, helpCenterLinks }
}

export default useLocalizedDashboardLinks 