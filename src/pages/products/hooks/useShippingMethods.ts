import { getCustomShippingsService } from "lib/apis/custom-shipping/CustomShippingServices"
import { useHasPermission } from "lib/stores/app/appStore"
import { useState } from "react"
import { useQuery, UseQueryResult } from "react-query"

export interface ShippingMethod {
    value: string
    label: string
    description: string
}

export const CUSTOM_SHIPPINGS_QUERY_KEY = ["custom-shippings"]

export default function useShippingMethods() {
    const hasPermission = useHasPermission()
    const hasCustomShippingPermission = hasPermission("custom_shipping")
    const [shippingMethods, setShippingMethods] = useState<ShippingMethod[]>([
        {
            value: "EASY_POST",
            label: "EasyPost",
            description: "Calculates the real-time cost of the shipment based on the delivery address to provide a shipping label."
        },
        {
            value: "CUSTOM",
            label: "Warehouse Management System Integration",
            description: "Product fulfillment and shipping directly sent from the warehouse of your choice."
        }
    ])

    const shippingMethodsQuery: UseQueryResult<any> = useQuery({
        queryKey: CUSTOM_SHIPPINGS_QUERY_KEY,
        queryFn: getCustomShippingsService,
        enabled: hasCustomShippingPermission,
        onSuccess: (data) => {
            setShippingMethods((shippings) => [...shippings, ...(data.data.data)])
        }
    })

    return { hasCustomShippingPermission, shippingMethods, setShippingMethods, shippingMethodsQuery }
}