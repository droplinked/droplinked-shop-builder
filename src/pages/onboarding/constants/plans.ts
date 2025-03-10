export interface Plan {
    title: string;
    price: number;
    isFree?: boolean;
    hasDiscount?: boolean;
    priceByDiscount?: number;
    discountPercent?: number;
}

export const plans: Plan[] = [
    {
        title: "Monthly",
        price: 19.99,
        isFree: true,
        hasDiscount: true,
    },
    {
        title: "Annually",
        price: 60,
        hasDiscount: true,
        priceByDiscount: 54,
        isFree: false,
        discountPercent: 10,
    },
    {
        title: "5-Year",
        price: 300,
        hasDiscount: true,
        priceByDiscount: 225,
        discountPercent: 25,
    }
]

export const proPlanFeatures: string[] = [
    "Token gating",
    "Mint-to-Merch",
    "Unlimited tokenization",
    "Unlimited digital goods",
    "Unlimited physical products",
    "Customizable domains",
    "Customizable favicon",
    "Customizable shipping",
    "Digital coupons and giftcards",
    "Warehouse system integration",
    "Premium customer support"
]