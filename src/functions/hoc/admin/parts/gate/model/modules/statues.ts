interface Ishop {
    shop: any
}

export class statuesModule {
    shop: any

    constructor(shop: any) {
        this.shop = shop
    }

    shopInfo = () => {
        const shop = this.shop
        return !Boolean(this.shop.description && shop.addressBookID) && "register/shop-info"
    }

    designTemplate = () => {
        const shop = this.shop
        return !Boolean(shop.backgroundImage && shop.backgroundImageSecondary && shop.headerIcon) && "register/design"
    }

    technical = () => {
        const shop = this.shop
        return !Boolean(shop.imsType && shop.paymentMethods.length) && "register/technical"
    }
}