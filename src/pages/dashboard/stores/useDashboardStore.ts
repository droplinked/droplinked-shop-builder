import { DashboardPageData } from 'services/dashboard/interfaces'
import { create } from 'zustand'

export interface DashboardPageLink {
    title: string
    summary?: string
    url: string
}

interface State {
    dashboardData?: Partial<DashboardPageData>
    isLoading: boolean
    blogs: DashboardPageLink[]
    helpCenterLinks: DashboardPageLink[]
}

interface Action {
    updateDashboardPageState: <K extends keyof State>(key: K, value: State[K]) => void
    resetDashboardPageState: () => void
}

const initialState: State = {
    dashboardData: {},
    isLoading: false,
    blogs: [
        {
            title: "How to Transform and Sell NFT Artwork and IP into Premium Merchandise",
            url: "https://droplinked.com/blogs/how-to-transform-and-sell-nft-artwork-and-ip-into-premium-merchandise-ac599f59"
        },
        {
            title: "How to sell your NFTs through gating your product",
            url: "https://droplinked.com/blogs/how-to-sell-your-nfts-through-gating-your-product-b7d6e94e"
        },
        {
            title: "How to Earn from Secondary Sales by putting your product on the chain",
            url: "https://droplinked.com/blogs/how-to-earn-from-secondary-sales-by-putting-your-product-on-the-chain-eea86743"
        },
        {
            title: "How to Monetize your Physical Inventory with Personalized Storefront",
            url: "https://droplinked.com/blogs/how-to-monetize-your-physical-inventory-with-personalized-storefront-0082dd88"
        }
    ],
    helpCenterLinks: [
        {
            title: "Getting Set up to Start Selling",
            summary: "Set up a storefront",
            url: "https://droplinked.gitbook.io/droplinked-store-front-help-center/getting-started/getting-set-up-to-start-selling"
        },
        {
            title: "Managing products",
            summary: "How to customize product pages",
            url: "https://droplinked.gitbook.io/droplinked-store-front-help-center/how-to-guides/managing-products"
        },
        {
            title: "Managing collections",
            summary: "How to work with Collections associated with storefronts",
            url: "https://droplinked.gitbook.io/droplinked-store-front-help-center/how-to-guides/managing-collections"
        },
        {
            title: "Decentralized affiliate network",
            summary: "How to use the decentralized affiliate system to co-sell with communities",
            url: "https://droplinked.gitbook.io/droplinked-store-front-help-center/how-to-guides/decentralized-affiliate-network"
        }
    ]
}

const useDashboardPageStore = create<State & Action>((set) => ({
    ...initialState,
    updateDashboardPageState: (key, value) => set(state => ({ ...state, [key]: value })),
    resetDashboardPageState: () => set(() => ({ ...initialState }))
}))

export default useDashboardPageStore