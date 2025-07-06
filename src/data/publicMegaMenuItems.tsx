import CrossmintWhite from "assets/brand-identity/CrossmintWhite"
import D3 from "assets/brand-identity/D3"
import Polygon from "assets/brand-identity/Polygon"
import UnstoppableDomains from "assets/brand-identity/UnstoppableDomains"
import { LinkMd } from "assets/icons/Action/Link/LinkMd"
import { BoxMd } from "assets/icons/Finance/Box/BoxMd"
import { CoinsMd } from "assets/icons/Finance/Coins/CoinsMd"
import { ShirtMd } from "assets/icons/Items/Shirt/ShirtMd"
import { PositionLg } from "assets/icons/Sign/Position/PositionLg"
import { TargetMd } from "assets/icons/Sign/Target/TargetMd"
import { Layout1Md } from "assets/icons/StyleDesigner/Layout1/Layout1Md"
import { AffiliateMd } from "assets/icons/System/Affiliate/AffiliateMd"
import { BuildingLg } from "assets/icons/System/Building/BuildingLg"
import { ImageMd } from "assets/icons/System/Image/ImageMd"
import { Layer1Lg } from "assets/icons/System/Layer1/Layer1Lg"
import { MetaverseMd } from "assets/icons/System/Metaverse/MetaverseMd"
import { NetworkMd } from "assets/icons/System/Network/NetworkMd"
import { PassportMd } from "assets/icons/System/Passport/PassportMd"
import { SubscriptionMd } from "assets/icons/System/Subscription/SubscriptionMd"
import { TokenpayMd } from "assets/icons/System/Tokenpay/TokenpayMd"

const publicMegaMenuItems = [
    {
        label: 'Platform Functionalities',
        icon: Layer1Lg,
        links: [
            { label: 'Physical Inventory', description: 'Portable Supply Chain Management', icon: BoxMd, href: '/physical-inventory' },
            { label: 'Digital Goods', description: 'Subscriptions, assets and more', icon: ImageMd, href: '/digital-goods' },
            { label: 'Products on Demand', description: 'Design customizable items', icon: ShirtMd, href: '/products-on-demand' },
            { label: 'Onchain Affiliate', description: 'Fraud-free, transparent commerce', icon: AffiliateMd, href: '/onchain-affiliate' },
            { label: 'Payment Links', description: 'Seamlessly sell anytime, anywhere', icon: LinkMd, href: '/payment-links' },
            { label: 'Product Tiles', description: 'Customizable embeds to use', icon: Layout1Md, href: '/product-tiles' },
            { label: 'Tokenizing Products', description: 'Product records for assets', icon: CoinsMd, href: '/tokenizing-products' },
            { label: 'Onchain Subscriptions', description: 'Automate to earn more', icon: SubscriptionMd, href: '/onchain-subscriptions' },
            { label: 'Social Quests', description: 'Grow the community to earn more', icon: TargetMd, href: '/rewards' }
        ]
    },
    {
        label: 'Enterprise',
        icon: BuildingLg,
        links: [
            { label: 'DPP', description: 'Digital product passports', icon: PassportMd, href: '/dpp' },
            { label: 'DIMST', description: 'Onchain inventory management', icon: NetworkMd, href: '/roi' },
            { label: 'Tokenpay', description: 'Payments for ERC/BRC/SPL', icon: TokenpayMd, href: '/tokenpay' },
            { label: 'Metaverse Showroom', description: 'Interactive shopping made easy', icon: MetaverseMd, href: '/metaverse-store' },
            { label: 'Custom Tokens', description: 'Unlock the Power of Custom Tokens', icon: LinkMd, href: '/custom-tokens' },
        ]
    },
    {
        label: 'Partners',
        icon: PositionLg,
        links: [
            { label: 'Unstoppable Domains', description: 'droplinked & Unstoppable Domains', icon: UnstoppableDomains, href: '/unstoppable-domains' },
            { label: 'D3', description: 'droplinked & D3', icon: D3, href: '/d3' },
            { label: 'Polygon', description: 'droplinked & Polygon', icon: Polygon, href: '/polygon' },
            { label: 'Crossmint', description: 'droplinked & Crossmint', icon: CrossmintWhite, href: '/crossmint' }
        ]
    }
]

export default publicMegaMenuItems