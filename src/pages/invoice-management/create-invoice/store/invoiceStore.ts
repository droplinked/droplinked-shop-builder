import { create } from 'zustand';

interface Cart {
    _id: string;
    shopID: {
        _id: string;
        ownerID: string;
    },
    status: string;
    type: string;
    email?: string;
    note?: string;
    items: {
        _id: string
        skuID: string
        groupId: string
        product: {
            _id: string;
            title: string
            image: string
            skuImage: string
            m2m_preview: string
            slug: string;
            type: string
            pre_purchase_data_fetch?: {
                active: boolean;
                title: string;
            }
        }
        options: {
            quantity: number
            size: {
                caption: string
                value: string
            },
            color: {
                caption: string
                value: string
            }
        },
        totals: {
            discountPercentage: number
            priceItem: number
            priceItemByDiscount: number
            subTotal: number
        }
    }[],
    shippings: {

        groupId: string,
        type: string,
        data: {
            id: string;
            title: string;
            price: number;
            delivery_estimation: string;
            selected: boolean;
        }[]
    }[],
    totalCart: {
        subtotal: number;
        shipping: number;
        estimatedTaxes: number;
        giftCard: {
            type: string;
            amount: number;
        };
        totalPayment: number;
        productsAmount?: number;
        taxAmount?: number;
        shippingAmount?: number;
        totalAmount?: number;
    };
    canApplyGiftCard: boolean
}

type State = {
    cart: Cart
}

type Action = {
    updateCart: (cart: State['cart']) => void
}

const useInvoiceStore = create<State & Action>((set) => ({
    cart: {} as Cart,
    updateCart: (cart) => set({ cart })
}))

export default useInvoiceStore