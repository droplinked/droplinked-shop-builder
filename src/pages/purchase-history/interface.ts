export interface IOrders {
    _id: string
    customerAddressBook?: {
        firstName: string,
        lastName: string,
    }
    updatedAt: Date,
    status: "PAYMENT_CONFIRMED" | "INITIALIZED_FOR_PAYMENT" | "CANCELED"
}