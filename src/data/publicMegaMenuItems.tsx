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
import { TFunction } from "i18next"

const getPublicMegaMenuItems = (t: TFunction) => [
    {
        label: t('publicMegaMenuItems.platformFunctionalities.label'),
        icon: Layer1Lg,
        links: [
            { label: t('publicMegaMenuItems.platformFunctionalities.links.physicalInventory.label'), description: t('publicMegaMenuItems.platformFunctionalities.links.physicalInventory.description'), icon: BoxMd, href: '/physical-product' },
            { label: t('publicMegaMenuItems.platformFunctionalities.links.digitalGoods.label'), description: t('publicMegaMenuItems.platformFunctionalities.links.digitalGoods.description'), icon: ImageMd, href: '/digital-product' },
            { label: t('publicMegaMenuItems.platformFunctionalities.links.productsOnDemand.label'), description: t('publicMegaMenuItems.platformFunctionalities.links.productsOnDemand.description'), icon: ShirtMd, href: '/pod-product' },
            { label: t('publicMegaMenuItems.platformFunctionalities.links.onchainAffiliate.label'), description: t('publicMegaMenuItems.platformFunctionalities.links.onchainAffiliate.description'), icon: AffiliateMd, href: '/onchain-affiliate' },
            { label: t('publicMegaMenuItems.platformFunctionalities.links.paymentLinks.label'), description: t('publicMegaMenuItems.platformFunctionalities.links.paymentLinks.description'), icon: LinkMd, href: '/payment-links' },
            { label: t('publicMegaMenuItems.platformFunctionalities.links.productTiles.label'), description: t('publicMegaMenuItems.platformFunctionalities.links.productTiles.description'), icon: Layout1Md, href: '/product-tiles' },
            { label: t('publicMegaMenuItems.platformFunctionalities.links.tokenizingProducts.label'), description: t('publicMegaMenuItems.platformFunctionalities.links.tokenizingProducts.description'), icon: CoinsMd, href: '/tokenizing-products' },
            { label: t('publicMegaMenuItems.platformFunctionalities.links.onchainSubscriptions.label'), description: t('publicMegaMenuItems.platformFunctionalities.links.onchainSubscriptions.description'), icon: SubscriptionMd, href: '/affiliate-sass' },
            { label: t('publicMegaMenuItems.platformFunctionalities.links.socialQuests.label'), description: t('publicMegaMenuItems.platformFunctionalities.links.socialQuests.description'), icon: TargetMd, href: '/rewards' }
        ]
    },
    {
        label: t('publicMegaMenuItems.enterprise.label'),
        icon: BuildingLg,
        links: [
            { label: t('publicMegaMenuItems.enterprise.links.dpp.label'), description: t('publicMegaMenuItems.enterprise.links.dpp.description'), icon: PassportMd, href: '/dpp' },
            { label: t('publicMegaMenuItems.enterprise.links.dimst.label'), description: t('publicMegaMenuItems.enterprise.links.dimst.description'), icon: NetworkMd, href: '/roi' },
            { label: t('publicMegaMenuItems.enterprise.links.tokenpay.label'), description: t('publicMegaMenuItems.enterprise.links.tokenpay.description'), icon: TokenpayMd, href: '/tokenpay' },
            { label: t('publicMegaMenuItems.enterprise.links.metaverseShowroom.label'), description: t('publicMegaMenuItems.enterprise.links.metaverseShowroom.description'), icon: MetaverseMd, href: '/metaverse-store' },
            { label: t('publicMegaMenuItems.enterprise.links.customTokens.label'), description: t('publicMegaMenuItems.enterprise.links.customTokens.description'), icon: LinkMd, href: '/custom-tokens' },
        ]
    },
    {
        label: t('publicMegaMenuItems.partners.label'),
        icon: PositionLg,
        links: [
            { label: t('publicMegaMenuItems.partners.links.unstoppableDomains.label'), description: t('publicMegaMenuItems.partners.links.unstoppableDomains.description'), icon: UnstoppableDomains, href: '/unstoppable-domains' },
            { label: t('publicMegaMenuItems.partners.links.d3.label'), description: t('publicMegaMenuItems.partners.links.d3.description'), icon: D3, href: '/d3' },
            { label: t('publicMegaMenuItems.partners.links.polygon.label'), description: t('publicMegaMenuItems.partners.links.polygon.description'), icon: Polygon, href: '/polygon' },
            { label: t('publicMegaMenuItems.partners.links.crossmint.label'), description: t('publicMegaMenuItems.partners.links.crossmint.description'), icon: CrossmintWhite, href: '/crossmint' }
        ]
    }
]

export default getPublicMegaMenuItems