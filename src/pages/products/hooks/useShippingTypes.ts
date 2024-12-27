import { createCustomShippingService, getCustomShippingsService } from "lib/apis/custom-shipping/CustomShippingServices"
import { useHasPermission } from "lib/stores/app/appStore"
import { useState } from "react"
import { useMutation, useQuery, useQueryClient, UseQueryResult } from "react-query"

export interface ShippingType {
    value: string
    label: string
    description: string
}

const CUSTOM_SHIPPINGS_QUERY_KEY = ["custom-shippings"]

export function useShippingTypes() {
    const queryClient = useQueryClient()
    const hasPermission = useHasPermission()
    const hasCustomShippingPermission = hasPermission("custom_shipping")
    const [shippingTypes, setShippingTypes] = useState<ShippingType[]>([
        {
            value: "EASY_POST",
            label: "EasyPost",
            description: "Calculates the real-time cost of the shipment based on the delivery address to provide a shipping label."
        }
    ])

    const shippingTypesQuery: UseQueryResult<any> = useQuery({
        queryKey: CUSTOM_SHIPPINGS_QUERY_KEY,
        queryFn: getCustomShippingsService,
        enabled: hasCustomShippingPermission,
        onSuccess: (data) => {
            setShippingTypes((shippings) => [...shippings, ...(data.data.data)])
        }
    })

    return {
        hasCustomShippingPermission,
        shippingTypes,
        shippingTypesQuery,
    }
}

export function useCreateCustomShipping() {
    const queryClient = useQueryClient()

    const createCustomShippingMutation = useMutation({
        mutationFn: createCustomShippingService,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: CUSTOM_SHIPPINGS_QUERY_KEY })
    })

    return {
        createCustomShipping: createCustomShippingMutation.mutateAsync,
        isLoading: createCustomShippingMutation.isLoading
    }
}