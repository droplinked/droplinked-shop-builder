import { IcreateAddressService } from "../address/interfaces"

export interface IgetOrderService {
    orderID: string
}

export interface IgetOrderResponse {
    data: {
        orderInformation: {
            orderId: string;
            status: "PAYMENT_CONFIRMED" | "INITIALIZED_FOR_PAYMENT" | "CANCELED";
        };
        customer: {
            name: string | null;
            email: string;
            address: string | null;
        };
        details: {
            products: number;
            shipping: number;
            tax: number;
            cart: number;
            profit: number;
            paidWith: string;
            type: string;
        };
        trackingInfo: {
            title: string;
            trackings: {
                name: string;
                url: string;
            }[];
        }[];
        shippings: {
            title: string;
            value: number;
        }[];
        tax: {
            droplinked: number;
            shop: number;
            total: number;
        };
        giftCard: {
            credit: number;
            amount: number;
            netProfit: number;
            ruleset: number;
        };
        commision: {
            droplinked: number;
            stripe: number;
        };
        items: {
            _id: string;
            productId: string;
            title: string;
            image: string;
            skuImage: string | null;
            options: Record<string, any>;
            quantity: number;
            isAffiliate: boolean;
            price: number;
        }[];
    }
}

export interface IcreateSampleServiceSkues {
    _id: string
    quantity: number
}

export interface IcrateSampleService {
    skus: IcreateSampleServiceSkues[]
    address: IcreateAddressService
}

export interface IupdateSampleService {
    rateId: string
}

export interface IGetProductOrdersService {
    productId: string
}