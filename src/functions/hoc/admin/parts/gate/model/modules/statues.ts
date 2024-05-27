export class statusesModule {
    user: any

    constructor(user: any) {
        this.user = user
    }

    // shopInfo = () => {
    //     const shop = this.shop
    //     return !Boolean(this.shop.description) && "register/shop-info"
    // }

    // designTemplate = () => {
    //     const shop = this.shop
    //     return !Boolean(shop.backgroundImage && shop.backgroundImageSecondary && shop.headerIcon) && "register/design"
    // }

    // technical = () => {
    //     const shop = this.shop
    //     return (shop.imsType === "DROPLINKED" ? !Boolean(shop.imsType && shop.paymentMethods.length) : !Boolean(shop.imsType)) && "register/technical"
    // }

    urlRegistration = () => {
        const user = this.user
        return user?.status === "NEW" && "url-registration"
    }
}