import { DashboardPageData } from 'lib/apis/dashboard/interfaces'
import { create } from 'zustand'

interface DashboardPageLink {
    title: string
    description: string
    link: string
}

interface State {
    dashboardData?: DashboardPageData | null
    isLoading: boolean
    blogs: DashboardPageLink[]
    helpLinks: DashboardPageLink[]
}

interface Action {
    updateDashboardPageState: <K extends keyof State>(key: K, value: State[K]) => void
    resetDashboardPageState: () => void
}

const initialState: State = {
    dashboardData: null,
    isLoading: false,
    blogs: [
        {
            title: "How to Transform and Sell NFT Artwork and IP into Premium Merchandise",
            description: "By: Sahar",
            link: "https://droplinked.com/blogs/how-to-transform-and-sell-nft-artwork-and-ip-into-premium-merchandise-ac599f59"
        },
        {
            title: "How to sell your NFTs through gating your product",
            description: "By: Sahar",
            link: "https://droplinked.com/blogs/how-to-sell-your-nfts-through-gating-your-product-b7d6e94e"
        },
        {
            title: "How to Earn from Secondary Sales by putting your product on the chain",
            description: "By: Sahar",
            link: "https://droplinked.com/blogs/how-to-earn-from-secondary-sales-by-putting-your-product-on-the-chain-eea86743"
        },
        {
            title: "How to Monetize your Physical Inventory with Personalized Storefront",
            description: "By: Sahar",
            link: "https://droplinked.com/blogs/how-to-monetize-your-physical-inventory-with-personalized-storefront-0082dd88"
        }
    ],
    helpLinks: [
        {
            title: "Getting Set up to Start Selling",
            description: "Set up a storefront",
            link: "https://droplinked.gitbook.io/droplinked-store-front-help-center/getting-started/getting-set-up-to-start-selling"
        },
        {
            title: "Managing products",
            description: "How to customize product pages",
            link: "https://droplinked.gitbook.io/droplinked-store-front-help-center/how-to-guides/managing-products"
        },
        {
            title: "Managing collections",
            description: "How to work with Collections associated with storefronts",
            link: "https://droplinked.gitbook.io/droplinked-store-front-help-center/how-to-guides/managing-collections"
        },
        {
            title: "Decentralized affiliate network",
            description: "How to use the decentralized affiliate system to co-sell with communities",
            link: "https://droplinked.gitbook.io/droplinked-store-front-help-center/how-to-guides/decentralized-affiliate-network"
        }
    ]
}

const useDashboardPageStore = create<State & Action>((set) => ({
    ...initialState,
    updateDashboardPageState: (key, value) => set(state => ({ ...state, [key]: value })),
    resetDashboardPageState: () => set(() => ({ ...initialState }))
}))

export default useDashboardPageStore