import { OrderStatus } from "./helpers";

/**
 * Order interface representing the data structure for purchase orders
 */
export interface IOrders {
    /** Unique identifier of the order */
    _id: string;
    /** Customer address information */
    customerAddressBook?: {
        firstName: string;
        lastName: string;
    };
    /** Customer email address */
    customerEmail: string;
    /** Last update timestamp */
    updatedAt: Date;
    /** Current status of the order */
    status: OrderStatus;
}