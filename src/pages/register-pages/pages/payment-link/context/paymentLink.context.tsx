import React, { createContext, useState } from "react";

export type PaymentLinkVariantsStyle = "DROPDOWN" | "SELECTOR"
export type PaymentLinkColorPallete = "LIGHT" | "DARK"

export type PaymentLinkData = {
    variantsStyle: PaymentLinkVariantsStyle;
    additionalNote: boolean;
    logoVisibility: boolean;
    colorPallete: PaymentLinkColorPallete;
}

interface PaymentLinkContextType {
    paymentLinkData: PaymentLinkData
    updatePaymentLink: <K extends keyof PaymentLinkData>(key: K, value: PaymentLinkData[K]) => void
}

export const PaymentLinkContext = createContext<PaymentLinkContextType>({} as PaymentLinkContextType)

export default function PaymentLinkProvider({ children }) {
    const [paymentLinkData, setPaymentLinkData] = useState<PaymentLinkData>({
        variantsStyle: "DROPDOWN",
        additionalNote: false,
        logoVisibility: false,
        colorPallete: "LIGHT"
    })

    const updatePaymentLink = <K extends keyof typeof paymentLinkData>(key: K, value: typeof paymentLinkData[K]) =>
        setPaymentLinkData({ ...paymentLinkData, [key]: value })

    return (
        <PaymentLinkContext.Provider value={{ paymentLinkData, updatePaymentLink }}>
            {children}
        </PaymentLinkContext.Provider>
    )
}