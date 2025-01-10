export interface Codes {
    code: string;
    balance: number;
    isRedeemed: boolean;
    _id: string;
}
export interface Coupon {
    balance: number;
    codes: Codes[];
    createdAt: string;
    expiryDate: string;
    isExpired: boolean;
    name: string;
    ownerId: string;
    shopID: string;
    type: "DISCOUNT" | "CREDIT";
    updatedAt: string;
    _id: string;
}