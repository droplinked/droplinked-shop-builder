import { create } from 'zustand';

export interface InvoiceFormSchema {
    email: string;
    note: string;
    address: {
        firstName: string;
        lastName: string;
        addressLine1: string;
        addressLine2: string;
        country: string;
        city: string;
        state: string;
        zip: string;
        addressType: string;
        phoneNumber: string;
    }
}

export interface CartItem {
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
}

export interface Cart {
    _id: string;
    shopID: {
        _id: string;
        ownerID: string;
    },
    status: string;
    type: string;
    email?: string;
    note?: string;
    items: CartItem[],
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
    cart: Cart;
    areAllProductsDigital: boolean;
}

type Action = {
    updateCart: (cart: State['cart']) => void
    resetCart: () => void
}

const useInvoiceStore = create<State & Action>((set) => ({
    cart: {} as Cart,
    areAllProductsDigital: true,
    updateCart: (cart) => {
        console.log({ cart })
        const areAllProductsDigital = cart.items?.every(item => item.product.type === 'DIGITAL')
        set({ cart, areAllProductsDigital })
    },
    resetCart: () => set({ cart: {} as Cart, areAllProductsDigital: true })
}))

export default useInvoiceStore