import { createCustomShippingService, getCustomShippingsService } from "services/custom-shipping/CustomShippingServices"
import { useHasPermission } from "stores/app/appStore"
import { useState } from "react"
import { useMutation, useQuery, useQueryClient, UseQueryResult } from "react-query"
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

export interface ShippingType {
    _id?: string // Optional identifier for custom shipping methods
    shippingType: string
    title: string
    description?: string
}

const CUSTOM_SHIPPINGS_QUERY_KEY = ["custom-shippings"]

export function useShippingTypes() {
    const hasPermission = useHasPermission()
    const hasCustomShippingPermission = hasPermission("custom_shipping")
    const { t } = useLocaleResources('common')

    const [shippingTypes, setShippingTypes] = useState<ShippingType[]>([
        {
            shippingType: "EASY_POST",
            title: t('products.hooks.shipping.easyPost.title'),
            description: t('products.hooks.shipping.easyPost.description')
        }
    ])

    const shippingTypesQuery: UseQueryResult<any> = useQuery({
        queryKey: CUSTOM_SHIPPINGS_QUERY_KEY,
        queryFn: getCustomShippingsService,
        enabled: hasCustomShippingPermission,
        onSuccess: (data) => {
            setShippingTypes((prev) => [...prev, ...(data.data.data)])
        }
    })

    return {
        hasCustomShippingPermission,
        shippingTypes,
        shippingTypesQuery
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