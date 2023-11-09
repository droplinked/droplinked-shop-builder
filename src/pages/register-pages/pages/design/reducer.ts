export type IPreviewSections = 'theme' | 'header' | 'hero' | 'profile' | 'products' | 'footer'

export interface IAdditionalLinkes {
    caption: string
    link: string
    save: boolean
}

export interface IShopDesignPage {
    templateID?: string
    backgroundImage?: string
    backgroundImageSecondary?: string
    fullWidthHero?: boolean
    productSectionText?: string
    backgroundColor?: string
    backgroundText?: string
    logo?: string
    discordURL?: string
    instagramURL?: string
    twitterURL?: string
    facebookURL?: string
    linkedinURL?: string
    tiktokURL?: string
    webURL?: string
    headerIcon?: string
    shopDesign?: {
        fontfamily?: string
        headerBackground?: string
        hiroLayout?: string
        hiroTextColor?: string
        bannerLinks?: Array<IAdditionalLinkes>
        footerLinks?: Array<IAdditionalLinkes>
        productListTitle?: string
        iconHeaderColor?: string
        foreground?: string
        backgroundBody?: string
        textColorParagraphs?: string
    }
    template_options?: any
}

export interface IStateDesignPage {
    device?: "desktop" | "mobile"
    optionSelected?: IPreviewSections
    shop?: IShopDesignPage
}

export type actionsDesignPage = {
    type: "updateState"
    params: IStateDesignPage
} | {
    type: "updateShop"
    params: IShopDesignPage
}

namespace designPageReducer {
    export const reducers = (state: IStateDesignPage, actions: actionsDesignPage): IStateDesignPage => {

        if (actions.type === "updateState") {
            return {
                ...state,
                ...actions.params
            }
        } else if (actions.type === "updateShop") {
            return {
                ...state,
                shop: actions.params.shopDesign ? {
                    ...state.shop,
                    shopDesign: {
                        ...state.shop.shopDesign,
                        ...actions.params.shopDesign
                    }
                } : {
                    ...state.shop,
                    ...actions.params
                }
            }
        } else return state
    }
}

export default designPageReducer