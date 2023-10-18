import { initialStateDesignPage } from "./design-context"
import { IShopDesignPage } from "./reducer"

const DesignPageModel = ({
    refactorData: (shop: any): IShopDesignPage => ({
        backgroundColor: shop?.backgroundColor || initialStateDesignPage.shop.backgroundColor,
        backgroundImage: shop?.backgroundImage || initialStateDesignPage.shop.backgroundImage,
        backgroundImageSecondary: shop?.backgroundImageSecondary || initialStateDesignPage.shop.backgroundImageSecondary,
        backgroundText: shop?.backgroundText || initialStateDesignPage.shop.backgroundText,
        discordURL: shop?.discordURL || initialStateDesignPage.shop.discordURL,
        facebookURL: shop?.facebookURL || initialStateDesignPage.shop.facebookURL,
        fullWidthHero: shop?.fullWidthHero || initialStateDesignPage.shop.fullWidthHero,
        headerIcon: shop?.headerIcon || initialStateDesignPage.shop.headerIcon,
        instagramURL: shop?.instagramURL || initialStateDesignPage.shop.instagramURL,
        linkedinURL: shop?.linkedinURL || initialStateDesignPage.shop.linkedinURL,
        logo: shop?.logo || initialStateDesignPage.shop.logo,
        productSectionText: shop?.productSectionText || initialStateDesignPage.shop.productSectionText,
        shopDesign: {
            fontfamily: shop?.shopDesign?.fontfamily || initialStateDesignPage.shop.shopDesign.fontfamily,
            headerBackground: shop?.shopDesign?.headerBackground || initialStateDesignPage.shop.shopDesign.headerBackground,
            hiroLayout: shop?.shopDesign?.hiroLayout || initialStateDesignPage.shop.shopDesign.hiroLayout,
            hiroTextColor: shop?.shopDesign?.hiroTextColor || initialStateDesignPage.shop.shopDesign.hiroTextColor,
            profileLogo: shop?.shopDesign?.profileLogo || initialStateDesignPage.shop.shopDesign.profileLogo,
        },
        templateID: shop?.templateID || initialStateDesignPage.shop.templateID,
        tiktokURL: shop?.tiktokURL || initialStateDesignPage.shop.tiktokURL,
        twitterURL: shop?.twitterURL || initialStateDesignPage.shop.twitterURL,
        webURL: shop?.webURL || initialStateDesignPage.shop.webURL,
    })
})

export default DesignPageModel