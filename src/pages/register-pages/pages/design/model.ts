import { initialStateDesignPage } from "./design-context"
import { IAdditionalLinkes, IShopDesignPage } from "./reducer"

const DesignPageModel = ({
    refactorAdditionalLinkes: (data: Array<IAdditionalLinkes>): Array<IAdditionalLinkes> => {
        return data.map(el => ({
            caption: el.caption,
            link: el.link,
            save: true,
        }))
    },
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
            isHeaderFixed: shop?.shopDesign?.isHeaderFixed || initialStateDesignPage.shop.shopDesign.isHeaderFixed,
            hiroLayout: shop?.shopDesign?.hiroLayout || initialStateDesignPage.shop.shopDesign.hiroLayout,
            hiroTextColor: shop?.shopDesign?.hiroTextColor || initialStateDesignPage.shop.shopDesign.hiroTextColor,
            productListTitle: shop?.shopDesign?.productListTitle || initialStateDesignPage.shop.shopDesign.productListTitle,
            backgroundBody: shop?.shopDesign?.backgroundBody || initialStateDesignPage.shop.shopDesign.backgroundBody,
            foreground: shop?.shopDesign?.foreground || initialStateDesignPage.shop.shopDesign.foreground,
            textColorParagraphs: shop?.shopDesign?.textColorParagraphs || initialStateDesignPage.shop.shopDesign.textColorParagraphs,
            iconHeaderColor: shop?.shopDesign?.iconHeaderColor || initialStateDesignPage.shop.shopDesign.iconHeaderColor,
            footerLinks: shop?.shopDesign?.footerLinks && typeof shop?.shopDesign?.footerLinks === "object" ? DesignPageModel.refactorAdditionalLinkes(shop?.shopDesign?.footerLinks) : initialStateDesignPage.shop.shopDesign.footerLinks,
            bannerLinks: shop?.shopDesign?.bannerLinks && typeof shop?.shopDesign?.bannerLinks === "object" ? DesignPageModel.refactorAdditionalLinkes(shop?.shopDesign?.bannerLinks) : initialStateDesignPage.shop.shopDesign.bannerLinks,
        },
        templateID: shop?.templateID || initialStateDesignPage.shop.templateID,
        tiktokURL: shop?.tiktokURL || initialStateDesignPage.shop.tiktokURL,
        twitterURL: shop?.twitterURL || initialStateDesignPage.shop.twitterURL,
        webURL: shop?.webURL || initialStateDesignPage.shop.webURL,
        template_options: shop?.template_options || initialStateDesignPage.shop.template_options,
    })
})

export default DesignPageModel