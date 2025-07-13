import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

export interface DashboardPageLink {
    title: string
    summary?: string
    url: string
}

const BLOG_LINKS = [
    {
        id: 'transformNFT',
        url: 'https://droplinked.com/blogs/how-to-transform-and-sell-nft-artwork-and-ip-into-premium-merchandise-ac599f59'
    },
    {
        id: 'gatingProduct',
        url: 'https://droplinked.com/blogs/how-to-sell-your-nfts-through-gating-your-product-b7d6e94e'
    },
    {
        id: 'secondarySales',
        url: 'https://droplinked.com/blogs/how-to-earn-from-secondary-sales-by-putting-your-product-on-the-chain-eea86743'
    },
    {
        id: 'monetizeInventory',
        url: 'https://droplinked.com/blogs/how-to-monetize-your-physical-inventory-with-personalized-storefront-0082dd88'
    }
]

const HELP_CENTER_LINKS = [
    {
        id: 'gettingStarted',
        url: 'https://droplinked.gitbook.io/droplinked-store-front-help-center/getting-started/getting-set-up-to-start-selling'
    },
    {
        id: 'managingProducts',
        url: 'https://droplinked.gitbook.io/droplinked-store-front-help-center/how-to-guides/managing-products'
    },
    {
        id: 'managingCollections',
        url: 'https://droplinked.gitbook.io/droplinked-store-front-help-center/how-to-guides/managing-collections'
    },
    {
        id: 'affiliateNetwork',
        url: 'https://droplinked.gitbook.io/droplinked-store-front-help-center/how-to-guides/decentralized-affiliate-network'
    }
]

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