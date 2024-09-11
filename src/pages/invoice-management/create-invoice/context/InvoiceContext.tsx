import React, { createContext, useState } from "react";

export const InvoiceCartContext = createContext<any>({})

export default function InvoiceProvider({ children }) {
    const [invoiceCart, setInvoiceCart] = useState({})

    const updateInvoiceCart = <K extends keyof typeof invoiceCart>(key: K, value: typeof invoiceCart[K]) =>
        setInvoiceCart({ ...invoiceCart, [key]: value })

    return (
        <InvoiceCartContext.Provider value={{ invoiceCart, updateInvoiceCart }}>
            {children}
        </InvoiceCartContext.Provider>
    )
}